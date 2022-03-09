import React, { useState } from "react"

import plants from "../data/plants.js"

import PlusIcon from "../assets/plus.svg"
import DeleteIcon from "../assets/delete.svg"

import "../styles/list.css"

export default function List({ setParentPlants }) {
  const [state, setState] = useState({
    plants: [
      {
        commonName: "",
        scientificName: "",
        commonNameSuggestions: [],
        scientificNameSuggestions: [],
        fertilizer: { interval: 0, npk: "" },
        humidity: { ideal: 0, min: 0, max: 0 },
        nativeTo: "",
        propagation: [],
        temp: { ideal: 0, min: 0, max: 0 },
        toxic: 0,
      },
    ],
  })

  return (
    <section>
      <div className="list-container">
        <h1>First</h1>
        <p>List all the plants you have in your room/home.</p>
        {state.plants.map((plant, i) => (
          <React.Fragment>
            <div className="plant-container">
              <input
                placeholder="Common Name"
                value={plant.commonName}
                onChange={e => {
                  handleChangeCommonName(e, i)
                  filterCommonName(e, i)
                  handleCheckPlant(i)
                }}
              />
              {renderCommonNameSuggestions(plant, i)}
              <input
                placeholder="Scientific Name"
                value={plant.scientificName}
                onChange={e => {
                  handleChangeScientificName(e, i)
                  filterScientificName(e, i)
                  handleCheckPlant(i)
                }}
              />
              {renderScientificNameSuggestions(plant, i)}
              <button onClick={() => handleDeletePlant(i)}>
                <img src={DeleteIcon} alt="Delete Icon" />
              </button>
            </div>
            <div className="plant-data-container">
              <p>
                Native To: <span>{state.plants[i].nativeTo}</span>
              </p>
              <p>
                Fertilizer Interval (Weeks):{" "}
                <span>{state.plants[i].fertilizer.interval}</span>
              </p>
              <p>
                Fertilizer NPK: <span>{state.plants[i].fertilizer.npk}</span>
              </p>
              <p>
                Propagation:
                <span>
                  {state.plants[i].propagation.map(method => {
                    return " " + method + " "
                  })}
                </span>
              </p>
              <p>
                Toxic: <span>{renderToxic(i)}</span>
              </p>
            </div>
          </React.Fragment>
        ))}
        <button onClick={() => handleAddPlant()}>
          <img src={PlusIcon} alt="Add Icon" />
        </button>
      </div>
    </section>
  )

  function renderToxic(i) {
    if (state.plants[i].toxic == 1) {
      return "Yes"
    } else {
      return "No"
    }
  }

  function renderCommonNameSuggestions(plant, i) {
    if (state.plants[i].commonNameSuggestions.length > 0) {
      return (
        <div>
          <div className="plant-suggestions-container">
            <ul>
              {plant.commonNameSuggestions.map((suggestion, j) => (
                <li onClick={e => handleSelectCommonName(e, i)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }

  function renderScientificNameSuggestions(plant, i) {
    if (state.plants[i].scientificNameSuggestions.length > 0) {
      return (
        <div>
          <div className="plant-suggestions-container">
            <ul>
              {plant.scientificNameSuggestions.map((suggestion, j) => (
                <li onClick={e => handleSelectScientificName(e, i)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }

  function filterCommonName(e, i) {
    const newPlants = [...state.plants]
    newPlants[i].commonNameSuggestions = plants.searchCommonName(e.target.value)
    setState({ plants: newPlants })
  }

  function filterScientificName(e, i) {
    const newPlants = [...state.plants]
    newPlants[i].scientificNameSuggestions = plants.searchScientificName(
      e.target.value
    )
    setState({ plants: newPlants })
  }

  function handleSelectCommonName(e, i) {
    let newPlants = [...state.plants]
    newPlants[i].commonName = e.target.innerText
    setState({ plants: newPlants })
    newPlants = [...state.plants]
    newPlants[i].commonNameSuggestions = []
    setState({ plants: newPlants })

    for (let j = 0; j < plants.allPlants.length; j++) {
      if (plants.allPlants[j].commonNames[0] == e.target.innerText) {
        newPlants = [...state.plants]
        newPlants[i].scientificName = plants.allPlants[j].scientificName
        setState({ plants: newPlants })
      }
    }

    handleCheckPlant(i)
  }

  function handleSelectScientificName(e, i) {
    let newPlants = [...state.plants]
    newPlants[i].scientificName = e.target.innerText
    setState({ plants: newPlants })
    newPlants = [...state.plants]
    newPlants[i].scientificNameSuggestions = []
    setState({ plants: newPlants })

    for (let j = 0; j < plants.allPlants.length; j++) {
      if (plants.allPlants[j].scientificName == e.target.innerText) {
        newPlants = [...state.plants]
        newPlants[i].commonName = plants.allPlants[j].commonNames[0]
        setState({ plants: newPlants })
      }
    }

    handleCheckPlant(i)
  }

  function handleChangeCommonName(e, i) {
    const newPlants = [...state.plants]
    newPlants[i].commonName = e.target.value
    setState({
      plants: newPlants,
    })
  }

  function handleChangeScientificName(e, i) {
    const newPlants = [...state.plants]
    newPlants[i].scientificName = e.target.value
    setState({
      plants: newPlants,
    })
  }

  function handleDeletePlant(i) {
    const newPlants = [...state.plants]
    newPlants.splice(i, 1)
    setState({
      plants: newPlants,
    })
  }

  function handleAddPlant() {
    const newPlants = [...state.plants]
    newPlants.push({
      commonName: "",
      scientificName: "",
      commonNameSuggestions: [],
      scientificNameSuggestions: [],
      fertilizer: { interval: 0, npk: "" },
      humidity: { ideal: 0, min: 0, max: 0 },
      nativeTo: "",
      propagation: [],
      temp: { ideal: 0, min: 0, max: 0 },
      toxic: 0,
    })
    setState({
      plants: newPlants,
    })
  }

  function handleCheckPlant(i) {
    for (let j = 0; j < plants.allPlants.length; j++) {
      if (
        plants.allPlants[j].scientificName == state.plants[i].scientificName
      ) {
        let statePlants = [...state.plants]
        let allPlants = [...plants.allPlants]

        statePlants[i].commonName = allPlants[j].commonNames[0]
        statePlants[i].scientificName = allPlants[j].scientificName
        statePlants[i].commonNameSuggestions = []
        statePlants[i].scientificNameSuggestions = []
        statePlants[i].fertilizer.interval = allPlants[j].fertilizer.interval
        statePlants[i].fertilizer.npk = allPlants[j].fertilizer.npk
        statePlants[i].humidity.ideal = allPlants[j].humidity.ideal
        statePlants[i].humidity.min = allPlants[j].humidity.minimum
        statePlants[i].humidity.max = allPlants[j].humidity.maximum
        statePlants[i].nativeTo = allPlants[j].nativeTo
        statePlants[i].propagation = allPlants[j].propagation
        statePlants[i].temp.ideal = allPlants[j].temp.ideal
        statePlants[i].temp.min = allPlants[j].temp.minimum
        statePlants[i].temp.max = allPlants[j].temp.maximum
        statePlants[i].toxic = allPlants[j].toxic

        setState({
          plants: statePlants,
        })
        setParentPlants(statePlants)
      }
    }
  }
}

// export default List
