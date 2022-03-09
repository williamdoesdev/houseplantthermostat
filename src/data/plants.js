import allPlants from "../data/plants.json"

export default {
  allPlants: allPlants,
  searchCommonName: function (searchTerm) {
    if (searchTerm.length > 2) {
      const filteredPlants = allPlants.filter(plant =>
        checkForSubstr(plant.commonNames, searchTerm)
      )
      let plantNames = []
      for (let i = 0; i < filteredPlants.length; i++) {
        plantNames.push(filteredPlants[i].commonNames[0])
      }
      return plantNames
    } else return []
  },
  searchScientificName: function (searchTerm) {
    console.log("hello")
    if (searchTerm.length > 2) {
      console.log("2")
      const filteredPlants = allPlants.filter(plant =>
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      let plantNames = []
      for (let i = 0; i < filteredPlants.length; i++) {
        plantNames.push(filteredPlants[i].scientificName)
      }
      console.log(plantNames)
      return plantNames
    } else return []
  },
}

function checkForSubstr(array, subStr) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().includes(subStr.toLowerCase())) {
      return true
    }
  }
  return false
}
