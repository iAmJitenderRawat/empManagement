import React from "react";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
