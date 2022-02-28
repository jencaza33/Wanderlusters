import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import ItineraryForm from "./components/ItineraryForm/ItineraryForm";
import Home from "./components/Home/Home";




const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Itinerary" component={ItineraryForm} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/LogIn" component={LogIn} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
