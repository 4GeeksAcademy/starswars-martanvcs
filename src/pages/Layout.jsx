import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";

const Layout = () => {
  const { actions } = useGlobalContext();

  useEffect(() => {
    actions.loadData();
  }, []);

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


