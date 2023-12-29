import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { exhibitionUpdate, exhibitionDel, eximages } from "../../lib/api/admin";
import { detail } from "../../lib/api/exhibition";
import { AIuse, saveEx } from "../../lib/api/ai";
import "./AdminExhibitiondetail.css";
import Loading from "../../components/common/Loading";
import DoughnutChart from "../../components/common/Doughnut";
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
  const [aiResult, setAiResult] = useState(null); // AI 결과를 저장할 상태
  const [showAiResult, setShowAiResult] = useState(false); // 표시 여부를 제어하는 상태
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
        setIsDiscount(response.data.ART_DISCOUNT === "1"); //할인 여부 설정 불러오기
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
      updatedData.ART_DISCOUNT = isDiscount ? "1" : "0";
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
  // 전시회 이미지 가져오기 버튼
  const handleAI = async () => {
    try {
      // 서버로 AI 추출 요청을 보냄
      const response = await eximages(id);
      if (response.data.imagedatas) {
        const imagedatas = response.data.imagedatas;
        console.log("imagedatas", imagedatas);
        const imagePathParam = imagedatas
          .map((url) => encodeURIComponent(url))
          .join(",");
        console.log("imagePathParam", imagePathParam);
        setShowAiResult(true); // AI 결과를 표시
        AIuse(imagePathParam)
          .then((res) => {
            console.log("서버 응답", res.data);
            const predictedStyles = res.data.map(
              (item) => item.predicted_style
            );
            console.log("predictedStyles", predictedStyles);
            // 각 값의 개수를 저장할 객체
            const styleCount = predictedStyles.reduce((acc, style) => {
              // 이미 개수를 저장하고 있는 경우 1을 더하고,
              // 처음 나오는 경우 1로 초기화
              acc[style] = (acc[style] || 0) + 1;
              return acc;
            }, {});

            console.log("styleCount", styleCount);
            saveEx({ ART_NUM: exhibitionData.ART_NUM, styles: predictedStyles })
              .then((response) => {
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error(
                  "카테고리 정보를 서버에 전송하는 중 오류가 발생했습니다.",
                  error
                );
              });
            setAiResult({ predictions: res.data, styleCount: styleCount });
          })
          .catch((error) => {
            console.error("서버 요청 오류:", error);
          });
      }
    } catch (error) {
      console.error("AI로 카테고리 추출 중 에러 발생:", error);
    }
  };
  if (!exhibitionData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="product_detail">
        <div className="imgArea" style={{ width: "100%", textAlign: "center" }}>
          <img
            src={exhibitionData.ART_PICTURE}
            className="product_img"
            alt="Exhibition Image"
          />
        </div>
        <hr />
        <Form>
          <FormGroup>
            <Form.Label>전시명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_NAME"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_NAME : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>전시 설명</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_EXPLAIN"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_EXPLAIN : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>시작일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_START"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_START : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>종료일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_END"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_END : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>시간</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_TIME"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_TIME : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>휴관일</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_CLOSED"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_CLOSED : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>장소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PLACE"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_PLACE : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>주소</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ADDR"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_ADDR : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>가격</Form.Label>
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
            <Form.Label>링크</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_SITE"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_SITE : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>분야</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_PREFER"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_PREFER : ""}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>작가</Form.Label>
            <Form.Control
              class="form-control"
              name="ART_ARTIST"
              onChange={handleInputChange}
              placeholder={exhibitionData ? exhibitionData.ART_ARTIST : ""}
            />
          </FormGroup>
        </Form>
        <button
          onClick={handleSubmit}
          href={`/AdminExhibitiondetail/${id}`}
          className="save_btn"
        >
          정보 수정
        </button>
        <button
          onClick={handleDelete}
          href="/AdminExhibitionList"
          className="delete_btn"
        >
          전시회 삭제
        </button>
        <button onClick={handleAI} className="save_btn">
          ai로 카테고리 추출하기
        </button>
        {showAiResult && (
          <AiExhibition res={aiResult} setShowAiResult={setShowAiResult} />
        )}
      </div>
    </div>
  );
};

// AiExhibition 컴포넌트
const AiExhibition = ({ res, setShowAiResult }) => {
  const [loading, setLoading] = useState(true);
  // 'res'를 사용하여 AI 결과를 이 컴포넌트에서 표시할 수 있습니다.
  useEffect(() => {
    if (res !== null) {
      console.log("res", res);
      setLoading(false);
    }
  }, [res]); // useEffect 의존성 배열에 res 추가
  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <>
        <div>
          {/* <h2>스타일 별 개수:</h2>

          {Object.entries(res.styleCount).map(([style, count]) => (
            <p key={style}>{`${style}: ${count}`}</p>
          ))} */}

          <div
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "150px",
              marginLeft: "150px",
            }}
          >
            <DoughnutChart
              labels={Object.keys(res.styleCount)}
              data={Object.values(res.styleCount)}
            />
          </div>
        </div>
        {res.predictions.map((result, index) => (
          <div
            key={index}
            style={{
              margin: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>
              예측된 스타일: {result.predicted_style}
            </h3>
            <img
              src={result.image_path}
              alt={`이미지 ${index}`}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
            {/* <p> result.image_path:{result.image_path}</p> */}
            <p style={{ fontWeight: "bold" }}>
              예측 정확도: {result.prediction_probability.toFixed(2)}%
            </p>
          </div>
        ))}
      </>
      <button
        onClick={() => setShowAiResult(false)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        돌아가기
      </button>
    </div>
  );
};

export default AdminExhibitiondetail;
