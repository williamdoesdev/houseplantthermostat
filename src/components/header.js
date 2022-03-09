import React from "react"

import Logo from "../assets/logo.svg"
import HelpIcon from "../assets/help.svg"

import "../styles/header.css"

export default function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="header-logo" />
        <div
          className="header-help-container"
          tooltip="This page references a dataset that I put together myself by researching each plant included. I cannot guarantee that all data is completely accurate."
        >
          <img src={HelpIcon} alt="Help" className="header-help" />
        </div>
      </div>
      <p>
        Keeping indoor houseplants happy and healthy is{" "}
        <span className="green-text">hard</span>.
        <br />
        This will make it a little <span className="green-text">easier</span>.
      </p>
    </header>
  )
}
