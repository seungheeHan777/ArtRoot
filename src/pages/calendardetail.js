// In MyCalendarDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myone } from "../lib/api/auth";

const MyCalendarDetail = ({ dateStr }) => {
  console.log(dateStr);
  const [selectedDateInfo, setSelectedDateInfo] = useState([]);

  useEffect(() => {
    const fetchSelectedDateInfo = async () => {
      try {
        const response = await myone();
        console.log("API Response:", response.data);
        const dateInfo = response.data.filter((info) => info.date === dateStr); // Fix the comparison here
        setSelectedDateInfo(dateInfo);
        console.log(dateInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSelectedDateInfo();
  }, [dateStr]);

  return (
    <div
      style={{
        paddingTop: "20px",
        paddingLeft: "20px",
      }}
    >
      <h1>{dateStr}날 본 전시</h1>
      {selectedDateInfo.map((item) => (
        <div
          key={item.artnum}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {item.picture && (
            <a href={`exhibitiondetail/${item.artnum}`}>
              <img
                src={item.picture}
                alt="Event"
                width="300px"
                height="300px"
                style={{ marginBottom: "10px", borderRadius: "8px" }}
              />
            </a>
          )}
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
            한줄평 : {item.comment}
          </h2>
          <p style={{ color: "#FFD700", fontSize: "16px" }}>
            평가함 {item.stars} ★
          </p>

          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyCalendarDetail;
