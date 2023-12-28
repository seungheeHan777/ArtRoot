import React, { useState, useEffect } from "react";
import { CW } from "../../lib/api/admin";
import { saveImageData } from "../../lib/api/ai";
import "./AdminExhibitionList.css";

const AdminPage = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [existingExhibitionMessage, setExistingExhibitionMessage] =
    useState("");
  const [pageNumber, setPageNumber] = useState(1); // Default to 1
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [labelInputValue, setLabelInputValue] = useState("");

  const API_URL = `http://openapi.seoul.go.kr:8088/4a6a47496f776f67373648534f4f54/json/ListExhibitionOfSeoulMOAInfo/1/${pageNumber}/`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      const dataToSave = data.ListExhibitionOfSeoulMOAInfo.row;
      setExhibitionData(dataToSave);
      dataToSave.forEach((item) => {
        CW(item).then((response) => {
          if (response.message === "이미 존재하는 전시입니다") {
            setExistingExhibitionMessage(response.message);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImageFiles(fileArray);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const updatedPreview = [...imagePreview];
    const updatedFiles = [...imageFiles];

    updatedPreview.splice(index, 1);
    updatedFiles.splice(index, 1);

    setImagePreview(updatedPreview);
    setImageFiles(updatedFiles);
  };

  // 클라이언트의 이미지 파일 및 라벨 정보 전송 함수
  const saveImageDataToServer = async () => {
    try {
      const formData = new FormData();

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("labels", labelInputValue);
      formData.append("imageCount", imageFiles.length);

      const response = await saveImageData(formData);

      if (response.ok) {
        console.log("이미지 파일 및 라벨 정보 전송 성공!");
      } else {
        console.error("이미지 파일 및 라벨 정보 전송 실패");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div>
      {/* 크롤링 부분 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "25px",
            color: "#872323",
            fontWeight: "bold",
          }}
        >
          최신화된 전시
        </h3>
        {/* Input field for the page number */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0", marginRight: "10px" }}>받아올 전시 수:</p>
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
            }}
          />
          {/* Button to trigger API execution */}
          <button
            style={{
              padding: "8px 15px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={fetchData}
          >
            최신화하기
          </button>
        </div>
      </div>
      <hr className="customhr" />

      {/* Display fetched data */}
      {existingExhibitionMessage ? (
        <p style={{ color: "red" }}>{existingExhibitionMessage}</p>
      ) : (
        <ul>
          {exhibitionData
            .filter((item) => item.DP_NAME) // Filter out items without DP_NAME
            .map((item) => (
              <div key={item.DP_SEQ}>
                <li>{item.DP_NAME}</li>
              </div>
            ))}
        </ul>
      )}

      {/* 모델 학습 부분 */}
      <h3
        style={{
          fontSize: "25px",
          color: "#872323",
          fontWeight: "bold",
          marginTop: "200px",
        }}
      >
        화풍 추가
      </h3>
      <hr />

      {/* Image upload section */}
      <div>
        <h4>이미지 업로드</h4>
        <input type="file" onChange={handleFileChange} multiple />
      </div>

      {/* Display uploaded images */}
      <div>
        <h4>업로드된 이미지</h4>
        <div style={{ display: "flex" }}>
          {imagePreview.map((preview, index) => (
            <div
              key={index}
              style={{ marginRight: "10px", position: "relative" }}
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => removeImage(index)}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "black",
                  borderRadius: "30%",
                  padding: "3px",
                  fontWeight: "bold",
                }}
                onClick={() => removeImage(index)}
              >
                X
              </span>
            </div>
          ))}
        </div>
        <p>추가할 화풍의 이름을 적어주세요.</p>
        <label>
          <input
            type="text"
            placeholder="ex)인상주의"
            value={labelInputValue}
            onChange={(e) => setLabelInputValue(e.target.value)}
          />
        </label>
      </div>
      {/* "재학습" 버튼 */}
      <button
        style={{
          padding: "8px 15px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={saveImageDataToServer} // 클릭 시 서버로 이미지 및 라벨 전송
      >
        재학습
      </button>
    </div>
  );
};

export default AdminPage;
