import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import NumbersIcon from "@mui/icons-material/Numbers";
import InputAdornment from "@mui/material/InputAdornment";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { MapSection } from "./MapSection.js";
import useWindowDimensions from "./useWindowDimension.js"

function App() {
  const [stNumberToAskFor, setStNumberToAskFor] = useState("");
  const [stNumberError, setStNumberError] = useState(false);
  const [stNameToAskFor, setStNameToAskFor] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const { height, width } = useWindowDimensions();

  const [isDesktopSize,setIsDesktopSize] = useState(null)

  useEffect(() => {
    if (width > 600){
      setIsDesktopSize(true)
    }else{
      setIsDesktopSize(false)
    }

  }, [width,height]);

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
            <Grid item xs={isDesktopSize ? 9 : 12}>
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
            <Grid item xs={isDesktopSize ? 3 : 12}>
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
              <p className="App-p">{searchResult ?? ""}</p>
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
      <MapSection
        initLat={37.7424951959228}
        initLon={-122.39161759509756}
        finishLat={37.7424951959228}
        finishLon={-122.39161759509756}
      />
    </div>
  );
}

export default App;
