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
    return imageInfo.map((info) => info.picture);
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
        style={{ marginBottom: "50px", textAlign: "center" }}
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
          marginBottom: "100px",
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
      const image = getImageForDate(currentDate);

      currentWeek.push(
        <div
          key={currentDate.toDateString()}
          style={{ display: "grid", gap: "50px" }}
        >
          <div onClick={() => handleDateChange(currentDate)}>{day}</div>
          {image &&
            image.map((image, index) => (
              <img key={index} src={image} alt="Event" width="20" height="20" />
            ))}
        </div>
      );
    }

    // 현재 달의 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);

      const image = getImageForDate(currentDate);

      currentWeek.push(
        <div
          key={currentDate.toDateString()}
          style={{ display: "grid", gap: "8px" }}
        >
          <div onClick={() => handleDateChange(currentDate)}>{day}</div>
          {image &&
            image.map((image, index) => (
              <img key={index} src={image} alt="Event" width="50" height="50" />
            ))}
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
              gap: "100px", // 날짜 사이의 간격
              marginBottom: "100px", // 각 주 사이의 간격
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1, marginRight: "20px" }}>
        {generateCalendarGrid()}
      </div>
      <div style={{ flex: 1 }}>
        <div>내가 본 전시</div>
        <div>
          {oneInfo.map((one, index) => (
            <div key={index}>
              <Form.Group controlId={`comment-${index}`}>
                <img
                  src={one.picture ? one.picture : ""}
                  alt="Profile Picture"
                  width="100"
                  height="100"
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
