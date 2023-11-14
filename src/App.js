import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ExhibitionList from "./pages/ExhibitionList";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Rating from "./pages/Rating";
import SignUpComplete from "./pages/SignUpComplete";
import Welcome from "./pages/Welcome";
import NavContainer from "./containers/common/NavContainer";
import FindID from "./pages/FindID";
import FindPW from "./pages/FindPW";
import ChangePW from "./pages/ChangePW";
import AdminPage from "./pages/admin/AdminPage";
import AdminMain from "./pages/admin/AdminMain";
import AdminExhibitionList from "./pages/admin/AdminExhibitionList";
import ExhibitionAdd from "./pages/admin/ExhibitionAdd";
import AdminExhibitiondetail from "./pages/admin/AdminExhibitiondetail";
import Exhibitiondetail from "./pages/Exhibitiondetail"; //각 전시회의 정보가 있는 곳
import Goodbye from "./pages/Goodbye";
import ExhibitionSearchList from "./pages/ExhibitionSearchList";
import RatingList from "./pages/RatingList";
import RecommendedExhibition from "./pages/RecommendedExhibition";
import Question from "./pages/Question";
import AdminRatingList from "./pages/admin/AdminRatingList";
import Calendar from "./pages/calendar";
import Recommend from "./pages/Recommend";
import AdminRecommend from "./pages/admin/AdminRecommend";
import DiscountExhibition from "./pages/DiscountExhibition";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 클라이언트 측에서 세션을 확인
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      {/* 세션 관리를 위해 Home과 LogIn은 따로 빼져 있음 주의!! */}
      <NavContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/*  ?? */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/LogIn"
          element={
            <LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/ExhibitionList" element={<ExhibitionList />} />
        <Route
          path="/RecommendedExhibition"
          element={<RecommendedExhibition />}
        />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Recommend" element={<Recommend />} />
        <Route path="/Rating/:id" element={<Rating />} />
        <Route path="/RatingList" element={<RatingList />} />
        <Route path="/SignUpComplete" element={<SignUpComplete />} />
        <Route
          path="/Welcome"
          element={
            <Welcome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/FindID" element={<FindID />} />
        <Route path="/FindPW" element={<FindPW />} />
        <Route path="/ChangePW" element={<ChangePW />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminMain" element={<AdminMain />} />
        <Route path="/AdminRatingList" element={<AdminRatingList />} />
        <Route path="/AdminExhibitionList" element={<AdminExhibitionList />} />
        <Route path="/AdminRecommend" element={<AdminRecommend />} />
        <Route
          path="/AdminExhibitiondetail/:id"
          element={<AdminExhibitiondetail />}
        />
        <Route path="/ExhibitionAdd" element={<ExhibitionAdd />} />
        <Route path="/Exhibitiondetail/:id" element={<Exhibitiondetail />} />
        <Route path="/DiscountExhibition" element={<DiscountExhibition />} />
        <Route path="/Goodbye" element={<Goodbye />} />
        <Route
          path="/ExhibitionSearchList"
          element={<ExhibitionSearchList />}
        />
        <Route path="/Question" element={<Question />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>

      <footer>
        <div>
          Copyright @artroot
          <br />
          <Link to="/Question">문의사항</Link>
        </div>
      </footer>
    </Router>
  );
}

export default App;
