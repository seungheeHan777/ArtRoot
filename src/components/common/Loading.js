import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div style={{ padding: "500px" }}>
      <Spinner
        animation="border"
        variant="info"
        style={{ width: "10rem", height: "10rem", borderWidth: "1em" }}
      />
    </div>
  );
};

export default Loading;
