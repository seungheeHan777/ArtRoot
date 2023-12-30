#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
import shutil
from PIL import Image
import sys

import tensorflow as tf
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import *
from tensorflow.keras.optimizers import *
from tensorflow.keras.applications import *
from tensorflow.keras.callbacks import *
from tensorflow.keras.initializers import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import Progbar
from tensorflow.keras.callbacks import TensorBoard

from numpy.random import seed
seed(1)


def train_again(labels, image_count):

    print(f"Labels: {labels}")
    print(f"Image Count: {image_count}")
    
    #여기에서 필요한 로직 수행
    # 현재 스크립트의 디렉토리
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # info.csv 파일의 절대 경로
    csv_path = os.path.join(script_dir, './info.csv')
    # 학교 서버에 넣을땐 그냥 ./info.csv  
    art = pd.read_csv(csv_path)
    
    # 기존에 있던 카테고리들 라벨명, 이미지 개수 추출
    selected_styles = ['Impressionism', 'Realism', 'Romanticism', 'Expressionism', 'Post-Impressionism',
                       'Surrealism', 'Symbolism', 'Cubism', 'Abstract Art', 'High Renaissance']
    filtered_art = art[art['style'].isin(selected_styles)]
    top_styles = filtered_art['style'].value_counts().reset_index()
    top_styles.columns = ['style', 'count']
    
    # 서버에서 받아온 라벨과 이미지 개수 (예시 데이터, 실제로는 서버에서 받아온 데이터를 사용)
    server_labels = [labels]
    server_image_counts = [image_count]

    # 새로운 데이터프레임 생성
    new_style = pd.DataFrame({'style': server_labels, 'count': server_image_counts})

    # 기존 데이터프레임에 새로운 데이터프레임 추가
    updated_top_styles = pd.concat([top_styles, new_style], ignore_index=True)
    
    # updated_top_styles로 weight 구하기
    updated_top_styles['class_weight'] = updated_top_styles['count'].sum() / (updated_top_styles.shape[0] * updated_top_styles['count'])
    
    # class_weight를 딕셔너리 형태로 변환
    class_weights = updated_top_styles['class_weight'].to_dict()
    
    # 새로 추가된 스타일 포함 리스트 생성
    filter_list = updated_top_styles['style']
    filter_list = filter_list.tolist()
    
    # 필요없는 코드인거 같은데 혹시 문제 생기면 체크
#     fdata = art[art['style'].isin(filter_list)]
#     images = fdata[['filename','style']]
#     images.reset_index(drop= True, inplace=True)
#     images["filename"] = './train_images/'+images["filename"]

