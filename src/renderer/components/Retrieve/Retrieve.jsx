import React from 'react'
import { useState } from "react";
import './Retrieve.css'
import Sidebar from '../Sidebar.jsx'
import { TextElement, RadioElement } from '../FormElements.jsx'
import ImageDropzone from '../ImageDropzone.jsx'

export default function Retrieve() {
  return (
    <div className="retrieve">
      <Sidebar active="retrieve"></Sidebar>
      <main className="main">
        <header className="header">
          <h1>Retrieve RAW data from network</h1>
          <ImageDropzone/>
        </header>
      </main>
    </div>
  )
}
