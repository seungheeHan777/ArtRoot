import React, { useState, useEffect } from "react";
import "./detail.css";
import { detail } from "../lib/api/exhibition.js";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { keywordDetail } from "../lib/api/rec.js";
const Exhibitiondetail = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [exhibitionData, setExhibitionData] = useState(null);
  const [keyword, setKeyword] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await detail({ id });

        setExhibitionData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        //키워드 배경지식 불러오기
        const res = await keywordDetail(id);
        setKeyword(res.data.keywordDetail);
        console.log(keyword);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData2();
  }, []);

  if (!exhibitionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contents" style={{ paddingTop: "500px" }}>
      <div className="product_detail">
        <div className="detailArea">
          <div className="imgArea">
            <img
              src={exhibitionData.ART_PICTURE}
              className="product_img"
              alt="Exhibition Image"
            />
          </div>
          <div className="infoArea">
            <div className="headingArea">
              <h2> {exhibitionData.ART_NAME}</h2>
            </div>
            <hr style={{ border: "1px solid", width: "100%" }} />
            <table>
              <tr className="space">
                <th className="t_row">
                  <span>일정</span>
                </th>
                <td>
                  <span>{exhibitionData.date}</span>
                </td>
              </tr>
              <tr className="space">
                <th>
                  <span className="t_row">장소</span>
                </th>
                <td>
                  <span>{exhibitionData.ART_PLACE}</span>
                </td>
              </tr>
              <tr className="space">
                <th>
                  <span className="t_row">시간</span>
                </th>
                <td>
                  <span>{exhibitionData.ART_TIME}</span>
                </td>
              </tr>
              <tr className="space">
                <th>
                  <span className="t_row">가격</span>
                </th>
                <td>
                  <span>{exhibitionData.ART_PRICE}</span>
                </td>
              </tr>
              <tr className="space">
                <th>
                  <span className="t_row">사이트</span>
                </th>
                <td>
                  <span>{exhibitionData.ART_SITE}</span>
                </td>
              </tr>
              <tr className="space">
                <th className="t_row">
                  <span>설명</span>
                </th>
                <td>
                  <span>{exhibitionData.ART_EXPLAIN}</span>
                </td>
              </tr>
            </table>
            <hr className="evaluate_line" />
            <div className="evaluation-section">
              <p>전시회를 인상깊게 보셨다면 평가를 남겨주세요.</p>
              <Button
                href={`/Rating/${exhibitionData.ART_NUM}`}
                className="evaluate_button"
              >
                전시회 평가
              </Button>
            </div>
          </div>
        </div>
        <hr style={{ border: "2px solid", width: "100%" }} />
        <div>
          <h3>배경 정보</h3>
          <span>{keyword ? keyword.name : "Loading..."}</span>
          <span>{keyword ? keyword.detail : "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default Exhibitiondetail;
