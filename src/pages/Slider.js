import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { allList } from "../lib/api/exhibition.js";
import { Link } from "react-router-dom";
import "./home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//https://blog.naver.com/PostView.naver?blogId=jaeeun_98&logNo=222835174514  참고한 사이트

export default function SimpleSlider() {
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // 중앙 정렬 활성화
    centerPadding: "0%", // 가운데 정렬 후 양쪽으로 추가 여백 없음
    autoplay: true,
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    setSliderInitialized(true);

    const fetchData = async () => {
      try {
        const response = await allList();
        setData(response.data);
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
        zIndex: 1,
        marginTop: "200px",
        width: "90%",
      }}
    >
      {sliderInitialized && (
        <Slider {...settings}>
          {data.slice(0, 7).map((exhibition, index) => (
            <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`} key={index}>
              <div className="slider-slide">
                <img
                  src={exhibition.ART_PICTURE}
                  alt={`img-${index}`}
                  width="630px"
                  height="400px"
                />
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
}
