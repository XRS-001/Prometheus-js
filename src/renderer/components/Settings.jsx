import React from 'react'
import './Settings.css'
import Sidebar from './Sidebar.jsx'

export default function Settings() {
  return (
    <div className="settings">
      <Sidebar active="settings"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Settings</h1>
        </header>
      </main>
    </div>
  )
}
