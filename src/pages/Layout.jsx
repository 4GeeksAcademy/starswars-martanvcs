import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useGlobalContext } from "../store.jsx";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
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

