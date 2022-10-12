import "./App.css";
import { useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function App() {
  const [stNumberToAskFor, setStNumberToAskFor] = useState("");
  const [stNameToAskFor, setStNameToAskFor] = useState("");

  const handlestNumberInputChange = (e) => {
    setStNumberToAskFor(e.target.value);
  };

  const handlestNameInputChange = (e) => {
    setStNameToAskFor(e.target.value);
  };

  const searchCloserFoodTruck = async () => {
    console.log(stNumberToAskFor, stNameToAskFor);
    const response = await axios
      .get(
        `http://127.0.0.1:8000/food_trucks/${stNumberToAskFor}/${stNameToAskFor}`
      )
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD9NcAPaKmfcBbmdvulwtvNs1-0k-Ds8mA",
  });

  if (!isLoaded) return <div> LOADING </div>;
  return (
    <div className="App">
      <div className="App-header">
        <h1 className="App-title">Welcome to food trucks app</h1>
        <p className="App-p">
          Please provide the street number and street name to search closer food truck
        </p>
        <div className="App-container-inputs">
          <input
            className="App-inputs"
            placeholder="Street Number"
            onChange={handlestNumberInputChange}
          ></input>
          <input
            className="App-inputs"
            placeholder="Street Name"
            onChange={handlestNameInputChange}
          ></input>
        </div>
        <button onClick={() => searchCloserFoodTruck()}>
          Look for the closer food truck{" "}
        </button>
      </div>
      <div>
        <h1>Map</h1>
        <GoogleMap
          zoom={10}
          center={{ lat: 44, lng: -80 }}
          mapContainerClassName="map-container"
        >
          <Marker position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;
