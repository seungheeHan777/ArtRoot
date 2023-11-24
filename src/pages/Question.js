import React, { useState } from "react";
import { qna } from "../lib/api/auth";
import "./Question.css";

const Question = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await qna(formData);

      if (response.status === 200) {
        console.log("폼이 성공적으로 제출되었습니다!");
        // 성공 시 처리
        window.alert("성공적으로 제출되었습니다!");
      } else {
        console.error("폼 제출 실패.");
        // 실패 시 처리
        window.alert("실패했습니다. 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <section className="my-28" id="contact" style={{ paddingTop: "200px" }}>
      <div className="form-container">
        <form
          // className="flex flex-col space-y-3 m-auto w-full"
          name="contact"
          method="post"
        >
          <p className="intro-text">자유롭게 문의하세요</p>
          <input type="hidden" name="form-name" value="contact" />
          <label htmlFor="name">성함</label>
          <input
            type="text"
            name="name"
            id="name"
            className="gradient"
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            className="gradient"
            required
            onChange={handleChange}
          ></input>
          <label htmlFor="message">문의사항</label>
          <textarea
            name="message"
            id="message"
            cols="25"
            rows="5"
            className="gradient"
            onChange={handleChange}
            required
          ></textarea>
          <hr style={{ border: "1px solid silver", width: "100%" }} />
          <p className="personal_info">개인 정보 수집 및 이용안내</p>
          <p className="subtitle">
            ArtRoot는 문의사항 답변을 희망하시는 회원님에 한해 필요최소한의 개인
            정보만 수집합니다.
          </p>
          <p className="detail_info">
            1. 수집 개인정보 항목 : 성함, 이메일 주소[필수]<br></br>
            2.개인정보 수집 이용목적 : 문의하신 고객과 원활한 의사소통<br></br>
            3.개인정보 보유 기간 : 수집한 개인 정보는 문의 시점으로부터 6개월간
            보관한 뒤 파기합니다.
          </p>
          <p className="last_info">
            모든 답변은 작성하신 이메일로 가므로 반드시 정확하게 기입해주세요.
          </p>
          <hr style={{ border: "1px solid silver", width: "100%" }} />
          <button type="submit" onSubmit={handleFormSubmit}>
            확인
          </button>
        </form>
      </div>
      <div
        className="relative md:bottom-56 mr-auto ml-auto md:mr-auto md:ml-0 max-w-xs md:max-w-sm"
        onClick={() => window.scroll(0, 0)}
      ></div>
    </section>
  );
};

export default Question;
