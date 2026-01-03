import React from 'react'
import { useNavigate } from "react-router-dom";
import './MenuCards.css'

export default function MenuCards() {
  var navigate = useNavigate();
  return (<section className="cards">
    <button className="card" id="upload" onClick={(e) => {
      e.preventDefault();
      navigate("/upload");}}>
      <div>
        <h3>Upload Image</h3>
      </div>
    </button>
    <button className="card" id="retrieve" onClick={(e) => {
      e.preventDefault();
      navigate("/retrieve");}}>
      <div>
        <h3>Retrieve Image</h3>
      </div>
    </button>
    <button className="card" id="settings" onClick={(e) => {
      e.preventDefault();
      navigate("/settings");}}>
      <div>
        <h3>Settings</h3>
      </div>
    </button>
  </section>)
}
