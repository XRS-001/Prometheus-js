import React from 'react'
import { useNavigate } from "react-router-dom";
import './Sidebar.css'
import FireLogo from '../assets/Fire.png'

export default function Sidebar({ active }) {
  var navigate = useNavigate();
  return (<aside className="sidebar">
    <h2>Prometheus</h2>
    <img src={FireLogo} width={60} className="sidebarLogo"/>
    <nav>
      <a className={active === "home" ? "active" : ""} onClick={(e) => {
        e.preventDefault();
        navigate("/");}}>Home</a>
      <a className={active === "upload" ? "active" : ""} onClick={(e) => {
        e.preventDefault();
        navigate("/upload");}}>Upload Image</a>
      <a className={active === "retrieve" ? "active" : ""} onClick={(e) => {
        e.preventDefault();
        navigate("/retrieve");}}>Retrieve RAW data</a>
      <a className={active === "settings" ? "active" : ""} onClick={(e) => {
        e.preventDefault();
        navigate("/settings");}}>Settings</a>
    </nav>
  </aside>)
}
