import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div style={{ padding: "500px" }}>
      <Spinner
        animation="border"
        variant="info"
        style={{ width: "20rem", height: "20rem", borderWidth: "1em" }}
      />
    </div>
  );
};

export default Loading;
