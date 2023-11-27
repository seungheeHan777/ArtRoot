import React, { useState } from "react";
import styled from "styled-components";
import { NavDropdown, Form, Button } from "react-bootstrap";
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
              <div className="row">
                <div className="col-4 col-sm-3 col-lg-2">
                  {/* logo */}
                  <div className="logo mt-1">
                    <a href="/">
                      <img
                        src="images/artroot_logo.png"
                        className="img-fluid"
                        alt="Muzze || Art & History Museum"
                        style={{ width: "150px", height: "auto" }}
                      />
                    </a>
                  </div>
                </div>

                <div className="col-8 col-sm-9 col-lg-10 d-flex align-items-end justify-content-end">
                  {/* btn */}
                  {user ? (
                    <NavDropdown
                      title={user.username}
                      id="nav-dropdown-user"
                      className="text-capitalize bdr2 mt-2 hdBtn"
                      style={{ fontSize: "20px" }}
                    >
                      <NavDropdown.Item onClick={handleLogout}>
                        로그아웃
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/MyPage">
                        마이페이지
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title="로그인"
                      id="nav-dropdown"
                      className="text-capitalize bdr2 mt-2 hdBtn"
                      style={{ fontSize: "20px" }}
                    >
                      <NavDropdown.Item href="/Login">로그인</NavDropdown.Item>
                      <NavDropdown.Item href="/Register">
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
                            href="/"
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
                                  href="/ExhibitionList"
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
                                  href="/RecommendedExhibition"
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
                                  href="/DiscountExhibition"
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
                            href="/RatingList"
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
                            href="/Recommend"
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
                            href="/Question"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: "30px" }}
                          >
                            문의사항
                          </a>
                        </li>
                        {user && user.username === "admin" ? (
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link"
                              href="/AdminMain"
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
                                    href="/AdminPage"
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
                                    href="/AdminExhibitionList"
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
                                    href="/AdminRatingList"
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
                                    href="/AdminRecommend"
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    전시회 추천 관리
                                  </a>
                                  {/* mnDropList */}
                                </li>
                                {/* 11/27 추가 */}
                                <li className="hasDropdown">
                                  <a
                                    href="/ExhibitionKeyword"
                                    style={{
                                      fontSize: "20px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    전시회 키워드 관리
                                  </a>
                                  {/* mnDropList */}
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
