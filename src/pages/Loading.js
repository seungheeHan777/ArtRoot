import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  const [results, setResults] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 서버에 요청
  //       const response = await fetch("http://localhost:60008/ai/predicted");
  //       const result = await response.json();
  //       console.log(result);
  //       // 결과를 state에 저장
  //       setResult(result);
  //       // 슬래시로 변경
  //     } catch (error) {
  //       console.error("데이터 가져오기 오류:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // componentDidMount와 동일

  const handleSubmit = async () => {
    try {
      // 이미지를 서버로 전송
      const imagePath1 = "images/0.jpg";
      const imagePath2 = "images/1.jpg";
      // 이미지 경로를 서버로 전송
      const response = await fetch(
        `http://localhost:60008/ai/predicted?imagePath=${encodeURIComponent(
          JSON.stringify([imagePath1, imagePath2])
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.error("이미지 전송 중 오류 발생:", response.statusText);
        return;
      }

      // 결과 읽어오기
      const results = await response.json();

      // 서버에서 받은 결과 활용
      console.log("예측 결과:", results);
      // 결과를 state에 저장
      setResults(results);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      {results ? (
        // <>
        //   <h1>Python 스크립트에서 얻은 결과:</h1>
        //   <p>실제 스타일: {result.actual_style}</p>
        //   <p>예측된 스타일: {result.predicted_style}</p>
        //   <img
        //     src={process.env.PUBLIC_URL + result.public_image_url}
        //     alt="이미지"
        //   />

        //   <p>예측 정확도: {result.prediction_probability.toFixed(2)}%</p>
        // </>
        <>
          <h1>Python 스크립트2에서 얻은 결과:</h1>
          {results.map((result, index) => (
            <div key={index}>
              <p>예측된 스타일: {result.predicted_style}</p>
              <img
                src={process.env.PUBLIC_URL + result.image_path}
                alt={`이미지 ${index}`}
              />
              <p>예측 정확도: {result.prediction_probability.toFixed(2)}%</p>
            </div>
          ))}
        </>
      ) : (
        <div>
          <Spinner
            animation="border"
            variant="info"
            style={{ width: "5rem", height: "5rem", borderWidth: "0.5em" }}
          />
          <div>
            <button onClick={handleSubmit}>예측하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
