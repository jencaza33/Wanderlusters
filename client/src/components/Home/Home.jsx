import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Card,
  CardMedia,
  Paper,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { CssBaseline, Grid } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Header from "../Header/Header";
import List from "../List/List";
import Map from "../Map/Map";
import { getPlacesData, getWeatherData } from "../../api";
import Navbar from "../Navbar/Navbar";

const Home = (props) => {
  const log = localStorage.getItem("isLoggedIn");
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: null, ne: null });
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState("3");

  //Set the user's current location when we open the page first.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // To filter places according to the rating
  useEffect(() => {
    const filtered =
      places && places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  //Pass the coordinates to the axios call to get the data of it.
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <Navbar isLoggedIn={log} />

      {log && (
        <>
          <CssBaseline />

          <Header setCoordinates={setCoordinates} />
          <Grid container spacing={3} style={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
              <List
                places={filteredPlaces.length > 0 ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length > 0 ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData={weatherData}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
