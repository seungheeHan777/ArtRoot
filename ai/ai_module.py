# ai_module.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
from tqdm import tqdm, tqdm_notebook
import random
import imageio
import shutil

import tensorflow as tf
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import *
from tensorflow.keras.optimizers import *
from tensorflow.keras.applications import *
from tensorflow.keras.callbacks import *
from tensorflow.keras.initializers import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import model_from_json
from numpy.random import seed
import os
def load_model_and_predict():
     # 현재 스크립트 파일의 디렉토리
    script_dir = os.path.dirname(os.path.realpath(__file__))
    # 경로 조합 예시
    model_json_path = os.path.join(script_dir, 'model.json')
    json_file = open(model_json_path, 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    
    model = model_from_json(loaded_model_json)
    model_h5_path = os.path.join(script_dir, 'model.h5')
    model.load_weights(model_h5_path)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    info_csv_path = os.path.join(script_dir, 'info.csv')
    art = pd.read_csv(info_csv_path)

    selected_styles = ['Impressionism', 'Realism', 'Romanticism', 'Expressionism', 'Post-Impressionism',
                        'Surrealism', 'Symbolism', 'Cubism', 'Abstract Art', 'Pop Art', 'Fauvism', 'Ink and wash painting',
                        'Pointillism', 'Minimalism', 'Hard Edge Painting', 'Neoclassicism', 'High Renaissance', 'Concretism']
    
    filtered_art = art[art['style'].isin(selected_styles)]
    top_styles = filtered_art['style'].value_counts().reset_index()
    top_styles.columns = ['style', 'count']
    top_styles['count'] = np.where(top_styles['count'] > 300, 100, top_styles['count'])
    top_styles['class_weight'] = top_styles['count'].sum() / (top_styles.shape[0] * top_styles['count'])

    filter_list = top_styles['style'].tolist()
    # 리액트 프로젝트 public 폴더 안에 images 폴더에 filtered_images 복붙
    images_dir = os.path.join(script_dir, 'images')
    filtered_images_dir = os.path.join(images_dir, 'filtered_images', 'images')
    print(filtered_images_dir)
    fdata = art[art['style'].isin(filter_list)]
    images = fdata[['filename', 'style']]
    images.reset_index(drop=True, inplace=True)
    images["filename"] = images_dir + images["filename"]

    artstyles = fdata['style'].unique()

    batch_size = 32
    train_input_shape = (224, 224, 3)

    train_datagen = ImageDataGenerator(validation_split=0.2,
                                       rescale=1./255.,
                                       rotation_range=10,
                                       shear_range=5,
                                       horizontal_flip=True,
                                       vertical_flip=True)

    train_generator = train_datagen.flow_from_directory(directory=filtered_images_dir,
                                                        class_mode='categorical',
                                                        target_size=train_input_shape[0:2],
                                                        batch_size=batch_size,
                                                        subset="training",
                                                        shuffle=True,
                                                        classes=artstyles.tolist())

    STEP_SIZE_TRAIN = train_generator.n // train_generator.batch_size

    # Randomly select an image
    random_art = random.choice(artstyles)
    random_image = random.choice(os.listdir(os.path.join(filtered_images_dir, random_art)))
    random_image_file = os.path.join(filtered_images_dir, random_art, random_image)
    from PIL import Image
    # Original image
    test_image = Image.open(random_image_file).convert('RGB')
    test_image = test_image.resize((train_input_shape[0], train_input_shape[1]))

    # Predict artist
    test_image = np.array(test_image) / 255.0
    test_image = np.expand_dims(test_image, axis=0)

    prediction = model.predict(test_image)
    prediction_probability = np.amax(prediction)
    prediction_idx = np.argmax(prediction)

    labels = train_generator.class_indices
    labels = dict((v, k) for k, v in labels.items())

    import shutil

    #복사 이미지
    public_images_dir = os.path.join(script_dir, '..', 'artroot', 'public', 'images', 'filtered_images', 'images')
    public_images_path = os.path.join(public_images_dir, random_art)

    # 이미지 파일 복사
    shutil.copyfile(random_image_file, random_image)

     # 클라이언트에게 전달할 이미지 파일의 public URL
    public_image_url = 'images/filtered_images/images/' + random_art + '/' + random_image


    result = {
        "actual_style": random_art.replace('_', ' '),
        "predicted_style": labels[prediction_idx].replace('_', ' '),
        "prediction_probability": prediction_probability * 100,
        "random_image_file" : random_image_file,
         "public_image_url": public_image_url
    }

    



    # 결과를 JSON 형태로 파일에 저장
    result_file_path = os.path.join(script_dir, 'result.json')
    with open(result_file_path, 'w') as json_file:
        json.dump(result, json_file)
    

if __name__ == "__main__":
    # 스크립트가 직접 실행될 때 load_model_and_predict 함수 호출
    load_model_and_predict()
