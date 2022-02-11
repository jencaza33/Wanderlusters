import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData } from './api'

const App = () => {

    const [places, setPlaces] = useState([])

    const [coordinates, setCoordinates] = useState({ lat:0, lng:0 }); //make search dynamic
    const [bounds, setBounds] = useState(null)

    useEffect(() => {
        getPlacesData()
            .then((data) => {
                console.log(data) //make sure data is being fetched properly
                setPlaces(data)
            })
    }, [coordinates, bounds]);

   return (
       <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates = {setCoordinates}
                    setBounds = {setBounds}
                    coordinates= {coordinates}
                    /> 
                </Grid>
            </Grid>
     
        </>
   ); 
}

export default App;