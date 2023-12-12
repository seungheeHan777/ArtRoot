import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";
import SimpleSlider from "./Slider.js";
import DiscountSlider from "./DiscountSlider.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { random } from "../lib/api/exhibition";
//import NavBarElement from "../components/common/NavBarElement.js";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("imageSizes:", imageSizes);
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
    { width: 365, height: 290 },
    { width: 365, height: 480 },
    { width: 365, height: 330 },
    { width: 365, height: 530 },
    { width: 365, height: 340 },
    { width: 365, height: 490 },
  ];

  return (
    <main>
      <section>
        <div
          style={{
            paddingTop: "250px",
            minHeight: "70vh",
            textAlign: "center",
          }}
        >
          <img
            src="images/18948.jpg"
            alt="18948.jpg"
            style={{ width: "75vw", height: "500px" }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "50px",
            fontWeight: "bold",
          }}
        >
          ART Root가 추천하는 특별한 전시들
        </div>
        <div className="bsSlidViv">
          <div className="slider">
            <SimpleSlider />
          </div>
        </div>
      </section>

      <div>
        <DiscountSlider />
      </div>
      <section className="collectionsBlock pt-6 pt-md-11 pt-lg-16 pt-xl-21 pb-6 pb-md-10 pb-lg-14 pb-xl-20">
        <div className="container">
          <header className="topHeadingHead text-center mb-7 mb-lg-11">
            <strong
              className="tpHeadingTitle text-uppercase font-weight-normal d-block mb-2 mb-md-5"
              style={{ paddingTop: "50px" }}
            >
              KEYWORD & RECOMMEND
            </strong>
            <h1 style={{ paddingBottom: "85px", fontSize: "60px" }}>
              추천 전시
            </h1>
          </header>

          <div className="row makeItMasonery">
            {data.map((exhibition, index) => (
              <div className="mimItem col-12 col-sm-6 col-md-4" key={index}>
                <article className="collectionColumn mb-6 mb-lg-11">
                  <div className="imgHolder mb-4">
                    <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                      <img
                        src={exhibition.ART_PICTURE}
                        className="img-fluid w-100 d-block"
                        alt={`exhibition-${index}`}
                        width={imageSizes[index].width}
                        height={imageSizes[index].height}
                        style={{ objectFit: "cover", maxHeight: "none" }}
                      />
                    </Link>
                  </div>
                  <h2 className="mb-1">
                    <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                      {exhibition.ART_NAME}
                    </Link>
                  </h2>
                  <h3 className="text-gray777 fontBase">
                    {exhibition.ART_ARTIST}
                  </h3>
                  <div className="product_mon">{` ${exhibition.ART_PRICE}`}</div>
                </article>
              </div>
            ))}
          </div>

          <footer className="btnWrap text-center">
            <a
              href="single-works.html"
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
