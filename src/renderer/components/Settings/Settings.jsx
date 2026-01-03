import React from 'react'
import { useState } from "react";
import './Settings.css'
import Sidebar from '../Sidebar.jsx'
import { TextElement, RadioElement } from '../FormElements.jsx'

export default function Settings() {
  return (
    <div className="settings">
      <Sidebar active="settings"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Settings</h1>
          <div className="form">
            <form>
              <TextElement name="Ethereum RPC URL" defaultValue="http://127.0.0.1:8545" helperText="The RPC URL used to connect to the Ethereum network."></TextElement>
              <TextElement name="Path To Private Keystore" defaultValue="/keys/keystore.json" helperText="The path to the encrypted keystore used to sign transactions to the network."></TextElement>
              <RadioElement name="Gas Mode" defaultValue="Regular" helperText="The relative gas price used to pay for transactions to reach finality within a certain timeframe." options={["Slow", "Regular", "Fast"]}></RadioElement>
              <TextElement name="Default Swarm Storage Time (months)" defaultValue="12" helperText="The number of months to pay for Swarm storage for uploaded images by default."></TextElement>
            </form>
          </div>
        </header>
      </main>
    </div>
  )
}
