import React, { useState } from "react"

import Rec from "../components/rec"

import TempIcon from "../assets/temp.svg"
import DegreeIcon from "../assets/degrees.svg"
import HumidityIcon from "../assets/humidity.svg"
import PercentIcon from "../assets/percent.svg"

import "../styles/recs.css"

export default function Recs({ selectedPlants }) {
  const [temp, setTemp] = useState({})
  const [humidity, setHumidity] = useState({})
  const [showRecs, setShowRecs] = useState(false)

  return (
    <section>
      <div className="recs-container">
        <h1>Second</h1>
        <p>
          Get personalized recommendations on how to maintain an environment
          your plants will love!
        </p>
        <button onClick={getRecs}>Let's Go!</button>
        {renderRecs()}
      </div>
    </section>
  )

  function renderRecs() {
    if (showRecs) {
      return (
        <React.Fragment>
          <Rec
            ideal={temp.ideal}
            min={temp.min}
            max={temp.max}
            unit={DegreeIcon}
            icon={TempIcon}
          />
          <Rec
            ideal={humidity.ideal}
            min={humidity.min}
            max={humidity.max}
            unit={PercentIcon}
            icon={HumidityIcon}
          />
        </React.Fragment>
      )
    }
  }

  function getRecs() {
    let recs = {
      temp: { ideal: [], min: [], max: [] },
      humidity: { ideal: [], min: [], max: [] },
    }

    for (let i = 0; i < selectedPlants.length; i++) {
      for (const [key, value] of Object.entries(selectedPlants[i])) {
        if (key === "temp" || key === "humidity") {
          for (const [k, v] of Object.entries(value)) {
            recs[key][k].push(v)
          }
        }
      }
    }

    setTemp({
      ideal: Math.round(average(recs.temp.ideal)),
      min: Math.round(average(recs.temp.min)),
      max: Math.round(average(recs.temp.max)),
    })
    setHumidity({
      ideal: Math.round(average(recs.humidity.ideal)),
      min: Math.round(average(recs.humidity.min)),
      max: Math.round(average(recs.humidity.max)),
    })

    setShowRecs(true)

    function average(array) {
      return array.reduce((a, b) => a + b, 0) / array.length
    }
  }
}
