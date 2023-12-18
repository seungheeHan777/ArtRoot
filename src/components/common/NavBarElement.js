import React, { useState } from "react";
import styled from "styled-components";
import {
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const NavBarElement = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("user");
    navigate("/");
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (searchTerm.trim() !== "") {
      localStorage.setItem("searchTerm", searchTerm);
      navigate(`/ExhibitionSearchList`);
    }
  };
  // 여기서 navigate 사용
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div id="pageWrapper">
      <div className="phStickyWrap phVi w-100">
        {/* pageHeader */}
        <header
          id="pageHeader"
          className="position-absolute w-100 bg-white"
          style={{ zIndex: 1 }}
        >
          {/* hTopHolder */}
          <div className="hTopHolder pt-1 pb-1 pt-lg-2 pb-lg-3">
            <div className="container">
              <div className="row align-items-center">
                {/* Logo (left) */}
                <div className="col-4 col-sm-3 col-lg-2 text-center">
                  <div className="logo mt-1">
                    <a onClick={() => handleNavigate("/")}>
                      <img
                        src="images/artroot_logo.png"
                        className="img-fluid"
                        alt="Muzze || Art & History Museum"
                        style={{ width: "150px", height: "auto" }}
                      />
                    </a>
                  </div>
                </div>

                {/* "ART ROOT" heading (center) */}
                <div className="col-4 col-sm-6 col-lg-8 text-center">
                  <h1 style={{ fontSize: "60px" }}>ART ROOT</h1>
                </div>

                {/* Login button (right) */}
                <div className="col-12 col-sm-3 col-lg-2 d-flex align-items-end justify-content-end mt-2 mt-sm-0">
                  {user ? (
                    <NavDropdown
                      title={`${user.username} 님`}
                      id="nav-dropdown-user"
                      className="text-capitalize bdr2 mt-2 hdBtn"
                      style={{ fontSize: "20px" }}
                    >
                      <NavDropdown.Item onClick={handleLogout}>
                        로그아웃
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleNavigate("/MyPage")}
                      >
                        마이페이지
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleNavigate("/Myaccount")}
                      >
                        내 정보
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title="로그인"
                      id="nav-dropdown"
                      className="text-capitalize bdr2 mt-2 hdBtn"
                      style={{ fontSize: "20px" }}
                    >
                      <NavDropdown.Item
                        onClick={() => handleNavigate("/Login")}
                      >
                        로그인
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleNavigate("/Register")}
                      >
                        회원가입
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="hdHolder headerFixer">
            <div className="container">
              {/* navbar */}
              <nav className="navbar navbar-expand-md navbar-light d-block px-0 pt-0 pb-0 pt-md-2 pb-md-2 pt-lg-3">
                <div className="row">
                  <div className="col-9 position-static">
                    {/* navbar collapse */}
                    <div
                      className="collapse navbar-collapse pageNavigationCollapse"
                      id="pageNavigationCollapse"
                    >
                      {/* mainNavigation */}
                      <ul className="navbar-nav mainNavigation text-capitalize">
                        <li className="nav-item active dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            Home
                          </a>
                          {/* dropdown menu */}
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            href="javascript:void(0);"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            전시
                          </a>
                          {/* dropdown menu */}
                          <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                            {/* mnDropList */}
                            <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                              <li className="hasDropdown">
                                <a
                                  onClick={() =>
                                    handleNavigate("/ExhibitionList")
                                  }
                                  style={{
                                    fontSize: "20px",
                                    textDecoration: "none",
                                  }}
                                >
                                  전시
                                </a>
                                {/* mnDropList */}
                              </li>
                              <li className="hasDropdown">
                                <a
                                  onClick={() =>
                                    handleNavigate("/RecommendedExhibition")
                                  }
                                  style={{
                                    fontSize: "20px",
                                    textDecoration: "none",
                                  }}
                                >
                                  추천 전시
                                </a>
                                {/* mnDropList */}
                              </li>
                              <li className="hasDropdown">
                                <a
                                  onClick={() =>
                                    handleNavigate("/DiscountExhibition")
                                  }
                                  style={{
                                    fontSize: "20px",
                                    textDecoration: "none",
                                  }}
                                >
                                  할인 전시
                                </a>
                                {/* mnDropList */}
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/RatingList")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            평가
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/Recommend")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            취향 추천
                          </a>
                        </li>

                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/Question")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            문의사항
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/museum")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            미술관
                          </a>
                        </li>
                        {user && user.username === "admin" ? (
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link"
                              onClick={() => handleNavigate("/AdminMain")}
                              role="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              style={{ fontSize: "30px" }}
                            >
                              관리자
                            </a>
                            <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                              {/* mnDropList */}
                              <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                <li className="hasDropdown">
                                  <a
                                    onClick={() => handleNavigate("/AdminPage")}
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    유저 관리
                                  </a>
                                  {/* mnDropList */}
                                </li>
                                <li className="hasDropdown">
                                  <a
                                    onClick={() =>
                                      handleNavigate("/AdminExhibitionList")
                                    }
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    전시회 관리
                                  </a>
                                  {/* mnDropList */}
                                </li>
                                <li className="hasDropdown">
                                  <a
                                    onClick={() =>
                                      handleNavigate("/AdminRatingList")
                                    }
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    한줄평 관리
                                  </a>
                                  {/* mnDropList */}
                                </li>
                                <li className="hasDropdown">
                                  <a
                                    onClick={() =>
                                      handleNavigate("/AdminRecommend")
                                    }
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    전시회 추천 관리
                                  </a>
                                  {/* mnDropList */}
                                </li>
                                <li className="hasDropdown">
                                  <a
                                    onClick={() =>
                                      handleNavigate("/ExhibitionKeyword")
                                    }
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    전시회 키워드 관리
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                  <div className="col-3 position-static">
                    <div className="d-flex justify-content-end align-items-center w-100">
                      {/* hdsfcHolder */}
                      <div className="hdsfcHolder w-100 mx-auto py-4 px-3">
                        <div className="input-group">
                          <Form onSubmit={handleSearch} className="w-100">
                            <div className="input-group">
                              <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <div className="input-group-append">
                                <Button
                                  type="submit"
                                  className="btn btn-secondary"
                                >
                                  <i className="icomoon-search">
                                    <span className="sr-only">Search</span>
                                  </i>
                                </Button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
export default NavBarElement;
