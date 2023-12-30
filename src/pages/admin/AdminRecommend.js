import React, { useState, useEffect } from "react";
import {
  ADcategory,
  ADdeletecategories,
  addCategories,
  addImages,
} from "../../lib/api/keyword";
function AdminRecommend() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    keyword_id: 0,
  });
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState({
    name: "",
    image_url: "",
    keyword_id: 0, // 초기값은 0으로 설정
  });

  useEffect(() => {
    fetchData("word"); // 카테고리 데이터를 불러올 때
    fetchData("image"); // 이미지 데이터를 불러올 때
  }, []);

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

  const addCategory = () => {
    const { name, keyword_id } = newCategory;
    if (name.trim() === "") {
      alert("이름을 입력하세요.");
      return;
    }
    // keyword_id가 0이면 null로 처리
    const sanitizedKeywordId = keyword_id === 0 ? null : keyword_id;

    addCategories({ type: "word", name: name, keyword_id: sanitizedKeywordId })
      .then(() => {
        setNewCategory(""); // 입력 필드를 초기화
        fetchData("word"); // 카테고리 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error("카테고리를 추가하는 중 오류가 발생했습니다.", error);
      });
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
  const deleteSelectedCategories = () => {
    // 선택된 카테고리의 이름 목록을 생성
    console.log(selectedCategories);
    const categoryIdsToDelete = selectedCategories.map(
      (category_id) => category_id
    );
    console.log("삭제 카테고리 :", categoryIdsToDelete);
    // 서버로 선택된 카테고리 이름 목록을 보냅니다.
    ADdeletecategories(categoryIdsToDelete)
      .then(() => {
        setSelectedCategories([]);
        fetchData("word"); // 카테고리 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error(
          "선택한 카테고리를 삭제하는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  // 이미지 삭제 함수 수정
  const deleteSelectedImages = () => {
    // 선택된 카테고리의 이름 목록을 생성
    console.log(selectedCategories);
    const categoryIdsToDelete = selectedCategories.map(
      (category_id) => category_id
    );
    console.log("이미지가 성공적으로 삭제되었습니다.");
    // 서버로 선택된 카테고리 이름 목록을 보냅니다.
    ADdeletecategories(categoryIdsToDelete)
      .then(() => {
        setSelectedCategories([]);
        fetchData("image"); // 카테고리 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error("이미지 삭제 중 오류가 발생했습니다.", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageData((prevImageData) => ({
      ...prevImageData,
      [name]: value,
    }));
  };
  const addImage = () => {
    const { name, image_url, keyword_id } = imageData;

    if (!image_url || !name) {
      alert("이미지 URL과 이름 모두 입력해야 합니다.");
      return;
    }

    if (categories.some((category) => category.name === name)) {
      alert("이미 존재하는 장르입니다.");
      return;
    }
    if (images.some((image) => image.name === name)) {
      alert("이미 존재하는 장르입니다.");
      return;
    }
    // keyword_id가 0이면 null로 처리
    const sanitizedKeywordId = keyword_id === 0 ? null : keyword_id;

    // 클라이언트에서 서버로 이미지 URL과 장르를 전송
    // api 경로를 addImage로 변경
    addImages({
      type: "image",
      name,
      image_url,
      keyword_id: sanitizedKeywordId,
    })
      .then(() => {
        console.log("이미지가 성공적으로 추가되었습니다.");

        fetchData("image");
        setImageData({
          name: "",
          image_url: "",
          keyword_id: 0,
        });
      })
      .catch((error) => {
        console.error("이미지 추가 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <div>
      {/* <h1>카테고리/이미지 관리 페이지</h1>
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
                  checked={selectedCategories.includes(category.category_id)}
                  onChange={() => handleCheckboxChange(category.category_id)}
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
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="keyword_id 입력"
          value={newCategory.keyword_id}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              keyword_id: parseInt(e.target.value),
            })
          }
        />
        <button onClick={addCategory}>카테고리 추가</button>
        <button onClick={deleteSelectedCategories}>카테고리 삭제</button>
      </div>
      <hr /> */}
      <h2>등록된 이미지</h2>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.image_id} className="image-item">
            <div className="image-content">
              <img
                src={image.image_url}
                alt={`이미지 ${image.image_id}`}
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
      <div style={{ margin: "20px 0" }}>
        <h2
          style={{
            marginLeft: "20px",
          }}
        >
          이미지 추가
        </h2>
        <label
          style={{
            marginTop: "20px",
          }}
        >
          Name:
          <input
            style={{
              marginLeft: "20px",
            }}
            type="text"
            name="name"
            value={imageData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label
          style={{
            marginTop: "20px",
          }}
        >
          Image URL:
          <input
            style={{
              marginLeft: "20px",
            }}
            type="text"
            name="image_url"
            value={imageData.image_url}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Keyword ID:
          <input
            style={{
              marginLeft: "20px",
            }}
            type="number"
            name="keyword_id"
            value={imageData.keyword_id}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button
          onClick={addImage}
          style={{
            margin: "10px 0",
            padding: "8px 16px",
            backgroundColor: "#872323", // 빨간색
            color: "#FFF", // 흰색
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          이미지 추가
        </button>
        <button
          onClick={deleteSelectedImages}
          style={{
            marginLeft: "20px",
            padding: "8px 16px",
            backgroundColor: "#872323", // 빨간색
            color: "#FFF", // 흰색
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          선택된 이미지 삭제
        </button>
      </div>
    </div>
  );
}

export default AdminRecommend;
