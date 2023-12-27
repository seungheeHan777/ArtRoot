import React, { useState, useEffect } from "react";
import { allRating } from "../lib/api/exhibition";
import { Link } from "react-router-dom";
import "./home.css";

const TOPExhibitionItem = () => {
  const [date, setDate] = useState(new Date());
  const [topImages, setTopImages] = useState([]);

  useEffect(() => {
    const fetchTopImages = async () => {
      try {
        const response = await allRating();
        const allOneData = response.data;

        // Filter data for the current week (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const filteredData = allOneData.filter(
          (item) =>
            new Date(item.ONE_DATE) >= oneWeekAgo &&
            new Date(item.ONE_DATE) <= new Date()
        );

        // Count occurrences of ONE_ARTNUM
        const artNumCount = filteredData.reduce((countMap, item) => {
          const artNum = item.ONE_ARTNUM;
          countMap[artNum] = (countMap[artNum] || 0) + 1;
          return countMap;
        }, {});

        // Sort by count in descending order and select top 5
        const sortedArtNums = Object.keys(artNumCount)
          .sort((a, b) => artNumCount[b] - artNumCount[a])
          .slice(0, 5);

        // Get ONE_PICTURE and one_stars for the top 5 ONE_ARTNUMs
        const topImagesData = sortedArtNums.map((artNum, index) => {
          const items = filteredData.filter(
            (data) => data.ONE_ARTNUM === artNum
          );
          const count = items.length;

          // Sum only the ONE_STARS values for the exhibitions with the same artnum

          return count > 0
            ? {
                image: items[0].ONE_PICTURE,
                artnum: artNum,
                title: items[0].ONE_NAME,
                count,
                rank: index + 1,
              }
            : null;
        });

        setTopImages(topImagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopImages();
  }, [date]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {topImages.map((item, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            marginRight: index < topImages.length - 1 ? "10px" : "0", // Adjust the marginRight value
            textAlign: "left",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "1",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "5px",
              textAlign: "left",
              color: "white", // 순위 글씨 색상
              background: "rgba(0, 0, 0, 0.5)", // 순위 글씨 배경색
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {item.rank}
          </p>
          <Link to={`/exhibitiondetail/${item.artnum}`}>
            <img
              src={item.image}
              alt={`Top Image ${index + 1}`}
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "10px",
                position: "relative", // 이미지가 자신의 위치를 기준으로 함
                zIndex: "0", // 이미지가 순위 글씨보다 뒤에 있도록 함
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Link>
          <p style={{ fontSize: "1.2rem", marginTop: "5px" }}>{item.title}</p>
          <p style={{ fontSize: "1rem", color: "#777", marginTop: "5px" }}>
            {item.count}번 평가됨
          </p>
        </div>
      ))}
    </div>
  );
};

export default TOPExhibitionItem;
