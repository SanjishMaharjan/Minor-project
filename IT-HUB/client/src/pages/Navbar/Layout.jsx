import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import "./Layout.scss";

const Layout = () => {
  const { data: count } = useQuery(["notificationCount"], {
    enabled: false,
  });
  return (
    <>
      <Navbar count={count} />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
