import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../lib/api/exhibition"; // Axios 라이브러리 추가
import "./ExhibitionSearchList.css";

function ExhibitionSearchList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
      fetchSearchResults(storedSearchTerm);
    }
  }, []);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem("searchTerm", newSearchTerm);
    fetchSearchResults(newSearchTerm);
  };

  const fetchSearchResults = async (query) => {
    try {
      if (query) {
        setLoading(true); // 로딩 시작
        setSearchResults([]); // 초기화
        // Axios를 사용하여 서버로 GET 요청을 보냄
        const response = await search(query);

        if (response.status === 200) {
          // 성공적으로 데이터를 받았을 때
          setSearchResults(response.data.results); // 데이터로 업데이트
          console.log("검색 결과(ebs2):", response.data.results);
        } else {
          console.error("검색 결과를 불러오는데 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  return (
    <div>
      <div className="exhibition_list_header">
        <p className="exhibition_list_title">통합 검색</p>
        <div className="search_input_container">
          <input
            type="text"
            value={searchTerm}
            placeholder="검색어를 입력하세요."
            onChange={handleSearchChange}
          />
        </div>
        <p className="search_input_length">
          <span className="highlighted_text">{`"${searchTerm}"`}</span>에 대한
          검색결과가
          <span className="highlighted_text">
            {` ${searchResults.length}건`}{" "}
          </span>
          있습니다.
        </p>
      </div>

      <div className="exhibition_list_middle_head">
        <p className="list_middle_title">전시회 ({searchResults.length})</p>
        <p className="list_middle_more">더보기 &#62;</p>
      </div>

      <div className="horizontal-line"></div>

      <div className="exhibition_list">
        {searchResults.map((result) => (
          <div className="exhibition_item">
            <div className="image_container">
              <Link to={`/exhibitiondetail/${result.ART_NUM}`}>
                <img
                  src={result.ART_PICTURE}
                  alt="image description"
                  className="exhibition_item_image"
                />
              </Link>
            </div>
            <div className="title_container">
              <a>{result.ART_NAME}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExhibitionSearchList;
