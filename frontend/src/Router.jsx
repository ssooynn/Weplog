import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Footer, LogoHeader, NavBar } from "./components/Common.jsx";
import { Main } from "./pages/Main.jsx";

const Layout = () => {
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
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};
