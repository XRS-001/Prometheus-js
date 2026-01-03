import React from 'react'
import { useState } from "react";
import './Settings/Settings.css'
import './FormElements.css'

export function TextElement( { defaultValue, name, helperText } ) {
  var [value, setValue] = useState(defaultValue);
  const [showHelp, setShowHelp] = useState(false);
  return (
  <div className="textElement">
    <div className="label">
      <label htmlFor={name}>{name}</label>
      <span className="help-icon" onMouseEnter={() => setShowHelp(true)} onMouseLeave={() => setShowHelp(false)} > ? </span>
    </div>
    {showHelp && ( <div className="help-popup"> {helperText} </div> )}
    <input type="text" spellCheck={false} id={name} value={value} onChange={(e) => setValue(e.target.value)}/>
  </div>)
}
export function RadioElement( { defaultValue, name, helperText, options } ) {
  var [selectedValue, setSelectedValue] = useState(defaultValue);
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div className="radioElement">
      {name}
      <div className="help-container" onMouseEnter={() => setShowHelp(true)} onMouseLeave={() => setShowHelp(false)} style={{ display: "inline-block", position: "relative" }} >
        <span className="help-icon">?</span>
        {showHelp && ( <div className="help-popup" style={{ position: "absolute", top: "100%", left: 0 }} > {helperText}
      </div> )}
      </div>
      {options.map((option, i) => { return (
        <div key={i}>
        <div className="label">
          <label htmlFor={name + i}>{option}</label>
        </div>
        <input type="radio" id={name + i} name={name} value={option} checked={selectedValue === option} onChange={(e) => setSelectedValue(e.target.value)}/>
      </div>);})}
    </div>)
}
