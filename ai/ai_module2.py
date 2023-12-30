import os
import sys
import numpy as np
import pandas as pd
from tensorflow.keras.models import model_from_json
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import json
def load_model_and_predict(image_paths):
     # 모든 이미지에 대한 예측 결과를 저장할 리스트
    all_results = []
    # 현재 스크립트 파일의 디렉토리
    script_dir = os.path.dirname(os.path.realpath(__file__))
    # 한 단계 위의 디렉토리로 이동
    parent_dir = os.path.dirname(script_dir)    

    model_json_path = os.path.join(script_dir, 'model.json')
    with open(model_json_path, 'r') as json_file:
        loaded_model_json = json_file.read()
    model = model_from_json(loaded_model_json)
    model_h5_path = os.path.join(script_dir, 'model.h5')
    model.load_weights(model_h5_path)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    # Load art information
    info_csv_path = os.path.join(script_dir, 'info.csv')
    art = pd.read_csv(info_csv_path)
    # Filter art styles
    selected_styles = ['Impressionism', 'Realism', 'Romanticism', 'Expressionism', 'Post-Impressionism',
                        'Surrealism', 'Symbolism', 'Cubism', 'Abstract Art',  'High Renaissance']
    filtered_art = art[art['style'].isin(selected_styles)]
    top_styles = filtered_art['style'].value_counts().reset_index()
    top_styles.columns = ['style', 'count']
    top_styles['count'] = np.where(top_styles['count'] > 300, 100, top_styles['count'])
    top_styles['class_weight'] = top_styles['count'].sum() / (top_styles.shape[0] * top_styles['count'])
    filter_list = top_styles['style'].tolist()
    # Data preprocessing
    images_dir = os.path.join(script_dir, 'images')
    filtered_images_dir = os.path.join(images_dir, 'filtered_images', 'images')
    fdata = art[art['style'].isin(filter_list)]
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
    # image_paths를 순회하면서 각 이미지에 대한 예측 수행
    for image_path in image_paths:
        print("image_path : ",image_path)
        # artroot 파일에 있는 public 폴더
        image_path_1 = os.path.join(parent_dir, 'artroot/public', image_path)
        # Original image
        print(image_path_1)
        test_image = Image.open(image_path_1).convert('RGB')
        test_image = test_image.resize((train_input_shape[0], train_input_shape[1]))

        # Predict artist
        test_image = np.array(test_image) / 255.0
        test_image = np.expand_dims(test_image, axis=0)

        prediction = model.predict(test_image)
        prediction_probability = np.amax(prediction)
        prediction_idx = np.argmax(prediction)

        labels = train_generator.class_indices
        labels = dict((v, k) for k, v in labels.items())



        result = {
            "predicted_style": labels[prediction_idx].replace('_', ' '),
            "prediction_probability": prediction_probability * 100,
            "image_path":image_path
        }
        # 결과를 all_results 리스트에 추가
        all_results.append(result)

    



    # 결과를 JSON 형태로 파일에 저장
    result_file_path = os.path.join(script_dir, 'result.json')
    with open(result_file_path, 'w') as json_file:
        json.dump(all_results, json_file)
    

if __name__ == "__main__":
#     # 스크립트가 직접 실행될 때 load_model_and_predict 함수 호출
    image_paths = sys.argv[1].split(',')
    load_model_and_predict(image_paths)