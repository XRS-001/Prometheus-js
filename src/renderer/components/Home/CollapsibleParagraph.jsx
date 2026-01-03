import React, { useState } from 'react'
import './CollapsibleParagraph.css'

export default function CollapsibleParagraph({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="collapsible">
      <button className="collapsible-toggle" onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && <p className="collapsible-content">{children}</p>}
    </div>
  )
}
