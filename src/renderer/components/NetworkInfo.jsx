import React from 'react'
import './NetworkInfo.css'

export default function NetworkInfo() {
  return (<section className="networkInfo">
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
  </section>)
}
