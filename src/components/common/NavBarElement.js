import React, { useState } from "react";
import styled from "styled-components";
import "./NavBarElement.css";
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
          <div className="hdHolder headerFixer">
            <div className="nav-container">
              {/* navbar */}
              <nav className="navbar navbar-expand-md navbar-light d-block px-0 pt-0 pb-0 pt-md-2 pb-md-2 pt-lg-3">
                <div className="nav-row">
                  <div className="site-container">
                    <p className="site_name">
                      <span className="highlight">ART</span> ROOT
                    </p>
                  </div>
                  <div className="menu-container">
                    {/* navbar collapse */}
                    <div
                      className="collapse navbar-collapse pageNavigationCollapse"
                      id="pageNavigationCollapse"
                    >
                      {/* mainNavigation */}
                      {/* <img
                        src="images/artroot_logo.png"
                        className="img-fluid"
                        alt="Muzze || Art & History Museum"
                        style={{ width: "50px", height: "50px" }}
                      /> */}
                      <ul className="navbar-nav mainNavigation text-capitalize">
                        <li className="nav-item active dropdown">
                          <a
                            className="nav-link"
                            onClick={() => handleNavigate("/")}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            홈
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
                          >
                            전시
                          </a>
                          {/* dropdown menu */}
                          <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                            {/* mnDropList */}
                            <ul
                              className="list-unstyled mnDropList mb-0 pt-1 pb-1 pb-md-6"
                              style={{ backgroundColor: "#F6F6F6" }}
                            >
                              <li className="hasDropdown">
                                <a
                                  onClick={() =>
                                    handleNavigate("/ExhibitionList")
                                  }
                                  style={{
                                    fontSize: "17px",
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
                                    fontSize: "17px",
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
                                    fontSize: "17px",
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
                          >
                            리뷰
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
                          >
                            AI 취향 분석
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
                          >
                            문의
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
                            >
                              관리자
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>

                  {/* 검색창 */}
                  <div className="search-container">
                    <div>
                      <div>
                        <div>
                          <Form
                            onSubmit={handleSearch}
                            className="search-input"
                          >
                            <div className="input-group">
                              <Form.Control
                                type="text"
                                placeholder="전시명 또는 카테고리를 입력해보세요."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <div className="input-group-append">
                                <button type="submit" className="btn-search">
                                  {/* <i className="icomoon-search">
                                    <span className="sr-only">검색</span>
                                  </i> */}
                                  검색
                                </button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Login button (right) */}
                  <div className="login-container">
                    {user ? (
                      <NavDropdown
                        title={`${user.username} 님`}
                        id="nav-dropdown-user"
                        className="text-capitalize bdr2 mt-2 hdBtn"
                        style={{ fontSize: "17px", fontWeight: "bold" }}
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
                        style={{ fontSize: "17px", fontWeight: "bold" }}
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
              </nav>
            </div>
            <hr className="last_hr" />
          </div>
        </header>
      </div>
    </div>
  );
};
export default NavBarElement;
