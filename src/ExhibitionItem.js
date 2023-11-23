import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const StyledExhibitionItem = styled.div`
  .currExibitColumn {
    max-width: 290px;

    &.gridView {
      max-width: none;

      h2,
      .h2 {
        font-size: 17px;
        line-height: (22/17);
      }

      .imgHolder {
        max-width: 123px;
      }
    }

    &:hover {
      .imgHolder {
        transform: scale(1.02);
      }
    }

    .imgHolder {
      transition: transform 0.3s ease;
      transform-origin: 50% 50% 0;
      transform: scale(1);
    }

    h2,
    .h2 {
      font-size: 22px;
      line-height: (29/22);

      a {
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: $black;
        }
      }
    }
  }
`;

const ExhibitionItem = (props) => {
  const {
    ART_NUM,
    ART_NAME,
    ART_PICTURE,
    ART_EXPLAIN,
    ART_START,
    ART_END,
    ART_TIME,
    ART_CLOSED,
    ART_PLACE,
    ART_ADDR,
    ART_PRICE,
    ART_CALL,
    ART_SITE,
    ART_ARTIST,
    ART_PREFER,
    ART_BACK,
  } = props;

  return (
    <StyledExhibitionItem className="tab-content">
      <div
        className="tab-pane fade show active"
        id="current"
        role="tabpanel"
        aria-labelledby="current-tab"
      >
        <div className="row">
          <div className="col-12">
            <article className="currExibitColumn gridView d-flex mb-6 mb-lg-9 mb-xl-12 mx-auto">
              <div className="imgHolder flex-shrink-0 mr-4 mr-lg-6 mr-xl-8">
                <Link to={`/exhibitiondetail/${ART_NUM}`}>
                  <img
                    src={ART_PICTURE}
                    className="img-fluid w-100 d-block"
                    alt="image description"
                    style={{ width: "100%", height: "200px" }}
                  />
                </Link>
              </div>
              <div className="descrWrap pt-md-2 pt-lg-5">
                <h2
                  className="mb-1 mb-sm-3"
                  style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                >
                  <a style={{ textDecoration: "none", color: "#333" }}>
                    {ART_NAME}
                  </a>
                </h2>
                <time
                  dateTime="2011-01-12"
                  className="d-block cecTime text-gray777"
                  style={{ fontSize: "1rem" }}
                >
                  <p>
                    전시 기간: {ART_START} - {ART_END}
                  </p>
                </time>
              </div>
            </article>
          </div>
        </div>
      </div>
    </StyledExhibitionItem>
  );
};
export default ExhibitionItem;
