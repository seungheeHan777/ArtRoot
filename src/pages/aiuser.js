import React from "react";
import { useLocation } from "react-router-dom";
const Aiuser = () => {
  const location = useLocation();
  const responseData = location.state?.responseData || null;
  console.log(responseData);
  return (
    <div>
      <h1>유저 취향 분석</h1>
      <>
        <h1>Python 스크립트2에서 얻은 결과:</h1>
        {responseData.map((result, index) => (
          <div key={index}>
            <p>예측된 스타일: {result.predicted_style}</p>
            <img src={result.image_path} alt={`이미지 ${index}`} />
            <p> result.image_path:{result.image_path}</p>
            <p>예측 정확도: {result.prediction_probability.toFixed(2)}%</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default Aiuser;
