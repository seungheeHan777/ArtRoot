import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../lib/api/exhibition"; // Axios 라이브러리 추가
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
    <div
      className="tab-pane fade show active d-flex justify-content-center align-items-center"
      id="current"
      role="tabpanel"
      aria-labelledby="current-tab"
      style={{ paddingTop: "200px", minHeight: "100vh" }}
    >
      {loading ? (
        <p>로딩 중...</p>
      ) : searchResults.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="exhibition-list">
          <h1
            style={{
              textAlign: "left",
              marginLeft: "250px",
              marginBottom: "50px",
            }}
          >
            검색 결과
          </h1>
          <hr></hr>
          {searchResults.map((result) => (
            <div
              className="tab-pane fade show active"
              id="current"
              role="tabpanel"
              aria-labelledby="current-tab"
            >
              <div className="row">
                <div className="col-12">
                  <article
                    className="currExibitColumn gridView d-flex mb-6 mb-lg-9 mb-xl-12 mx-auto"
                    style={{ marginBottom: "50px" }}
                  >
                    <div className="imgHolder flex-shrink-0 mr-4 mr-lg-6 mr-xl-8">
                      <Link to={`/exhibitiondetail/${result.ART_NUM}`}>
                        <img
                          src={result.ART_PICTURE}
                          className="img-fluid w-100 d-block"
                          alt="image description"
                          style={{ width: "300px", height: "200px" }}
                        />
                      </Link>
                    </div>
                    <div className="descrWrap pt-md-2 pt-lg-5">
                      <h2
                        className="mb-1 mb-sm-3"
                        style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                      >
                        <a style={{ textDecoration: "none", color: "#333" }}>
                          {result.ART_NAME}
                        </a>
                      </h2>
                      <time
                        dateTime="2011-01-12"
                        className="d-block cecTime text-gray777"
                        style={{ fontSize: "1rem" }}
                      >
                        <p>
                          전시 기간: {result.ART_START} - {result.ART_END}
                        </p>
                      </time>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExhibitionSearchList;
