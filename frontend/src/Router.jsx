import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/common/BottomNavBar.jsx";
import { LogoHeader } from "./components/common/Header.jsx";
import { ChallengeList } from "./pages/challenge/ChallengeList.jsx";
import { Crew } from "./pages/crew/Crew.jsx";
// import { Footer, LogoHeader, NavBar } from "./components/Common.jsx";
import { useNavigate } from "react-router-dom";
import { Main } from "./pages/Main.jsx";
import { MainExplore } from "./pages/MainExplore.jsx";
import { PloggingStart } from "./pages/plogging/PloggingStart.jsx";
import { Rank } from "./pages/ranking/Rank.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";

import { motion } from "framer-motion";
import { Plogging } from "./pages/plogging/Plogging.jsx";
import { PloggingEnd } from "./pages/plogging/PloggingEnd.jsx";
import { PloggingRegister } from "./pages/plogging/PloggingRegister.jsx";
import { ChallengeDetail } from "./pages/challenge/ChallengeDetail.jsx";
import { ChallengeRegister } from "./pages/challenge/ChallengeRegister.jsx";
import { Mypage } from "./pages/mypage/Mypage.jsx";
import { MypageUser } from "./pages/mypage/MypageUser.jsx";
import { MypageAchievement } from "./pages/mypage/MypageAchievement";

import { CrewDetail } from "./pages/crew/CrewDetail.jsx";
import { DrawingCharacter } from "./pages/plomon/DrawingCharacter.jsx";
import { CrewRegister } from "./pages/crew/CrewRegister.jsx";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { OAuth2RedirectHandler } from "./pages/OAuth2RedirectHandler.js";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="rootRoute">
      <LogoHeader />
      <Outlet />
      <NavBar />
    </div>
  );
};

const LayoutNoNav = () => {
  return (
    <div className="rootRoute">
      <LogoHeader />
      <Outlet />
    </div>
  );
};

const LayoutNoLogo = () => {
  return (
    <div className="rootRoute">
      <Outlet />
      <NavBar />
    </div>
  );
};

const LayoutFullScreen = () => {
  return (
    <div className="rootRoute">
      <Outlet />
    </div>
  );
};

const isLogin = () => {
  console.log(!localStorage.getItem("isLogin"))
  return localStorage.getItem("accessToken");
};

const PrivateRoute = ({ children }) => {
  if (!isLogin) {
    localStorage.setItem("from", "/");
  }
  return !isLogin ? <Navigate to='/login' /> : children;
};

const PublicRoute = ({ children }) => {
  return isLogin ? <Navigate to='/' /> : children;
};

export const Router = () => {
  return (
    <Routes>
      {/* 로고, 내브바 */}
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<MapTest />}></Route> */}
        <Route path="/crew" element={<Crew />} />
        <Route index element={<PloggingStart />} />
        <Route path="/plogging/start" element={<PloggingStart />} />
        <Route
          path="/challenge/detail/:challengeId"
          element={<ChallengeDetail />}
        />
        <Route path="/challenge/register" element={<ChallengeRegister />} />
        <Route path="/crew/detail/:crewId" element={<CrewDetail />} />
        <Route path="/crew/register" element={<CrewRegister />} />
      </Route>
      {/* 로고 */}
      <Route path="/" element={<LayoutFullScreen />}>
        <Route path="/plogging/end" element={<PloggingEnd />} />
        <Route path="/plogging/register" element={<PloggingRegister />} />
        <Route path="/plogging" element={<Plogging />} />
        <Route path="/plomon" element={<DrawingCharacter />} />
      </Route>
      {/* 내브바 */}
      <Route path="/" element={<LayoutNoLogo />}>
        <Route path="/rank" element={<Rank />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mainexplore" element={<MainExplore />} />
        <Route path="/challenge/list" element={<ChallengeList />} />
        <Route index element={<Main />} />
      </Route>
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage/user" element={<MypageUser />} />
      <Route path="/mypage/achievement" element={<MypageAchievement />} />

    </Routes>
  );
};
