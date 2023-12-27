import React, { useState, useEffect } from "react";
import {
  ADcategory,
  getUser,
  userCategory,
  userImage,
} from "../lib/api/keyword";
import { AIuse, saveuser } from "../lib/api/ai";
import { useSelector } from "react-redux";
import "./Recommend.css"; // CSS 파일을 직접 import
import Loading from "../components/common/Loading";
const Recommend = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // 새로운 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가
  const [aiResult, setAiResult] = useState(null); // AI 결과를 저장할 상태
  const [showAiResult, setShowAiResult] = useState(false); // 표시 여부를 제어하는 상태
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
            console.log("이미지 정보", images);
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
    console.log("selectedCategories", selectedCategories);
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

  const handleShowAnalysisResult = () => {
    // 이미지 분석 결과 보기 기능
    const selectedImageUrls = images
      .filter((image) => selectedCategories.includes(image.category_id))
      .map((image) => image.image_url);

    if (selectedImageUrls.length > 0) {
      const imagePathParam = selectedImageUrls
        .map((url) => encodeURIComponent(url))
        .join(",");
      setShowAiResult(true);
      AIuse(imagePathParam)
        .then((response) => {
          console.log("서버 응답:", response.data);
          const predictedStyles = response.data.map(
            (item) => item.predicted_style
          );
          console.log("predictedStyles", predictedStyles);
          saveuser({ user_id: user.username, styles: predictedStyles })
            .then((response) => {
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error(
                "카테고리 정보를 서버에 전송하는 중 오류가 발생했습니다.",
                error
              );
            });
          setAiResult(response.data);
        })
        .catch((error) => {
          console.error("서버 요청 오류:", error);
        });
    } else {
      console.warn("선택한 이미지가 없습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        <div>
          <h1>추천</h1>
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
            <div
              style={{
                textAlign: "center",
                fontSize: "25px", // 적절한 크기로 조절하세요
                padding: "10px 20px", // 적절한 패딩 설정
                cursor: "pointer",
              }}
            >
              <button onClick={handleShowAnalysisResult}>
                이미지 분석 결과
              </button>
              {showAiResult && (
                <Aiuser res={aiResult} setShowAiResult={setShowAiResult} />
              )}
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
const Aiuser = ({ res, setShowAiResult }) => {
  const [loading, setLoading] = useState(true);
  // 'res'를 사용하여 AI 결과를 이 컴포넌트에서 표시할 수 있습니다.
  useEffect(() => {
    if (res !== null) {
      setLoading(false);
    }
  }, [res]); // useEffect 의존성 배열에 res 추가
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>유저 취향 분석</h1>
      <>
        <h1>Python 스크립트2에서 얻은 결과:</h1>
        {res.map((result, index) => (
          <div key={index}>
            <p>예측된 스타일: {result.predicted_style}</p>
            <img src={result.image_path} alt={`이미지 ${index}`} />
            <p> result.image_path:{result.image_path}</p>
            <p>예측 정확도: {result.prediction_probability.toFixed(2)}%</p>
          </div>
        ))}
      </>
      <button onClick={() => setShowAiResult(false)}>돌아가기</button>
    </div>
  );
};

export default Recommend;