#     artstyles = fdata['style'].unique()

    # 이미지 불러오기
    image_path = os.path.join(script_dir, './images/filtered_images/images')
    filtered_imgdir = image_path
    
    # Augment data
    batch_size = 32
    train_input_shape = (224, 224, 3)
    n_classes = updated_top_styles.shape[0]


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
                                                        classes=filter_list
                                                       )

    valid_generator = train_datagen.flow_from_directory(directory=filtered_imgdir,
                                                        class_mode='categorical',
                                                        target_size=train_input_shape[0:2],
                                                        batch_size=batch_size,
                                                        subset="validation",
                                                        shuffle=True,
                                                        classes=filter_list
                                                       )

    STEP_SIZE_TRAIN = train_generator.n//train_generator.batch_size
    STEP_SIZE_VALID = valid_generator.n//valid_generator.batch_size
    print("Total number of batches =", STEP_SIZE_TRAIN, "and", STEP_SIZE_VALID)
    
    # Load pre-trained model
    from tensorflow.keras.applications import VGG16, InceptionV3, MobileNetV2, Xception, ResNet101, EfficientNetB0

    base_model = ResNet101(weights='imagenet', include_top=False, input_shape=train_input_shape)

    for layer in base_model.layers:
        layer.trainable = True
    
    # Add Layer
    X = base_model.output
    X = Flatten()(X)

    X = Dense(512, kernel_initializer='he_uniform')(X)
    X = Dropout(0.5)(X)
    X = BatchNormalization()(X)
    X = Activation('relu')(X)

    X = Dense(256, kernel_initializer='he_uniform')(X)  # Added layer
    X = Dropout(0.5)(X)
    X = BatchNormalization()(X)
    X = Activation('relu')(X)

    X = Dense(128, kernel_initializer='he_uniform')(X)  # Added layer
    X = Dropout(0.5)(X)
    X = BatchNormalization()(X)
    X = Activation('relu')(X)

    X = Dense(64, kernel_initializer='he_uniform')(X)   # Added layer
    X = Dropout(0.5)(X)
    X = BatchNormalization()(X)
    X = Activation('relu')(X)

    output = Dense(n_classes, activation='softmax')(X)

    model = Model(inputs=base_model.input, outputs=output)
    
    # model setting
    optimizer = Adam(learning_rate=0.0001)
    model.compile(loss='categorical_crossentropy',
                  optimizer=optimizer, 
                  metrics=['accuracy'])
    
    n_epoch = 1

    early_stop = EarlyStopping(monitor='val_loss', patience=20, verbose=1, 
                               mode='auto', restore_best_weights=True)

    reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=5, 
                                  verbose=1, mode='auto')

    progbar = Progbar(target=n_epoch * STEP_SIZE_TRAIN)
    # Train the model - all layers
    history1 = model.fit(x=train_generator, steps_per_epoch=STEP_SIZE_TRAIN,
                                  validation_data=valid_generator, validation_steps=STEP_SIZE_VALID,
                                  epochs=n_epoch,
                                  shuffle=True,
                                  verbose=1,
                                  callbacks=[reduce_lr],
                                  use_multiprocessing=True,
                                  workers=16,
                                  class_weight=class_weights
                                 )
    
    # Freeze core ResNet layers and train again
    progbar = Progbar(target=n_epoch * STEP_SIZE_TRAIN)
    for layer in model.layers:
        layer.trainable = False

    for layer in model.layers[:50]:
        layer.trainable = True

    optimizer = Adam(lr=0.0001)

    model.compile(loss='categorical_crossentropy',
                  optimizer=optimizer, 
                  metrics=['accuracy'])

    n_epoch = 1
    history2 = model.fit(x=train_generator, steps_per_epoch=STEP_SIZE_TRAIN,
                                  validation_data=valid_generator, validation_steps=STEP_SIZE_VALID,
                                  epochs=n_epoch,
                                  shuffle=True,
                                  verbose=1,
                                  callbacks=[reduce_lr, early_stop],
                                  use_multiprocessing=True,
                                  workers=16,
                                  class_weight=class_weights
                                 )
    
    # # Merge history1 and history2
    history = {}
    history['loss'] = history1.history['loss'] + history2.history['loss']
    history['accuracy'] = history1.history['accuracy'] + history2.history['accuracy']
    history['val_loss'] = history1.history['val_loss'] + history2.history['val_loss']
    history['val_accuracy'] = history1.history['val_accuracy'] + history2.history['val_accuracy']
    history['lr'] = history1.history['lr'] + history2.history['lr']
    
    # serialize model to JSON
    model_json = model.to_json()
    with open("model.json", "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights("model.h5")
    print("Saved model to output")
    
    # Prediction accuracy on train data
    score_train = model.evaluate_generator(train_generator, verbose=1)
    print("Prediction accuracy on train data =", score_train[1])

    # Prediction accuracy on CV data
    score_valid = model.evaluate_generator(valid_generator, verbose=1)
    print("Prediction accuracy on CV data =", score_valid[1])

    # Save accuracy to retrain.json
    retrain_result = {
        "train_accuracy": float(score_train[1]),
        "valid_accuracy": float(score_valid[1])
    }

    # Save accuracy to retrain.json within the same directory as the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    retrain_file_path = os.path.join(script_dir, "retrain.json")
    with open(retrain_file_path, "w") as json_file:
        json.dump(retrain_result, json_file, indent=2)


if __name__ == "__main__":
    #image_paths = sys.argv[1].split(',')
    labels = sys.argv[1]
    image_count = int(sys.argv[2])

    train_again(labels, image_count)

