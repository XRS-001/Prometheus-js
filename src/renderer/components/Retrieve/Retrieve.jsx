import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Retrieve.css'
import './ImageInfo.css'
import Sidebar from '../Sidebar.jsx'
import { TextElement, RadioElement } from '../FormElements.jsx'
import ImageDropzone from '../ImageDropzone.jsx'
import { useContext } from "react";
import { RetrieveContext } from "../App.jsx";

export function Retrieve() {
  var { image, setImage } = useContext(RetrieveContext);
  var navigate = useNavigate();
  return (
    <div className="retrieve">
      <Sidebar active="retrieve"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Retrieve RAW data from network</h1>
          <ImageDropzone whenDropped={() => navigate("found")} setImage={setImage}/>
        </header>
      </main>
    </div>
  )
}

export function Found() {
  var { image, setImage } = useContext(RetrieveContext);
  return (
    <div className="retrieve">
      <Sidebar active="retrieve"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Image located in network!</h1>
          <div className="infoWrapper">
            <ImageInfo />
            <img src={image} alt="Uploaded Preview" className="infoImage" />
          </div>
        </header>
      </main>
    </div>
  )
}

export default function ImageInfo() {
  return (<section className="imageInfo">
    <h2>Image Overview</h2>
    <div className="infoGrid">
      <div className="infoCard">
        <h3>JPEG SHA-256 Hash Identifier</h3>
        <p>0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</p>
      </div>
      <div className="infoCard">
        <h3>Swarm Content Identifier</h3>
        <p>0x2477cc8584cc61091b5cc084cdcdb45bf3c6210c263b0143f030cf7d750e894d</p>
      </div>
      <div className="infoCard">
        <h3>Date Published To Notary</h3>
        <p>16:34, 13th Dec 2025</p>
      </div>
      <div className="infoCard">
        <h3>Authenticity Rating (Oracle Layer)</h3>
        <p>98.47%</p>
      </div>
      <div className="infoCard">
        <h3>Authenticity Rating (Authenticated Locally)</h3>
        <p>99.81%</p>
      </div>
      <div className="infoCard">
        <h3>Voting Liquidity (Ether)</h3>
        <p>Ξ13.235</p>
      </div>
    </div>
  </section>)
}
