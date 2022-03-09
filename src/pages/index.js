import React, { useState } from "react"

import Header from "../components/header"
import List from "../components/list"
import Recs from "../components/recs"

import "../styles/typography.css"
import "../styles/resets.css"
import "../styles/main.css"

export default function Home() {
  const [selectedPlants, setSelectedPlants] = useState([])

  return (
    <div className="container">
      <div className="app-panel">
        <Header />
        <List setParentPlants={setSelectedPlants} />
        <Recs selectedPlants={selectedPlants} />
      </div>
    </div>
  )
}
