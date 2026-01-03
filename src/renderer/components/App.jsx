import { Routes, Route } from "react-router-dom"
import React from 'react'
import Home from './Home/Home.jsx'
import Settings from './Settings/Settings.jsx'
import Retrieve from './Retrieve/Retrieve.jsx'
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Home />} />
      <Route path="/retrieve" element={<Retrieve />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>)
}

export default App;
