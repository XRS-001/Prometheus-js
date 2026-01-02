import React from 'react'
import './dashboard.css'
import FireLogo from '../assets/Fire.png'
import ETHLogo from '../assets/ETHLogo.png'
import CollapsibleParagraph from './CollapsibleParagraph.jsx'
export default function Dashboard() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Prometheus</h2>
        <img src={FireLogo} width={60} className="sidebarLogo"/>
        <nav>
          <a className="active">Home</a>
          <a>Upload Image</a>
          <a>Retrieve Image</a>
          <a>Settings</a>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Welcome to Prometheus v0.5</h1>
          <img src={ETHLogo} width={80} className="ethLogo"/>
        </header>
        <CollapsibleParagraph title={"Intro to Prometheus"}>
          {`Welcome to Prometheus, an Ethereum-based image authentication system that allows authors to upload RAW camera sensor data to peer-to-peer file storage networks that links back to JPEGs notarized on Ethereum to provide users with proof of an image's authenticity without trusting intermediaries.

Get started below to upload your own RAW camera data or retrieve data from a provided JPEG image that's been notarized in Prometheus' Ethereum-based record.

Account and network settings can be adjusted in the settings page.`}
        </CollapsibleParagraph>
        <section className="cards">
          <button className="card" id="upload">
            <div>
              <h3>Upload Image</h3>
            </div>
          </button>
          <button className="card" id="retrieve">
            <div>
              <h3>Retrieve Image</h3>
            </div>
          </button>
          <button className="card" id="settings">
            <div>
              <h3>Settings</h3>
            </div>
          </button>
        </section>
        <section className="networkInfo">
          <h2>Network Overview</h2>
          <div className="infoGrid">
            <div className="infoCard">
              <h3>Ether In Security Deposit</h3>
              <p>Ξ2,140</p>
            </div>
            <div className="infoCard">
              <h3>Images Authenticated</h3>
              <p>1,232</p>
            </div>
            <div className="infoCard">
              <h3>Ether Voting Activity Per Day</h3>
              <p>Ξ58</p>
            </div>
            <div className="infoCard">
              <h3>Images Currently Being Authenticated</h3>
              <p>24</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
