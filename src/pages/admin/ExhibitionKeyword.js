import React, { useState, useEffect } from "react";
import {
  getExkeyword,
  addExkeyword,
  delExkeyword,
  ADkeyword,
} from "../../lib/api/keyword";
import { allList } from "../../lib/api/exhibition";
const ExhibitionKeyword = () => {
  const [exhibition, setExhibition] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [exhibitionKeywords, setExhibitionKeywords] = useState([]);
  const [ArtNum, setArtNum] = useState("");
  const [KeywordId, setKeywordId] = useState("");

  useEffect(() => {
    allList()
      .then((response) => setExhibition(response.data))
      .catch((error) =>
        console.error("exhibition 데이터를 가져오는 중 오류 발생:", error)
      );
    ADkeyword()
      .then((response) => setKeyword(response.data))
      .catch((error) =>
        console.error("keyword 데이터를 가져오는 중 오류 발생:", error)
      );
    getExkeyword()
      .then((response) => setExhibitionKeywords(response.data))
      .catch((error) =>
        console.error(
          "exhibition_keyword 데이터를 가져오는 중 오류 발생:",
          error
        )
      );
  }, []);

  const handleAddExhibitionKeyword = () => {
    // 새로운 exhibition_keyword 데이터를 추가하기 위해 POST 요청
    addExkeyword({ ART_NUM: ArtNum, keyword_id: KeywordId })
      .then((response) => {
        console.log(response.data.message);
        // 추가 후 exhibition_keyword 데이터를 새로고침
        getExkeyword()
          .then((response) => setExhibitionKeywords(response.data))
          .catch((error) =>
            console.error(
              "exhibition_keyword 데이터를 가져오는 중 오류 발생:",
              error
            )
          );
      })
      .catch((error) =>
        console.error("exhibition_keyword 데이터 추가 중 오류 발생:", error)
      );
  };

  const handleDeleteExhibitionKeyword = (ART_NUM, keyword_id) => {
    console.log(ART_NUM, keyword_id);
    // exhibition_keyword 데이터를 삭제하기 위해 DELETE 요청
    delExkeyword({ ART_NUM: ART_NUM, keyword_id: keyword_id })
      .then((response) => {
        console.log(response.data.message);
        // 삭제 후 exhibition_keyword 데이터를 새로고침
        getExkeyword()
          .then((response) => setExhibitionKeywords(response.data))
          .catch((error) =>
            console.error(
              "exhibition_keyword 데이터를 가져오는 중 오류 발생:",
              error
            )
          );
      })
      .catch((error) =>
        console.error("exhibition_keyword 데이터 삭제 중 오류 발생:", error)
      );
  };

  return (
    <div style={{ paddingTop: "500px" }}>
      <h2>전시회 목록</h2>
      {exhibition.map(({ ART_NUM, ART_NAME }) => (
        <li>{`ART_NUM: ${ART_NUM}, ART_NAME: ${ART_NAME}`}</li>
      ))}
      <h2>키워드 목록</h2>
      {keyword.map(({ keyword_id, name }) => (
        <li>{`keyword_id: ${keyword_id}, name: ${name}`}</li>
      ))}
      <h2>전시 키워드</h2>
      <ul>
        {exhibitionKeywords.map(({ ART_NUM, keyword_id, ART_NAME, name }) => (
          <li key={`${ART_NUM}-${keyword_id}`}>
            {`ART_NUM: ${ART_NUM}, ART_NAME: ${ART_NAME}, keyword_id: ${keyword_id}, name: ${name}`}
            <button
              onClick={() => handleDeleteExhibitionKeyword(ART_NUM, keyword_id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="ART_NUM"
          value={ArtNum}
          onChange={(e) => setArtNum(e.target.value)}
        />
        <input
          type="text"
          placeholder="Keyword ID"
          value={KeywordId}
          onChange={(e) => setKeywordId(e.target.value)}
        />
        <button onClick={handleAddExhibitionKeyword}>전시 키워드 추가</button>
      </div>
    </div>
  );
};

export default ExhibitionKeyword;
