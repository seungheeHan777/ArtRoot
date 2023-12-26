import React, { useState, useEffect } from "react";

import { Button, Navbar, Nav, Table } from "react-bootstrap";
import AdminPage from "./AdminPage.js";
import AdminExhibitionList from "./AdminExhibitionList.js";
import AdminRatingList from "./AdminRatingList.js";
import AdminRecommend from "./AdminRecommend";

const AdminMain = () => {
  const [showAdminPageForm, setShowAdminPageForm] = useState(false);
  const [showAdminExhibitionListForm, setShowAdminExhibitionListForm] =
    useState(false);
  const [showAdminRatingListForm, setShowAdminRatingListForm] = useState(false);
  const [showAdminAdminRecommendForm, setShowAdminAdminRecommendForm] =
    useState(false);

  const toggleVisibility = (target) => {
    setShowAdminPageForm(false);
    setShowAdminExhibitionListForm(false);
    setShowAdminRatingListForm(false);
    setShowAdminAdminRecommendForm(false);

    switch (target) {
      case "AdminPage":
        setShowAdminPageForm(true);
        break;
      case "AdminExhibitionList":
        setShowAdminExhibitionListForm(true);
        break;
      case "AdminRatingList":
        setShowAdminRatingListForm(true);
        break;
      case "AdminRecommend":
        setShowAdminAdminRecommendForm(true);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="my-page-container"
      style={{ border: "1px solid #c06a5c", display: "flex", width: "85%" }}
    >
      <Navbar
        bg="light"
        expand="sm"
        style={{
          textAlign: "left",
          flexDirection: "column", // Align Navbar items in a column
          width: "350px", // Adjust the width of the Navbar as needed
          height: "600px",
          marginRight: "50px",
          backgroundColor: "#DC7878",
          color: "#fff",
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto flex-column">
            <Nav.Link
              onClick={() => toggleVisibility("AdminPage")}
              style={{ color: "#DB908A", fontSize: "30px" }}
            >
              유저 관리
            </Nav.Link>
            <Nav.Link
              onClick={() => toggleVisibility("AdminExhibitionList")}
              style={{ color: "#DB908A", fontSize: "30px" }}
            >
              전시회 관리
            </Nav.Link>
            <Nav.Link
              onClick={() => toggleVisibility("AdminRatingList")}
              style={{ color: "#DB908A", fontSize: "30px" }}
            >
              한줄평 관리
            </Nav.Link>
            <Nav.Link
              onClick={() => toggleVisibility("AdminRecommend")}
              style={{ color: "#DB908A", fontSize: "30px" }}
            >
              전시회 추천 관리
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div
        className="content-container"
        style={{
          paddingTop: "50px",
          width: "100%", // Use the remaining width
        }}
      >
        {showAdminPageForm && (
          <section>
            <AdminPage />
          </section>
        )}
        {showAdminExhibitionListForm && (
          <section>
            <AdminExhibitionList />
          </section>
        )}
        {showAdminRatingListForm && (
          <section>
            <AdminRatingList />
          </section>
        )}
        {showAdminAdminRecommendForm && (
          <section>
            <AdminRecommend />
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminMain;
