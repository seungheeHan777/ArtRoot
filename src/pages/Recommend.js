import React, { useState, useEffect } from "react";
import {
  ADcategory,
  getUser,
  userCategory,
  userImage,
} from "../lib/api/keyword";
import { useSelector } from "react-redux";
import "./Recommend.css"; // CSS 파일을 직접 import
const Recommend = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // 새로운 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가
  const imagesPerPage = 8; // 페이지당 이미지 수
  useEffect(() => {
    // Fetch category and image data when the component mounts
    fetchData("word"); // Fetch categories
    fetchData("image"); // Fetch images
    if (user) {
      fetchUserPrefer();
      fetchUserImagePrefer(); // Fetch user image preferences
    }
    if (!user && showAlert) {
      window.alert("로그인을 먼저하세요.");
      setShowAlert(false); // 한 번만 알림을 표시하도록 상태 업데이트
    }
  }, [user, showAlert]);

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

  // 현재 페이지에 해당하는 이미지 목록을 반환
  const getCurrentImages = () => {
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    return images.slice(indexOfFirstImage, indexOfLastImage);
  };

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ paddingTop: "250px", textAlign: "center" }}>
      {user ? (
        <div>
          <h1>추천</h1>
          {/* <h2>카테고리 키워드 선택</h2>
          <div className="button-container" style={{ paddingTop: "20px" }}>
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  selectedCategories.includes(category.category_id)
                    ? "selected"
                    : ""
                }
                style={{
                  marginRight: "40px",
                  marginLeft: "40px",
                  marginBottom: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "25px",
                }}
                onClick={() => handleCheckboxChange(category.category_id)}
              >
                {category.name}
              </button>
            ))}
          </div> */}
          {/* <div
            style={{
              textAlign: "center",
              fontSize: "25px", // 적절한 크기로 조절하세요
              padding: "10px", // 적절한 패딩 설정
              cursor: "pointer",
            }}
          >
            <button onClick={handleCategoryRecommend}>등록</button>
          </div> */}
          <hr />
          <div>
            <h2>이미지 선택</h2>
            <div className="image-container">
              {getCurrentImages().map((image) => (
                <div key={image.category_id} className="image-item">
                  <div className="image-content">
                    <img
                      src={image.image_url}
                      alt={`이미지 ${image.category_id}`}
                      style={{
                        width: "200px",
                        height: "150px",
                        border: selectedCategories.includes(image.category_id)
                          ? "5px solid red"
                          : "none",
                      }}
                      onClick={() => handleCheckboxChange(image.category_id)}
                    />
                    <p>이미지 카테고리: {image.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(images.length / imagesPerPage)
                }
              >
                다음
              </button>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "25px", // 적절한 크기로 조절하세요
                padding: "10px 20px", // 적절한 패딩 설정
                cursor: "pointer",
              }}
            >
              <button onClick={handleCategoryRecommend}>이미지 등록</button>
            </div>
          </div>
        </div>
      ) : (
        // 아래의 코드 블록을 수정
        showAlert && (
          <div>
            {(() => {
              window.alert("로그인을 먼저하세요.");
              setShowAlert(false);
            })()}
          </div>
        )
      )}
    </div>
  );
};

export default Recommend;
