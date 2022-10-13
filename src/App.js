import "./App.css";
import { useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import NumbersIcon from "@mui/icons-material/Numbers";
import InputAdornment from "@mui/material/InputAdornment";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function App() {
  const [stNumberToAskFor, setStNumberToAskFor] = useState("");
  const [stNumberError, setStNumberError] = useState(false);
  const [stNameToAskFor, setStNameToAskFor] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handlestNumberInputChange = (e) => {
    setStNumberToAskFor(e.target.value);
  };

  const handlestNameInputChange = (e) => {
    setStNameToAskFor(e.target.value);
  };

  const searchCloserFoodTruck = async () => {
    //setStNumberError(!stNumberError)
    setSearchActive(true);
    console.log(stNumberToAskFor, stNameToAskFor);
    await axios
      .get(
        `http://127.0.0.1:8000/food_trucks/${stNumberToAskFor}/${stNameToAskFor}`
      )
      .then((result) => {
        console.log(result);
        setSearchResult(result.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setSearchActive(false));
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD9NcAPaKmfcBbmdvulwtvNs1-0k-Ds8mA",
  });

  if (!isLoaded) return <div> LOADING </div>;
  return (
    <div className="App">
      <div className="App-header">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1 className="App-title">🍔🚚 Welcome to food trucks app</h1>
            </Grid>
            <Grid item xs={12}>
              <p className="App-p">
                Please provide the street number and street name to search
                closer food truck
              </p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Street Name"
                onChange={handlestNameInputChange}
                margin="normal"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddRoadIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Street Number"
                onChange={handlestNumberInputChange}
                margin="normal"
                size="small"
                error={stNumberError}
                helperText={stNumberError ? "Incorrect entry." : null}
                inputProps={{ type: "number" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <p className="App-p">{searchResult ?? ''}</p>
            </Grid>
            <Grid item xs={12}>
              {!searchActive ? (
                <Button
                  variant="contained"
                  onClick={() => searchCloserFoodTruck()}
                >
                  Look for the closer food truck
                </Button>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
        </Box>
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
