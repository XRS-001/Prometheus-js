import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Upload.css'
import './UploadInfo.css'
import Sidebar from '../Sidebar.jsx'
import { TextElement, RadioElement } from '../FormElements.jsx'
import ImageDropzone from '../ImageDropzone.jsx'
import { useContext } from "react";
import { UploadContext } from "../App.jsx";
import image from "./RAW_example.jpg";

export function Upload() {
  var { image, setImage } = useContext(UploadContext);
  var navigate = useNavigate();
  return (
    <div className="upload">
      <Sidebar active="upload"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Upload RAW data to network</h1>
          <ImageDropzone whenDropped={() => navigate("uploading")} RAW={true}/>
        </header>
      </main>
    </div>
  )
}

export function Uploading() {
  // var { image, setImage } = useContext(Upload Context);
  return (
    <div className="upload">
      <Sidebar active="upload"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Confirm upload</h1>
          <div className="uploadWrapper">
            <UploadingInfo />
            <img src={image} alt="JPEG Preview" className="infoUpload"/>
          </div>
        </header>
      </main>
    </div>
  )
}

export function UploadingInfo() {
  var navigate = useNavigate();
  return (<section className="uploadInfo">
    <h2>Upload Overview</h2>
    <form onSubmit={(e) => {
      e.preventDefault()
      navigate("uploaded")
    }} className="uploadGrid">
      <div className="uploadCard">
        <TextElement defaultValue={0} name={"Genesis Funding (Ether)"} helperText={"The amount of Ether provided to voters to incentivize voter authentication"}/>
      </div>
      <div className="uploadCard">
        <TextElement defaultValue={7} name={"Voting Duration (days)"} helperText={"The duration of the voting round before a final authenticity score is decided"}/>
      </div>
      <div className="uploadCard">
        <h3>Gas Price (Gwei)</h3>
        <p>Ξ0.57</p>
      </div>
      <div className="uploadCard">
        <h3>Gas Cost</h3>
        <p>126,783</p>
      </div>
      <div className="uploadCard">
        <h3>Cost of upload (ether)</h3>
        <p>Ξ0.00007226631</p>
      </div>
      <div className="uploadCard">
        <h3>Estimated time to completion</h3>
        <p>~3 minutes</p>
      </div>
      <button type="submit">Broadcast Transaction</button>
    </form>
  </section>)
}

export function Uploaded() {
  // var { image, setImage } = useContext(Upload Context);
  return (
    <div className="upload">
      <Sidebar active="upload"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Image uploaded to network!</h1>
          <div className="uploadWrapper">
            <UploadedInfo />
            <img src={image} alt="JPEG Preview" className="infoUpload"/>
          </div>
        </header>
      </main>
    </div>
  )
}

export function UploadedInfo() {
  return (<section className="uploadInfo">
    <h2>Image Overview</h2>
    <div className="uploadGrid">
      <div className="uploadCard">
        <h3>JPEG SHA-256 Hash Identifier</h3>
        <p>0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</p>
      </div>
      <div className="uploadCard">
        <h3>Swarm Content Identifier</h3>
        <p>0x2477cc8584cc61091b5cc084cdcdb45bf3c6210c263b0143f030cf7d750e894d</p>
      </div>
      <div className="uploadCard">
        <h3>Date Published To Notary</h3>
        <p>{Date().toString().slice(4, 21)}</p>
      </div>
      <div className="uploadCard">
        <h3>RAW data type</h3>
        <p>DNG (Adobe digital negative)</p>
      </div>
    </div>
  </section>)
}
