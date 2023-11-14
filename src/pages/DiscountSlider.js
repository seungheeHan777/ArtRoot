import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { discount } from "../lib/api/exhibition.js";
import { Link } from "react-router-dom";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//https://blog.naver.com/PostView.naver?blogId=jaeeun_98&logNo=222835174514  참고한 사이트

export default function DiscountSlider() {
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "50px",
    autoplay: true,
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    setSliderInitialized(true);

    const fetchData = async () => {
      try {
        const response = await discount(); // 데이터베이스에서 전시회 정보를 가져오는 엔드포인트로 변경해야 합니다.

        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="slidediv">
      {sliderInitialized && (
        <Slider {...settings}>
          {data.slice(0, 4).map((exhibition, index) => (
            <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`} key={index}>
              <div>
                <img
                  src={exhibition.ART_PICTURE}
                  alt={`img-${index}`}
                  width="350px"
                  height="350px"
                />
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
}
