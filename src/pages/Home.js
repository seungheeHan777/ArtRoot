import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";
import SimpleSlider from "./Slider.js";
import DiscountSlider from "./DiscountSlider.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TOPExhibitionItem from "./TopExhibitionItem.js";
import ChannelService from "./ChannelService";
import RecommendSlider from "./RecommendSlider";
import BestrateSlider from "./BestrateSlider";
//import NavBarElement from "../components/common/NavBarElement.js";

const Home = () => {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "eae99c68-73b0-42b4-8982-dbcfad5ab9c3",
  });
  const [data, setData] = useState([]);

  return (
    <main>
      <section>
        <div
          style={{
            paddingLeft: "100px",

            textAlign: "left",
            alignContent: "left",
          }}
        >
          <h2
            className="slider-text"
            style={{ paddingLeft: "20px", fontSize: "40px" }}
          >
            인기 전시
          </h2>
          <TOPExhibitionItem />
        </div>
        <hr className="customhr"></hr>

        <div className="slider">
          <SimpleSlider />
        </div>
        <hr className="customhr"></hr>

        <div className="slider" style={{ paddingTop: "50px" }}>
          <DiscountSlider />
        </div>
        <hr className="customhr"></hr>
        <div className="slider" style={{ paddingTop: "50px" }}>
          <RecommendSlider />
        </div>
      </section>
      <hr className="customhr"></hr>
      <div className="slider" style={{ paddingTop: "50px" }}>
        <BestrateSlider />
      </div>

      <section className="collectionsBlock pt-6 pt-md-11 pt-lg-16 pt-xl-21 pb-6 pb-md-10 pb-lg-14 pb-xl-20"></section>
    </main>
  );
};

export default Home;
