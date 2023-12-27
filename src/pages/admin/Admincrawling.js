import React, { useState, useEffect } from "react";
import { CW } from "../../lib/api/admin";
import "./AdminExhibitionList.css";

const AdminPage = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [existingExhibitionMessage, setExistingExhibitionMessage] =
    useState("");
  const [pageNumber, setPageNumber] = useState(1); // Default to 1

  const API_URL = `http://openapi.seoul.go.kr:8088/4a6a47496f776f67373648534f4f54/json/ListExhibitionOfSeoulMOAInfo/1/${pageNumber}/`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      const dataToSave = data.ListExhibitionOfSeoulMOAInfo.row;
      setExhibitionData(dataToSave);
      dataToSave.forEach((item) => {
        CW(item).then((response) => {
          if (response.message === "이미 존재하는 전시입니다") {
            setExistingExhibitionMessage(response.message);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "25px",
            color: "#872323",
            fontWeight: "bold",
          }}
        >
          최신화된 전시
        </h3>
        {/* Input field for the page number */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0", marginRight: "10px" }}>받아올 전시 수:</p>
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
            }}
          />
          {/* Button to trigger API execution */}
          <button
            style={{
              padding: "8px 15px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={fetchData}
          >
            최신화하기
          </button>
        </div>
      </div>
      <hr className="customhr" />

      {/* Display fetched data */}
      {existingExhibitionMessage ? (
        <p style={{ color: "red" }}>{existingExhibitionMessage}</p>
      ) : (
        <ul>
          {exhibitionData
            .filter((item) => item.DP_NAME) // Filter out items without DP_NAME
            .map((item) => (
              <div key={item.DP_SEQ}>
                <li>{item.DP_NAME}</li>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
