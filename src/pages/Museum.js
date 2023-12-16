import React, { useState } from "react";
import NaverMap from "../components/common/NaverMap"; // NaverMap 컴포넌트 import
import AddressMuseum from "./AddressMuseum";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Museum = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const latitude = 37.52385131569311;
  const longitude = 126.9801945332582;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      {/* 나머지 내용은 그대로 유지 */}
      이름 : 국립중앙박물관
      <br />
      위치 : 서울 용산구 서빙고로 137 국립중앙박물관
      <br />
      위도는 37.52385131569311, 경도는 126.9801945332582
      <hr />
      <br />
      <hr />
      {/* 나머지 내용은 그대로 유지 */}
      이름 : 예술의 전당 한가람미술관
      <br />
      위치 : 서울 서초구 남부순환로 2406
      <br />
      위도는 37.4803043, 경도는127.0142762
      <div>
        {" "}
        fd <AddressMuseum address="서울 서초구 남부순환로 2406" />
      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* NaverMap 컴포넌트 사용 */}
          <NaverMap latitude={latitude} longitude={longitude} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Museum;
