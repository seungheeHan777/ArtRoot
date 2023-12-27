import React, { useState } from "react";
import { Form, FormGroup, Image, Alert, Button } from "react-bootstrap";
import { exhibitionAdd } from "../../lib/api/admin";
import "./ExhibitionAdd.css";

const ExhibitionAdd = () => {
  const [isDiscount, setIsDiscount] = useState(false); // 할인 여부 상태
  const [imagePreviews, setImagePreviews] = useState([]); //업로드 이미지 미리보기
  const [showAlert, setShowAlert] = useState(false); //업로드 이미지 개수 제한 알람
  const [updatedInfo, setUpdatedInfo] = useState({
    ART_WORK: [],
    ART_NUM: "",
    ART_NAME: "",
    ART_EXPLAIN: "",
    ART_START: "",
    ART_END: "",
    ART_TIME: "",
    ART_CLOSED: "",
    ART_PLACE: "",
    ART_ADDR: "",
    ART_PRICE: "",
    ART_SITE: "",
    ART_BACK: "",
    ART_PREFER: "",
    ART_ARTIST: "",
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    const updatedFiles = Array.from(files);

    // 10개만 등록되도록 개수 확인
    if (imagePreviews.length + updatedFiles.length > 10) {
      setShowAlert(true);
      return;
    }

    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      ART_WORK: [...prevInfo.ART_WORK, ...updatedFiles],
    }));
    console.log("updatedInfo.ART_WORK)", updatedInfo.ART_WORK);
    // 업로드 이미지 미리보기 업데이트
    const newPreviews = updatedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    // Remove the corresponding file from ART_WORKS array in updatedInfo
    setUpdatedInfo((prevInfo) => {
      const newFiles = [...prevInfo.ART_WORK];
      newFiles.splice(index, 1);
      return { ...prevInfo, ART_WORK: newFiles };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력 필드의 name 속성을 사용하여 상태 업데이트
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  // 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    try {
      // updatedInfo에서 빈 값을 null로 설정
      const updatedData = Object.entries(updatedInfo).reduce(
        (acc, [key, value]) => {
          // 빈 문자열인 경우 null로 설정
          acc[key] = value === "" ? null : value;
          return acc;
        },
        {}
      );
      updatedData.ART_DISCOUNT = isDiscount;
      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (key === "ART_WORK") {
          // 이미지 파일은 여러 개일 수 있으므로 배열로 처리
          value.forEach((file, index) => {
            formData.append(`ART_WORK[${index}]`, file);
          });
        } else {
          formData.append(key, value);
        }
      });
      console.log("updatedData", updatedData);
      const response = await exhibitionAdd(formData);
      console.log("전시회 추가 성공:", response.data);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="contents">
      <div className="product_detail">
        <p className="exhibitionaddtitle">전시회 등록</p>
        <hr />
        <Form>
          <FormGroup className="form-group">
            <Form.Label className="form-label">대표 이미지 </Form.Label>
            <Form.Control
              className="form-control"
              placeholder="전시회 대표 이미지로 사용할 이미지 URL을 입력해주세요."
              name="ART_PICTURE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">전시 작품</Form.Label>
            <Form.Control
              className="form-control"
              type="file"
              name="ART_WORKS"
              multiple
              onChange={(e) => handleFileChange(e, "ART_WORKS")}
            />
          </FormGroup>
          <p className="artwork_script">※ 전시 작품을 10개 등록해주세요.</p>
          {imagePreviews?.length > 0 && (
            <FormGroup className="form-group">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <Image
                    src={preview}
                    alt={`전시 작품 ${index + 1}`}
                    thumbnail
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => removeImage(index)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => removeImage(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </FormGroup>
          )}
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              최대 10개의 전시 작품만 등록할 수 있습니다!!
            </Alert>
          )}
          <FormGroup className="form-group">
            <Form.Label className="form-label">전시 번호</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NUM"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">전시명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NAME"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">전시 설명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_EXPLAIN"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">시작일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_START"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">종료일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_END"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">시간</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_TIME"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">휴관일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_CLOSED"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">장소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PLACE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">주소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ADDR"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">가격</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PRICE"
              placeholder="무료일 경우 할인 여부를 체크하지 않아도 됩니다."
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Check
              type="checkbox"
              label="할인 여부"
              name="ART_DISCOUNT"
              checked={isDiscount}
              onChange={() => setIsDiscount(!isDiscount)}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Form.Label className="form-label">링크</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_SITE"
              onChange={handleInputChange}
            />
          </FormGroup>
          {/* <FormGroup className="form-group">
            <Form.Label className="form-label">분야</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PREFER"
              onChange={handleInputChange}
            />
          </FormGroup> */}
          <FormGroup className="form-group">
            <Form.Label className="form-label">작가</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ARTIST"
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
        <hr />
        <button
          className="savebtn"
          onClick={handleSubmit}
          href={"/AdminExhibitionList"}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default ExhibitionAdd;
