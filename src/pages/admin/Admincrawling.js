import React, { useState, useEffect } from "react";
import { CW } from "../../lib/api/admin";
import { saveImageData } from "../../lib/api/ai";
import "./AdminExhibitionList.css";
import "./Admincrawling.css";
import Loading from "../../components/common/Loading";

const AdminPage = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [existingExhibitionMessage, setExistingExhibitionMessage] =
    useState("");
  const [pageNumber, setPageNumber] = useState(1); // Default to 1
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [labelInputValue, setLabelInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

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
      setLoading(true);
      const formData = new FormData();

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("labels", labelInputValue);
      formData.append("imageCount", imageFiles.length);

      const response = await saveImageData(formData);
      console.log("response:", response);
      if (response.ok) {
        console.log("이미지 파일 및 라벨 정보 전송 성공!");
        console.log("response:", response);
        setLoading(false);
      } else {
        console.error("이미지 파일 및 라벨 정보 전송 실패");
        console.log("response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("에러:", error);
      setLoading(false);
    }
  };

  // 서버로부터 학습 결과를 받아오는 함수
  const fetchResultData = async () => {
    try {
      const response = await fetch("/api/getResultData"); // 서버의 API 경로에 맞게 수정
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResultData(data);
      } else {
        console.error("Error fetching result data");
      }
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 학습 결과를 가져옴
    fetchResultData();
  }, []);

  return (
    <div>
      {/* 크롤링 부분 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "25px",
            color: "#872323",
            fontWeight: "bold",
          }}
        >
          추가 전시 목록
        </h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0", marginRight: "10px", fontWeight: "bold" }}>
            추가 전시 수
          </p>
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "1px solid #872323",
            }}
          />
          {/* Button to trigger API execution */}
          <button
            style={{
              padding: "8px 15px",
              fontSize: "16px",
              backgroundColor: "#872323",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={fetchData}
          >
            크롤링
          </button>
        </div>
      </div>

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

      <div>
        {/* Image upload section */}
        <div className="image_upload_section">
          <p className="image_upload_title">※주의사항※</p>
          <p className="image_upload_explain">
            추가하시고 싶은 화풍이 있을 경우 해당 화풍의 이미지와 화풍명을
            넣어주세요.
          </p>
          <p className="image_upload_explain">
            더 정확한 분류를 원하실 경우 업로드 이미지양을 늘려주세요.
          </p>
          <p className="image_upload_explain">
            모델이 학습을 다시 진행하는데 상당한 시간이 소요됩니다.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>
            추가할 화풍의 이름을 적어주세요.
          </p>
          <label>
            <input
              type="text"
              placeholder="ex)인상주의"
              value={labelInputValue}
              onChange={(e) => setLabelInputValue(e.target.value)}
              style={{
                borderRadius: "5px",
                height: "30px",
                marginLeft: "10px",
              }}
            />
          </label>
        </div>

        {/* Display uploaded images */}
        <div>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>
            업로드 할 이미지를 선택해주세요.
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="file_uplaad"
          />
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
        </div>
      </div>
      {/* "재학습" 버튼 */}
      {loading && <Loading />}
      <button
        style={{
          padding: "8px 15px",
          fontSize: "16px",
          backgroundColor: "#c87b7b",
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
      {/* 결과 출력 부분 */}
      {resultData && (
        <div>
          <h3
            style={{ fontSize: "25px", color: "#872323", fontWeight: "bold" }}
          >
            학습 결과
          </h3>
          <div>
            {/* 여기에 결과를 표시하는 방식을 추가할 수 있습니다. */}
            {/* 예시: 결과를 JSON 형태로 출력 */}
            <pre>{JSON.stringify(resultData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
