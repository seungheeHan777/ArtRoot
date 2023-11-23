import React, { useState, useEffect } from "react";
import {
  ADcategory,
  getUser,
  userCategory,
  userImage,
} from "../lib/api/keyword";
import { useSelector } from "react-redux";
const Recommend = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    // Fetch category and image data when the component mounts
    fetchData("word"); // Fetch categories
    fetchData("image"); // Fetch images
    if (user) {
      fetchUserPrefer();
      fetchUserImagePrefer(); // Fetch user image preferences
    }
  }, [user]);

  const fetchData = (type) => {
    ADcategory()
      .then((response) => {
        if (Array.isArray(response.data)) {
          // item.type이 'word' 또는 'image'인 데이터만 필터링
          const filteredData = response.data.filter(
            (item) => item.type === type
          );

          if (type === "word") {
            setCategories(
              filteredData.map((item) => ({
                name: item.name,
                category_id: item.category_id,
              }))
            );
          } else if (type === "image") {
            setImages(filteredData);
          }
        } else {
          console.error(
            `서버에서 반환된 ${
              type === "word" ? "카테고리" : "이미지"
            } 데이터 구조가 예상과 다릅니다.`
          );
        }
      })
      .catch((error) => {
        console.error(
          `${
            type === "word" ? "카테고리" : "이미지"
          }를 불러오는 중 오류가 발생했습니다.`,
          error
        );
      });
  };

  const fetchUserPrefer = async () => {
    try {
      const response = await userCategory(user.username);
      // response가 undefined이면 오류 방지
      if (response && response.data) {
        const userPreferences = response.data.map(
          (preference) => preference.category_id
        );
        console.log(userPreferences);
        setSelectedCategories(userPreferences);
      } else {
        console.error("사용자 선호도 정보가 없습니다.");
      }
    } catch (error) {
      console.error(
        "사용자 선호도 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((category_id) => category_id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  const handleCategoryRecommend = () => {
    // 유저가 선택한 카테고리를 서버로 전송
    getUser({ user_id: user.username, categories: selectedCategories })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(
          "카테고리 정보를 서버에 전송하는 중 오류가 발생했습니다.",
          error
        );
      });
  };
  const fetchUserImagePrefer = async () => {
    try {
      const response = await userImage(user.username);
      if (response && response.data) {
        const selectedImageId = response.data.image_id;
        setSelectedImage(selectedImageId);
      } else {
        console.error("사용자 이미지 선호도 정보가 없습니다.");
      }
    } catch (error) {
      console.error(
        "사용자 이미지 선호도 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <h1>추천</h1>
          <h2>카테고리 선택</h2>
          {categories.map((category) => (
            <label key={category.name}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.category_id)}
                onChange={() => handleCheckboxChange(category.category_id)}
              />{" "}
              {category.name}
            </label>
          ))}
          <button onClick={handleCategoryRecommend}>등록</button>
          <hr />
          <div>
            <h2>이미지 선택</h2>
            <div className="image-container">
              {images.map((image) => (
                <div key={image.category_id} className="image-item">
                  <div className="image-content">
                    <img
                      src={image.image_url}
                      alt={`이미지 ${image.category_id}`}
                      style={{ width: "200px", height: "150px" }}
                    />
                    <p>이미지 카테고리: {image.name}</p>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(image.category_id)}
                      onChange={() => handleCheckboxChange(image.category_id)}
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
            <button onClick={handleCategoryRecommend}>이미지 등록</button>
          </div>
        </div>
      ) : (
        <div>{window.alert("로그인을 먼저하세요.")}</div> //세번뜸!!!!!!
      )}
    </div>
  );
};

export default Recommend;
