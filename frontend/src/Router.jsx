import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/common/BottomNavBar.jsx";
import { LogoHeader } from "./components/common/Header.jsx";
import { ChallengeList } from "./pages/challenge/ChallengeList.jsx";
import { Crew } from "./pages/crew/Crew.jsx";
// import { Footer, LogoHeader, NavBar } from "./components/Common.jsx";
import { useNavigate } from "react-router-dom";
import { Main } from "./pages/Main.jsx";
import { PloggingStart } from "./pages/plogging/PloggingStart.jsx";
import { Rank } from "./pages/ranking/Rank.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";

import { motion } from "framer-motion";
import { Plogging } from "./pages/plogging/Plogging.jsx";
import { PloggingEnd } from "./pages/plogging/PloggingEnd.jsx";
// import { PloggingRegister } from "./pages/plogging/PloggingRegister.jsx";
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

export const Router = () => {
  return (
    <Routes>
      {/* 로고, 푸터, 내브바 */}
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<MapTest />}></Route> */}
        <Route path="/crew" element={<Crew />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/plogging/start" element={<PloggingStart />} />
        <Route path="/plogging/end" element={<PloggingEnd />} />
        {/* <Route path="/plogging/register" element={<PloggingRegister />} /> */}
      </Route>
      {/* 로고 */}
      <Route path="/" element={<LayoutFullScreen />}>
        <Route path="/plogging" element={<Plogging />} />
      </Route>
      {/* 내브바 */}
      <Route path="/" element={<LayoutNoLogo />}>
        <Route index element={<Main />} />
        <Route path="/challenge/list" element={<ChallengeList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
