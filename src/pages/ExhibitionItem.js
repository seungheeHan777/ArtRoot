import { Link } from "react-router-dom";
import React from "react";
import "./ExhibitionItem.css";

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
    <div className="ExhibitionItem">
      <Link to={`/exhibitiondetail/${ART_NUM}`}>
        <img
          src={ART_PICTURE}
          className="img-fluid w-100 d-block"
          alt="image description"
        />
      </Link>
      <div>
        <time dateTime="2011-01-12" className="d-block cecTime text-gray777">
          <p className="exhibition_date">
            {ART_START} ~ {ART_END}
          </p>
        </time>
        <p className="exhibition_place">{ART_PLACE}</p>
        <a className="exhibition_name">{ART_NAME}</a>
        <p className="exhibition_price">{ART_PRICE}</p>
      </div>
    </div>
  );
};
export default ExhibitionItem;
