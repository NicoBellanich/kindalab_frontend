import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const getAllTrucks = async () => {
    await axios
      .get("http://127.0.0.1:8000/food_trucks/all/")
      .then((r) => {
        console.log(r);
        setTrucks(r.data);
      })
      .catch((e) => console.log(e));
  };

  const getOneTruck = async () => {
    await axios
      .get(`http://127.0.0.1:8000/food_trucks/${tuckToAskFor}/`)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  };

  const getTrucksApiResponse = async () => {
    await axios
      .get(`http://127.0.0.1:8000/food_trucks/other_api`)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  };

  const [trucks, setTrucks] = useState("");
  const [tuckToAskFor, setTuckToAskFor] = useState("");

  useEffect(() => {
    getAllTrucks();
  }, []);

  const handleInputChange = (e) => {
    setTuckToAskFor(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to food trucks app</p>
        {/* {trucks && trucks.map((item, key) => {
          return <tr key={key}> <td>{item}</td> </tr>;
        })} */}
        <input onChange={handleInputChange}></input>
        <button onClick={() => getOneTruck()}> get truck by id </button>
        <button onClick={() => getTrucksApiResponse()}> clickme to get other api response hell yeah! </button>
      </header>
    </div>
  );
}

export default App;