import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { random } from "../lib/api/exhibition";
import { Link } from "react-router-dom";
import "./home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DiscountSlider() {
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0%",
    autoplay: true,
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await random();
        setData(response.data);
        setSliderInitialized(true);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="slidediv"
      style={{
        position: "relative",
        marginTop: "auto",
        width: "85%",
      }}
    >
      <h2 className="slider-text">추천 전시</h2>
      {sliderInitialized && (
        <Slider {...settings}>
          {data.slice(0, 7).map((exhibition, index) => (
            <div className="slider-slide" key={index}>
              <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                <img
                  src={exhibition.ART_PICTURE}
                  alt={`img-${index}`}
                  width="300px"
                  height="400px"
                />
              </Link>
              <p style={{ marginTop: "10px" }}>{exhibition.ART_NAME}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
