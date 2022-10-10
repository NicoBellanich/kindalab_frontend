import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [latitudeToAskFor,setLatitudeToAskFor] = useState("");
  const [longitudeToAskFor,setLongitudeToAskFor] = useState("");


  const handleLatitudeInputChange = (e) => {
    setLatitudeToAskFor(e.target.value);
  };

  const handleLongitudeInputChange = (e) => {
    setLongitudeToAskFor(e.target.value);
  };


  const searchCloserFoodTruck = async () => {
    console.log(latitudeToAskFor,longitudeToAskFor)
    const response = await axios 
      .get(`http://127.0.0.1:8000/food_trucks/${latitudeToAskFor}/${longitudeToAskFor}`)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="App-title">Welcome to food trucks app</h1>
        <p className="App-p"> Please provide latitude and longitude to search distance</p>
        <input placeholder="latitude" onChange={handleLatitudeInputChange}></input>
        <input placeholder="longitude" onChange={handleLongitudeInputChange}></input>
        <button onClick={() => searchCloserFoodTruck()}> Look for the closer food truck </button>
      </div>
      <div>
        <h1>Map</h1>
      </div>
    </div>
  );
}

export default App;
