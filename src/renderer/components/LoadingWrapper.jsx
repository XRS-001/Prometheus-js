import './Loading.css'
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from './Sidebar.jsx'

export default function LoadingWrapper({ children, pathsWithLoading = [] }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathsWithLoading.includes(location.pathname)) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    setLoading(false);
  }, [location.pathname, pathsWithLoading]);

  return loading ? (
    <>
      <div className="app">
        <Sidebar></Sidebar>
        <main className="main">
          <header className="header">
            <h1>Loading...</h1>
          </header>

        </main>
      </div>
    </>
  ) : (
    children
  );
}
