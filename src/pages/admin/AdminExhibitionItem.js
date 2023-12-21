import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const StyledExhibitionItem = styled.div`
  .exhibitionContainer {
    width: 70%;
    margin: 0 280px;
  }

  .exhibitionRow {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    justify-content: center;
  }

  .customColumn {
    flex: 0 0 calc(25% - 15px);
    margin: 0 auto 10px auto;
    width: calc(25% - 15px);
  }

  .currExibitColumn {
    text-align: center;
    margin-bottom: 20px;

    .imgHolder {
      max-width: 123px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }
    }

    h2,
    .h2 {
      font-size: 14px;
      line-height: 1.32;
      text-align: center;
      a {
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: black;
        }
      }
    }
  }
`;

const AdminExhibitionItem = (props) => {
  const { data } = props;

  return (
    <StyledExhibitionItem className="tab-content">
      <div className="exhibitionContainer">
        <div
          className="tab-pane fade show active"
          id="current"
          role="tabpanel"
          aria-labelledby="current-tab"
        >
          <div className="exhibitionRow">
            {data.map((exhibition, index) => (
              <div key={index} className="customColumn">
                <article className="currExibitColumn gridView d-flex mb-6 mb-lg-9 mb-xl-12 mx-auto">
                  <div className="imgHolder flex-shrink-0 mr-4 mr-lg-6 mr-xl-8">
                    <Link to={`/Adminexhibitiondetail/${exhibition.ART_NUM}`}>
                      <img
                        src={exhibition.ART_PICTURE}
                        className="img-fluid"
                        alt="image description"
                      />
                    </Link>
                    <h2 className="mb-1 mb-sm-3">
                      <Link
                        to={`/Adminexhibitiondetail/${exhibition.ART_NUM}`}
                        style={{ textDecoration: "none", color: "#333" }}
                      >
                        {exhibition.ART_NAME}
                      </Link>
                    </h2>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledExhibitionItem>
  );
};

export default AdminExhibitionItem;
