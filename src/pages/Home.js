import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";
import SimpleSlider from "./Slider.js";
import DiscountSlider from "./DiscountSlider.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { random } from "../lib/api/exhibition";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await random();
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="slider">
        <SimpleSlider />
      </div>
      <div className="recommand">
        <h2>11월 추천 전시회</h2>
        <div className="product_container">
          {data.map((exhibition, index) => (
            <div className="product" key={index}>
              <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                <div className="product_img_div">
                  <img
                    src={exhibition.ART_PICTURE}
                    className="product_img"
                    alt={`exhibition-${index}`}
                    width="250px"
                    height="250px"
                  />
                </div>
              </Link>
              <h5 className="product_title">{exhibition.ART_NAME}</h5>
              <p className="product_des">{exhibition.ART_EXPLAIN}</p>
              <div className="product_mon">{` ${exhibition.ART_PRICE}￦`}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>할인 전시</h2>
        <div className="slider">
          <DiscountSlider />
        </div>
      </div>
    </div>
  );
};

export default Home;
