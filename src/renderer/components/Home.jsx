import React from 'react'
import './Home.css'
import ETHLogo from '../assets/ETHLogo.png'
import CollapsibleParagraph from './CollapsibleParagraph.jsx'
import MenuCards from './MenuCards.jsx'
import NetworkInfo from './NetworkInfo.jsx'
import Sidebar from './Sidebar.jsx'

export default function Home() {
  return (
    <div className="app">
      <Sidebar active="home"></Sidebar>
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
        <MenuCards></MenuCards>
        <NetworkInfo></NetworkInfo>
      </main>
    </div>
  )
}
