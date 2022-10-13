import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./App.css";
import useWindowDimensions from "./useWindowDimension.js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export function MapSection({
  initialLatitude,
  finalLatitude,
  initialLongitude,
  finalLongitude,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
  const { height, width } = useWindowDimensions();
  const [isDesktopSize, setIsDesktopSize] = useState(null);

  useEffect(() => {
    if (width > 600) {
      setIsDesktopSize(true);
    } else {
      setIsDesktopSize(false);
    }
  }, [width, height]);

  if (!isLoaded) return <div> LOADING </div>;
  return (
    <Box sx={{ flexGrow: 1 }} className="Map-section-container">
      <Grid container spacing={4}>
        <Grid item xs={!isDesktopSize ? 12 : 6}>
          <h1>{"Starting Point"}</h1>
          <GoogleMap
            zoom={17}
            center={{ lat: initialLatitude, lng: initialLongitude }}
            mapContainerClassName="Single-map"
          >
            <Marker
              position={{ lat: initialLatitude, lng: initialLongitude }}
            />
          </GoogleMap>
        </Grid>
        <Grid item xs={!isDesktopSize ? 12 : 6}>
          <h1>{"Finishing Point"}</h1>
          <GoogleMap
            zoom={17}
            center={{ lat: finalLatitude, lng: finalLongitude }}
            mapContainerClassName="Single-map"
          >
            <Marker position={{ lat: finalLatitude, lng: finalLongitude }} />
          </GoogleMap>
        </Grid>
      </Grid>
    </Box>
  );
}
