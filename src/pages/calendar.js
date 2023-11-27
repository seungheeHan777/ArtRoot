import React, { useState, useEffect } from "react";
import { myone } from "../lib/api/auth";
import Form from "react-bootstrap/Form";

const MyCalendar = () => {
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

  const generateCalendarGrid = () => {
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
    grid.push(
      <div
        key="month-year"
        style={{ marginBottom: "50px", textAlign: "center", fontSize: "50px" }}
      >
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </div>
    );

    grid.unshift(
      <div
        key="month-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        <button onClick={handlePrevMonth}>&lt; 이전 달</button>
        <button onClick={handleNextMonth}>다음 달 &gt;</button>
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
            gap: "50px",
            marginBottom: "50px",
          }}
        >
          <div onClick={() => handleDateChange(currentDate)}>
            {day} {/* Display the day */}
          </div>
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Event"
                width="40px"
                height="40px"
              />
            ))
          ) : (
            <div style={{ width: "50px", height: "50px" }}>
              {/* Placeholder for empty image */}
            </div>
          )}
          {overlapCount > 0 && (
            <div style={{ marginTop: "5px" }}>{overlapCount} overlapped</div>
          )}
        </div>
      );
    }

    // 현재 달의 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const [representativeImage, overlappingCount] =
        getImageForDate(currentDate);

      currentWeek.push(
        <div
          key={currentDate.toDateString()}
          style={{
            display: "grid",
            gap: "8px",
            position: "relative", // Set position to relative for overlapping count
          }}
        >
          <div onClick={() => handleDateChange(currentDate)}>
            {day} {/* Display the day */}
          </div>
          {Array.isArray(representativeImage) &&
          representativeImage.length > 0 ? (
            <>
              {representativeImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Event"
                  width="100"
                  height="100"
                  onClick={() => handleImageClick(currentDate)}
                  style={{ cursor: "pointer" }} // Add cursor style for clickable images
                />
              ))}
              {overlappingCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px", // Adjust the position as needed
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                  onClick={() => handleImageClick(currentDate)}
                >
                  +{overlappingCount}
                </div>
              )}
            </>
          ) : (
            <div style={{ width: "50px", height: "50px" }}>
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
              gap: "70px",
              marginBottom: "100px",
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

    // 여기에서 이미지 클릭 시 모든 이미지를 보여주는 방법을 구현하면 됩니다.
    // 예를 들어, 모달 창이나 화면의 다른 부분에 이미지를 렌더링하는 등의 방식을 선택할 수 있습니다.
    // 아래는 간단한 모달 창을 이용한 예시입니다. (모달 관련 라이브러리를 사용하거나 직접 모달을 만들어야 할 수 있습니다.)

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
        height: "80%",
        width: "75%",
        paddingTop: "250px", // Adjusted paddingTop
        paddingBottom: "50px",
        marginLeft: "150px",
        marginRight: "100px",
      }}
    >
      <div
        style={{
          flex: 1,
          border: "1px solid black",
          paddingLeft: "50px",
          paddingRight: "50px",
          marginRight: "100px",
        }}
      >
        {generateCalendarGrid()}
      </div>
      <div>
        <div style={{ marginBottom: "20px" }}>내가 본 전시</div>
        <div>
          {oneInfo.map((one, index) => (
            <div key={index}>
              <Form.Group controlId={`comment-${index}`}>
                <img
                  src={one.picture ? one.picture : ""}
                  alt="Profile Picture"
                  width="75" // Adjusted image width
                  height="75" // Adjusted image height
                  style={{ marginBottom: "10px" }} // Added margin to separate images
                />
                <br />
                <br />
              </Form.Group>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
