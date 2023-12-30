
# In[1]:

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
import shutil
from PIL import Image


import tensorflow as tf
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import *
from tensorflow.keras.optimizers import *
from tensorflow.keras.applications import *
from tensorflow.keras.callbacks import *
from tensorflow.keras.initializers import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from numpy.random import seed
seed(1)


# In[2]:



# GPU 디바이스 확인
print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))


# In[4]:


from tensorflow.keras.models import model_from_json

# 모델 아키텍처 불러오기
with open('model.json', 'r') as json_file:
    loaded_model_json = json_file.read()
model = model_from_json(loaded_model_json)

# 모델 가중치 불러오기
model.load_weights("./model.h5")

# 컴파일 (옵티마이저, 손실 함수 등 설정 필요)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


# In[6]:


art = pd.read_csv('./info.csv')
art.head()


# In[7]:


selected_styles = ['Impressionism', 'Realism', 'Romanticism', 'Expressionism', 'Post-Impressionism',
                   'Surrealism', 'Symbolism', 'Cubism', 'Abstract Art', 'Pop Art', 'Fauvism', 'Ink and wash painting',
                  'Pointillism', 'Minimalism', 'Hard Edge Painting', 'Neoclassicism', 'High Renaissance', 'Concretism']
filtered_art = art[art['style'].isin(selected_styles)]
top_styles = filtered_art['style'].value_counts().reset_index()
top_styles.columns = ['style', 'count']
top_styles['count'] = np.where(top_styles['count'] > 1000, 1000, top_styles['count'])
top_styles['class_weight'] = top_styles['count'].sum() / (top_styles.shape[0] * top_styles['count'])
top_styles


# In[18]:


# Set class weights - assign higher weights to underrepresented classes
# class_weight를 딕셔너리 형태로 변환
class_weights = top_styles['class_weight'].to_dict()
class_weights


# In[8]:


filter_list = top_styles['style']
filter_list = filter_list.tolist()
filter_list


# In[9]:


filtered_imgdir = "./images/filtered_images/images"


# In[10]:


fdata = art[art['style'].isin(filter_list)]
images = fdata[['filename','style']]
images.reset_index(drop= True, inplace=True)
images["filename"] = './images/'+images["filename"]

artstyles = fdata['style'].unique()
artstyles


# In[11]:


# Augment data
batch_size = 32
train_input_shape = (224, 224, 3)
n_classes = top_styles.shape[0]


train_datagen = ImageDataGenerator(validation_split=0.2,
                                   rescale=1./255.,
                                   rotation_range=10,
                                   #width_shift_range=0.5,
                                   #height_shift_range=0.5,
                                   shear_range=5,
                                   #zoom_range=0.4,
                                   horizontal_flip=True,
                                   vertical_flip=True

                                  )

train_generator = train_datagen.flow_from_directory(directory=filtered_imgdir,
                                                    class_mode='categorical',
                                                    target_size=train_input_shape[0:2],
                                                    batch_size=batch_size,
                                                    subset="training",
                                                    shuffle=True,
                                                    classes=artstyles.tolist()
                                                   )

valid_generator = train_datagen.flow_from_directory(directory=filtered_imgdir,
                                                    class_mode='categorical',
                                                    target_size=train_input_shape[0:2],
                                                    batch_size=batch_size,
                                                    subset="validation",
                                                    shuffle=True,
                                                    classes=artstyles.tolist()
                                                   )

STEP_SIZE_TRAIN = train_generator.n//train_generator.batch_size
STEP_SIZE_VALID = valid_generator.n//valid_generator.batch_size
print("Total number of batches =", STEP_SIZE_TRAIN, "and", STEP_SIZE_VALID)


# In[14]:


optimizer = Adam(learning_rate=0.0001)
model.compile(loss='categorical_crossentropy',
              optimizer=optimizer, 
              metrics=['accuracy'])


# In[16]:


n_epoch = 10

early_stop = EarlyStopping(monitor='val_loss', patience=20, verbose=1, 
                           mode='auto', restore_best_weights=True)

reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=5, 
                              verbose=1, mode='auto')


# In[ ]:


# 모델 훈련 - 모든 레이어
history = model.fit(x=train_generator, steps_per_epoch=STEP_SIZE_TRAIN,
                              validation_data=valid_generator, validation_steps=STEP_SIZE_VALID,
                              epochs=n_epoch,
                              shuffle=True,
                              verbose=1,
                              callbacks=[reduce_lr],
                              use_multiprocessing=False,
                              workers=8,
                              class_weight=class_weights
                             )


# In[12]:


# Prediction accuracy on CV data
# 학습 모델의 검증 데이터셋을 사용해, 평가하고 평가 결과 출력
score = model.evaluate(valid_generator, verbose=1)
print("Prediction accuracy on CV data =", score[1])


# In[13]:


# serialize model to JSON
model_json = model.to_json()
with open("model.json", "w") as json_file:
    json_file.write(model_json)
# serialize weights to HDF5
model.save_weights("model.h5")
print("Saved model to output")


# In[ ]:




