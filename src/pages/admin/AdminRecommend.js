import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminRecommend() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState({ imageUrl: '', imageGenre: '' });

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  const fetchCategories = () => {
    axios.get('/admin/categories')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data.map((item) => ({ name: item.category })));
        } else {
          console.error('서버에서 반환된 데이터 구조가 예상과 다릅니다.');
        }
      })
      .catch((error) => {
        console.error('카테고리를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  const addCategory = () => {
    if (newCategory.trim() === '') {
      alert('카테고리를 입력하세요.');
      return;
    }
  
    axios.post('/admin/addcategory', { name: newCategory })
      .then(() => {
        setNewCategory(''); // 입력 필드를 초기화
        fetchCategories(); // 카테고리 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error('카테고리를 추가하는 중 오류가 발생했습니다.', error);
      });
  };

  const deleteSelectedCategories = () => {
    // 선택된 카테고리의 이름 목록을 생성
    const categoryNamesToDelete = selectedCategories.map((category) => category.name);
    console.log("삭제 카테고리 :", categoryNamesToDelete);
    // 서버로 선택된 카테고리 이름 목록을 보냅니다.
    axios.post('/admin/deletecategories', { names: categoryNamesToDelete })
      .then(() => {
        setSelectedCategories([]);
        fetchCategories(); // 카테고리 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error('선택한 카테고리를 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const fetchImages = () => {
    axios.get('/admin/images')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          console.error('서버에서 반환된 이미지 데이터 구조가 예상과 다릅니다.');
        }
      })
      .catch((error) => {
        console.error('이미지를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  const handleImageUrlChange = (e) => {
    setImageData({ ...imageData, imageUrl: e.target.value });
  };

  const handleImageGenreChange = (e) => {
    setImageData({ ...imageData, imageGenre: e.target.value });
  };

  const addImage = () => {
    const { imageUrl, imageGenre } = imageData;
  
    if (!imageUrl || !imageGenre) {
      alert('이미지 URL과 이미지 장르를 모두 입력해야 합니다.');
      return;
    }

    if (categories.some(category => category.name === imageGenre)) {
      alert('이미 존재하는 장르입니다.');
      return;
    }
    
    // 클라이언트에서 서버로 이미지 URL과 장르를 전송
    axios.post('/admin/addimage', { imageUrl, imageGenre })
      .then((response) => {
        console.log('이미지가 성공적으로 추가되었습니다.');
        fetchImages();
  
        // 이미지 추가 후 입력 필드 초기화
        setImageData({ imageUrl: '', imageGenre: '' });
      })
      .catch((error) => {
        console.error('이미지 추가 중 오류가 발생했습니다.', error);
      });
  };
  
  // 이미지 삭제 함수 수정
  const deleteSelectedImages = () => {
    if (selectedImages.length === 0) {
      alert('삭제할 이미지를 선택하세요.');
      return;
    }

    axios
      .post('/admin/deleteimages', { imageIds: selectedImages })
      .then((response) => {
        console.log('삭제 id : ', selectedImages);
        console.log('이미지가 성공적으로 삭제되었습니다.');
        fetchImages(); // 이미지 목록을 다시 불러옵니다.
        setSelectedImages([]); // 선택된 이미지 목록 초기화
      })
      .catch((error) => {
        console.error('이미지 삭제 중 오류가 발생했습니다.', error);
      });
  };

  const handleImageCheckboxChange = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  return (
    <div>
      <h1>카테고리/이미지 관리 페이지</h1>
      <table>
        <thead>
          <tr>
            <th>등록된 카테고리</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="새 카테고리 입력"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>카테고리 추가</button>
        <button onClick={deleteSelectedCategories}>카테고리 삭제</button>
      </div>
      <hr />
      <h2>등록된 이미지</h2>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.image_id} className="image-item">
            <div className="image-content">
              <img src={image.image_url} alt={`이미지 ${image.image_id}`} style={{ width: '200px', height: '150px' }} />
              <p>이미지 카테고리: {image.image_genre}</p>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.image_id)}
                onChange={() => handleImageCheckboxChange(image.image_id)}
              />
            </div>
          </div>
        ))}
        <style jsx>{`
          .image-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start; /* 왼쪽에서 오른쪽으로 정렬 */
          }

          .image-item {
            width: calc(33.33% - 10px);
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .image-content {
            text-align: center;
          }

          .checkbox {
            margin-top: 10px;
          }
        `}</style>
      </div>
      <div>
        <h2>이미지 추가</h2>
        <input
          type="text"
          placeholder="이미지 URL 입력"
          value={imageData.imageUrl}
          onChange={handleImageUrlChange}
          style={{ width: '400px'}}
        />
        <input
          type="text"
          placeholder="이미지 장르 입력"
          value={imageData.imageGenre}
          onChange={handleImageGenreChange}
        />
        <button onClick={addImage}>이미지 추가</button>
        <button onClick={deleteSelectedImages}>선택된 이미지 삭제</button>
      </div>
    </div>
  );
}

export default AdminRecommend;
