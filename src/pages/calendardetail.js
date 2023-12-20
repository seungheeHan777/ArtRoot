// In MyCalendarDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myone } from "../lib/api/auth";

const MyCalendarDetail = () => {
  const { date } = useParams();
  const [selectedDateInfo, setSelectedDateInfo] = useState([]);

  useEffect(() => {
    const fetchSelectedDateInfo = async () => {
      try {
        const response = await myone();
        console.log("API Response:", response.data); // Log the response
        const dateInfo = response.data.filter((info) => info.date === date);
        setSelectedDateInfo(dateInfo);
        console.log(dateInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSelectedDateInfo();
  }, [date]);

  return (
    <div
      style={{
        paddingTop: "200px",
        paddingLeft: "100px", // Adjusted paddingTop
      }}
    >
      <h1>{date}날 본 전시입니다</h1>
      {selectedDateInfo.map((item) => (
        <div
          style={{
            paddingTop: "50px",
            // Adjusted paddingTop
          }}
          key={item.artnum}
        >
          {item.picture && (
            <a href={`exhibitiondetail/${item.artnum}`}>
              <img
                src={item.picture}
                alt="Event"
                width="200"
                height="200"
                style={{ margin: "10px" }}
              />
            </a>
          )}
          <h2>한줄평 : {item.comment}</h2>
          <p style={{ color: "#FFD700" }}>평가함 {item.stars} ★</p>

          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyCalendarDetail;
