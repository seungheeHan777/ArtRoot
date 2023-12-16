import React, { useState, useEffect } from "react";
import { myone } from "../lib/api/auth";
import Form from "react-bootstrap/Form";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [oneInfo, setOneInfo] = useState([]);

  useEffect(() => {
    const fetchOneInfo = async () => {
      try {
        const response = await myone();

        if (response.status === 200) {
          const one = response.data;
          setOneInfo(one);
          console.log(one);
        } else {
          console.error("한줄평 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchOneInfo();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getImageForDate = (currentDate) => {
    const dateStr = formatDate(currentDate);
    const imageInfo = oneInfo.filter((info) => info.date === dateStr);
    const images = imageInfo.map((info) => info.picture);

    return [images.length > 0 ? [images[0]] : [], images.length - 1];
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const generateCalendarGrid = () => {
    const today = new Date(); // 현재 날짜 가져오기
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const daysInPreviousMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const grid = [];

    // 추가된 부분: 현재 월과 년도를 보여주는 부분

    grid.unshift(
      <div
        key="month-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // 수직 가운데 정렬 추가
          marginBottom: "10px", // 간격 조절
          marginTop: "10px", // 간격 조절
        }}
      >
        <button
          onClick={handlePrevMonth}
          style={{
            fontSize: "20px", // 버튼 크기 조절
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          &lt;
        </button>

        <div
          key="month-year"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            paddingtop: "10px",
            fontSize: "20px", // 폰트 크기 조절
            fontWeight: "bold", // 폰트 굵기 추가
          }}
        >
          {date.getFullYear()}
          {"년  "}
          {date.toLocaleString("default", { month: "long" })}
        </div>

        <button
          onClick={handleNextMonth}
          style={{
            fontSize: "20px", // 버튼 크기 조절
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          &gt;
        </button>
      </div>
    );

    let currentWeek = [];

    // 이전 달의 마지막 주
    for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i;
      const currentDate = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        day
      );
      const [images, overlapCount] = getImageForDate(currentDate);

      currentWeek.push(
        <div
          key={currentDate.toDateString()}
          style={{
            display: "grid",
            gap: "4px", // 간격 조절
            marginBottom: "10px", // 간격 조절
            position: "relative", // Adjusted position for overlapping count
            border:
              today.toDateString() === currentDate.toDateString()
                ? "2px solid red"
                : "none", // Check if it's today's date
            borderRadius: "50%", // Make it circular
            width: "30px", // 간격 및 크기 조절
            height: "30px", // 간격 및 크기 조절
          }}
        >
          <div
            onClick={() => handleDateChange(currentDate)}
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {day} {/* Display the day */}
          </div>
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Event"
                width="30px" // 크기 조절
                height="30px" // 크기 조절
                onClick={() => handleImageClick(currentDate)}
                style={{ cursor: "pointer" }}
              />
            ))
          ) : (
            <div style={{ width: "30px", height: "30px" }}>
              {/* Placeholder for empty image */}
            </div>
          )}
          {overlapCount > 0 && (
            <div style={{ marginTop: "2px" }}>{overlapCount} overlapped</div>
          )}
        </div>
      );
    }

    // 현재 달의 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const [representativeImage, overlappingCount] =
        getImageForDate(currentDate);

      const isCurrentDate = isSameDay(currentDate, new Date());

      currentWeek.push(
        <div
          key={currentDate.toDateString()}
          style={{
            display: "grid",
            gap: "4px", // 간격 조절
            position: "relative", // Set position to relative for overlapping count
            textAlign: "center",
          }}
        >
          <div
            onClick={() => handleDateChange(currentDate)}
            style={{
              position: "relative",
              display: "inline-block",
              cursor: "pointer",
              borderRadius: "50%", // 동그라미 모양을 위해 추가
              width: "30px", // 동그라미 너비
              height: "30px", // 동그라미 높이
              lineHeight: "30px", // 동그라미 내부 텍스트 중앙 정렬
              border: isCurrentDate ? "2px solid red" : "none", // Check if it's today's date
              background: isCurrentDate ? "red" : "transparent",
              margin: "auto", // 숫자를 동그라미 정 중앙에 위치시키기 위한 추가 스타일
              fontSize: "12px", // 동그라미 내부 텍스트 크기 조절
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: isCurrentDate ? "bold" : "normal",
                color: isCurrentDate ? "white" : "black",
              }}
            >
              {day} {/* Display the day */}
            </span>
          </div>
          {Array.isArray(representativeImage) &&
          representativeImage.length > 0 ? (
            <>
              {representativeImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Event"
                  width="30" // 크기 조절
                  height="30" // 크기 조절
                  onClick={() => handleImageClick(currentDate)}
                  style={{ cursor: "pointer" }} // Add cursor style for clickable images
                />
              ))}
              {overlappingCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-12px", // Adjust the position as needed
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "2px",
                    borderRadius: "3px",
                    fontSize: "10px",
                  }}
                  onClick={() => handleImageClick(currentDate)}
                >
                  +{overlappingCount}
                </div>
              )}
            </>
          ) : (
            <div style={{ width: "30px", height: "30px" }}>
              {/* Placeholder for empty image */}
            </div>
          )}
        </div>
      );

      if (currentWeek.length === 7 || day === daysInMonth) {
        // 한 주가 끝나거나 마지막 날인 경우, 현재 주를 grid에 추가하고 currentWeek 초기화
        grid.push(
          <div
            key={`week-${day}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "12px", // 간격 조절
              marginBottom: "20px",
            }}
          >
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    }

    return grid;
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const handleImageClick = (currentDate) => {
    const dateStr = formatDate(currentDate);
    const imagesForDate = oneInfo.filter((info) => info.date === dateStr);

    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fff";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    modalContent.style.overflowY = "auto";

    imagesForDate.forEach((info) => {
      const imageElement = document.createElement("img");
      imageElement.src = info.picture;
      imageElement.alt = "Event";
      imageElement.width = "200";
      imageElement.height = "200";
      imageElement.style.marginRight = "10px";

      modalContent.appendChild(imageElement);
    });

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.addEventListener("click", () => {
      modal.remove();
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        paddingTop: "20px", // Adjusted paddingTop
        paddingBottom: "50px",
        marginLeft: "50px", // 조정
        marginRight: "50px", // 조정
      }}
    >
      <div
        style={{
          flex: 1,
          border: "1px solid black",
          paddingLeft: "10px", // 조정
          paddingRight: "10px", // 조정
        }}
      >
        {generateCalendarGrid()}
      </div>
    </div>
  );
}
