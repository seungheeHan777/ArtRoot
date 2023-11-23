import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";
import SimpleSlider from "./Slider.js";
import DiscountSlider from "./DiscountSlider.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { random } from "../lib/api/exhibition";
import NavBarElement from "../components/common/NavBarElement.js";

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

  const imageSizes = [
    { width: 200, height: 130 },
    { width: 365, height: 190 },
    { width: 365, height: 380 },
    { width: 365, height: 430 },
    { width: 365, height: 390 },
    { width: 365, height: 240 },
  ];

  return (
    <main>
      <section>
        <div style={{ paddingTop: "200px", minHeight: "100vh" }}>
          <img
            src="images/18948.jpg"
            alt="galleryman.jpg"
            style={{ width: "100%", height: "700px" }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "50px",
            fontWeight: "bold",
          }}
        >
          ART Root가 추천하는 특별한 전시들
        </div>
        <div class="bsSlidViv">
          <div className="slider">
            <SimpleSlider />
          </div>
        </div>
      </section>
      <div>
        <DiscountSlider />
      </div>

      <section class="collectionsBlock pt-6 pt-md-11 pt-lg-16 pt-xl-21 pb-6 pb-md-10 pb-lg-14 pb-xl-20">
        <div class="container" style={{ paddingTop: "100px" }}>
          <header class="topHeadingHead text-center mb-7 mb-lg-11">
            <strong class="tpHeadingTitle text-uppercase font-weight-normal d-block mb-2 mb-md-5">
              KeyWord &amp; Recommend
            </strong>
            <h1 style={{ paddingBottom: "50px" }}>추천 전시</h1>
          </header>

          <div className="product_container">
            {data.map((exhibition, index) => (
              <div className="product" key={index}>
                <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                  <div className="product_img_div">
                    <img
                      src={exhibition.ART_PICTURE}
                      className="product_img"
                      alt={`exhibition-${index}`}
                      width={imageSizes[index].width}
                      height={imageSizes[index].height}
                    />
                  </div>
                </Link>
                <h5 className="product_title">{exhibition.ART_NAME}</h5>
                <p className="product_des">{exhibition.ART_EXPLAIN}</p>
                <div className="product_mon">{` ${exhibition.ART_PRICE}￦`}</div>
              </div>
            ))}
          </div>
          <footer class="btnWrap text-center">
            <a
              href="/RecommendedExhibition"
              class="btn btnGre5 btnGre5Outline bdr2 btnLgMinWidth"
            >
              Explore All Collections
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default Home;
