import React from "react";
import "./home.css";
import SimpleSlider from "./Slider.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  return (
    <div className="home-container">
      <div className="slider">
        <SimpleSlider></SimpleSlider>
      </div>
      <div className="recommand">
        <h2>11월 추천 전시회</h2>
        <div className="product_container">
          <div className="product">
            <div className="product_img_div">
              <img src="/images/cat.jpg" className="product_img" />
            </div>
            <h5 className="product_title"> 상품 제목</h5>
            <p className="product_des"> 상품 내용 요약</p>
            <div className="product_mon"> 월 : 15,000￦</div>
          </div>
          <div className="product">
            <div className="product_img_div">
              <img src="/images/cat.jpg" className="product_img" />
            </div>
            <h5 className="product_title"> 상품 제목</h5>
            <p className="product_des"> 상품 내용 요약</p>
            <div className="product_mon"> 월 : 15,000￦</div>
          </div>
          <div className="product">
            <div className="product_img_div">
              <img src="/images/cat.jpg" className="product_img" />
            </div>
            <h5 className="product_title"> 상품 제목</h5>
            <p className="product_des"> 상품 내용 요약</p>
            <div className="product_mon"> 월 : 15,000￦</div>
          </div>
          <div className="product">
            <div className="product_img_div">
              <img src="/images/cat.jpg" className="product_img" />
            </div>
            <h5 className="product_title"> 상품 제목</h5>
            <p className="product_des"> 상품 내용 요약</p>
            <div className="product_mon"> 월 : 15,000￦</div>
          </div>
        </div>
      </div>

      <div>
        <h2>할인 전시</h2>
        <div className="slider">
          <SimpleSlider></SimpleSlider>
        </div>
      </div>
    </div>
  );
};

export default Home;
