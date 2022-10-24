import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "./components/common/BottomNavBar.jsx";
import { LogoHeader } from "./components/common/Header.jsx";
import { Challenge } from "./pages/challenge/Challenge.jsx";
import { Crew } from "./pages/crew/Crew.jsx";
// import { Footer, LogoHeader, NavBar } from "./components/Common.jsx";
import { Main } from "./pages/Main.jsx";
import { PloggingStart } from "./pages/plogging/PloggingStart.jsx";
import { Rank } from "./pages/ranking/Rank.jsx";
import { motion } from "framer-motion";
import PloggingImg from "./assets/images/plogging.png";
import { Plogging } from "./pages/plogging/Plogging.jsx";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="rootRoute">
      <LogoHeader />
      <Outlet />
      <motion.div
        style={{
          justifyContent: "end",
          alignItems: "center",
          position: "absolute",
          bottom: "0",
          left: "50%",
          marginLeft: "-27.5px" /* width의 50% */,
          zIndex: 1000,
        }}
        whileTap={{ scale: 1.2 }}
        onClick={() => {
          navigate("/plogging/start");
        }}
      >
        <img src={PloggingImg} width="55px" height="55px" style={{}} />
      </motion.div>
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
        <Route index element={<PloggingStart />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/challenge/list" element={<Challenge />} />
        <Route path="/plogging/start" element={<PloggingStart />} />
      </Route>
      {/* 로고 */}
      <Route path="/" element={<LayoutFullScreen />}>
        <Route path="/plogging" element={<Plogging />} />
      </Route>
    </Routes>
  );
};
