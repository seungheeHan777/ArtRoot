import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, FormGroup, Button } from "react-bootstrap";
import { exhibitionUpdate, exhibitionDel } from "../../lib/api/admin";
import { detail } from "../../lib/api/exhibition";
const AdminExhibitiondetail = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [exhibitionData, setExhibitionData] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false); // 할인 여부 상태
  const [updatedInfo, setUpdatedInfo] = useState({
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await detail({ id }); // Use the 'id' parameter in the URL
        setExhibitionData(response.data);
        setIsDiscount(response.data.ART_DISCOUNT === "1");//할인 여부 설정 불러오기
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  // 수정 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    try {
      // updatedInfo에서 빈 값을 제외한 항목만 추출
      const updatedData = Object.entries(updatedInfo).reduce(
        (acc, [key, value]) => {
          if (value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      // 할인 여부 값을 '0' 또는 '1'로 설정
      updatedData.ART_DISCOUNT = isDiscount ? '1' : '0';
      // 서버로 업데이트 데이터를 보내거나 필요한 작업을 수행
      const response = await exhibitionUpdate(id, updatedData);
      // 서버 응답에 따른 작업 수행 (예: 성공 메시지 표시)
      console.log("업데이트 성공:", response.data);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  // 전시회 삭제 버튼
  const handleDelete = async () => {
    if (window.confirm("정말로 이 전시회를 삭제하시겠습니까?")) {
      try {
        const response = await exhibitionDel(id);
        console.log("전시회 삭제 성공:", response.data);
      } catch (error) {
        console.error("전시회 삭제 중 에러 발생:", error);
      }
    }
  };

  if (!exhibitionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contents">
      <div className="product_detail">
        <div className="imgArea">
          <img
            src={exhibitionData.ART_PICTURE}
            className="product_img"
            alt="Exhibition Image"
          />
        </div>
        <hr />
        <Form>
          <FormGroup>
            <Form.Label>전시회 명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NAME"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_NAME : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 설명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_EXPLAIN"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_EXPLAIN : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 시작일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_START"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_START : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 종료일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_END"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_END : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 시간</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_TIME"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_TIME : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 휴관일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_CLOSED"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_CLOSED : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 장소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PLACE"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_PLACE : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 주소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ADDR"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_ADDR : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 가격</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PRICE"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_PRICE : ""}
            />
          </FormGroup>
          <Form.Check
            type="checkbox"
            label="할인 여부"
            name="ART_DISCOUNT"
            checked={isDiscount}
            onChange={() => setIsDiscount(!isDiscount)}
          />
          <FormGroup>
            <Form.Label>전시회 링크</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_SITE"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_SITE : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 배경지식</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_BACK"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_BACK : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시회 분야</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PREFER"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_PREFER : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>참여 아티스트</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ARTIST"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_ARTIST : ""}
            />
          </FormGroup>
        </Form>
        <Button onClick={handleSubmit} href={`/AdminExhibitiondetail/${id}`}>
          저장
        </Button>
        <Button onClick={handleDelete} href="/AdminExhibitionList">
          삭제
        </Button>
      </div>
    </div>
  );
};

export default AdminExhibitiondetail;
