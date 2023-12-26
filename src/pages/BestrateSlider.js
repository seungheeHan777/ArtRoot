import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { allRating } from "../lib/api/exhibition";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BestrateSlider({ totalStars = 5 }) {
  const createArray = (length) => [...Array(length)];
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
        const response = await allRating();

        setSliderInitialized(true);
        let sortedData = [];
        sortedData = response.data.sort((a, b) => b.ONE_STARS - a.ONE_STARS);
        setData(sortedData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "#872323" : "gray"} />
  );

  const renderStars = (stars) => {
    return createArray(totalStars).map((n, i) => (
      <Star key={i} selected={i < stars} />
    ));
  };

  return (
    <div
      className="slidediv"
      style={{
        position: "relative",
        marginTop: "auto",
        width: "85%",
      }}
    >
      <h2 className="slider-text">코멘트</h2>
      {sliderInitialized && (
        <Slider {...settings}>
          {data.slice(0, 7).map((item, index) => (
            <div key={index}>
              <article className="rating_list_box">
                <div className="imgHolder">
                  <a href={`exhibitiondetail/${item.ONE_ARTNUM}`}>
                    <img
                      src={item.ONE_PICTURE}
                      className="img-fluid"
                      alt="전시 그림"
                    />
                  </a>
                </div>
                <div>
                  <time dateTime={item.ONE_DATE} className="rate_user_date">
                    <span>{item.ONE_USER}</span>
                    <span>{item.ONE_DATE}</span>
                  </time>
                  <hr className="rate_line" />
                  <p className="rate_comment">{item.ONE_COMMENT}</p>
                  <div className="rate_star">{renderStars(item.ONE_STARS)}</div>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
