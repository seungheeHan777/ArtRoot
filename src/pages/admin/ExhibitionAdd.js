import React, { useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import { exhibitionAdd } from "../../lib/api/admin";
const ExhibitionAdd = () => {
  const [isDiscount, setIsDiscount] = useState(false); // 할인 여부 상태
  const [updatedInfo, setUpdatedInfo] = useState({
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력 필드의 name 속성을 사용하여 상태 업데이트
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  // 수정 버튼 클릭 시 호출되는 함수
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
      // 서버로 업데이트 데이터를 보내거나 필요한 작업을 수행
      const response = await exhibitionAdd(updatedData);
      // 서버 응답에 따른 작업 수행 (예: 성공 메시지 표시)
      console.log("전시회 추가 성공:", response.data);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="contents" style={{ paddingTop: "250px" }}>
      <div className="product_detail">
        <div className="imgArea">
          <img className="product_img" alt="Exhibition Image" />
        </div>
        <hr />
        <Form>
          <FormGroup>
            <Form.Label>전시 이미지 </Form.Label>
            <Form.Control
              class="form-control"
              placeholder="이미지 URL 입력"
              name="ART_PICTURE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>ART_NUM</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NUM"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NAME"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 설명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_EXPLAIN"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 시작일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_START"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 종료일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_END"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 시간</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_TIME"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 휴관일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_CLOSED"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 장소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PLACE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 주소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ADDR"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 가격</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PRICE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Check
              type="checkbox"
              label="할인 여부"
              name="ART_DISCOUNT"
              checked={isDiscount}
              onChange={() => setIsDiscount(!isDiscount)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 링크</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_SITE"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 배경지식</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_BACK"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 ART_PREFER</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PREFER"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>참여 아티스트</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ARTIST"
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
        <Button onClick={handleSubmit} href={"/AdminExhibitionList"}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default ExhibitionAdd;
