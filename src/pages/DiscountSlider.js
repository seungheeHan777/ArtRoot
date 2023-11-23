import React, { useEffect, useState } from "react";

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
    <section className="currentExibitionBlock hasBdr pt-6 pt-md-9 pt-lg-14 pt-xl-20 pb-6 pb-lg-10 pb-xl-16">
      <div className="container">
        <header className="teeSideHead mb-6 mb-lg-11 text-center text-right">
          <h1
            className="text-capitalize mb-0"
            style={{ paddingBottom: "100px", fontSize: "60px" }}
          >
            할인 전시
          </h1>
        </header>
        {sliderInitialized && (
          <div className="row" style={{ width: "100%" }}>
            {data.slice(0, 3).map((exhibition, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4">
                <div className="currExibitColumn mb-6 mx-auto">
                  <div className="imgHolder mb-3 mb-lg-6">
                    <Link to={`/exhibitiondetail/${exhibition.ART_NUM}`}>
                      <img
                        src={exhibition.ART_PICTURE}
                        alt={`img-${index}`}
                        style={{ width: "365px", height: "350px" }}
                        className="img-fluid w-100 d-block"
                      />
                    </Link>
                  </div>

                  <h2
                    className="catagoryTitle d-block font-weight-normal text-uppercase mb-4"
                    style={{ fontSize: "25px" }}
                  >
                    {exhibition.ART_NAME}
                  </h2>
                  <h3 className="mb-3">{exhibition.ART_PRICE}</h3>
                  <time className="d-block cecTime text-gray777">
                    {exhibition.ART_ARTIST}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ paddingBottom: "20px" }}></div>
        <footer class="btnWrap text-center">
          <a
            href="/RecommendedExhibition"
            class="btn btnGre5 btnGre5Outline bdr2 btnLgMinWidth"
          >
            할인 전시 더보기
          </a>
        </footer>
        <hr />
      </div>
    </section>
  );
}
