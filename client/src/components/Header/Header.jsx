import React , {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon  from "@material-ui/icons/Search";
import useStyles from './styles.js'
import Search from '@material-ui/icons/Search';
import Button from '@mui/material/Button';
import Logout from '../LogOut/LogOut';
import {Link} from 'react-router-dom';


const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      console.log("lat&lng", lat, lng);
      setCoordinates({ lat, lng });
    }
    return(
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Box sx={{ flexGrow: 0 }}>
              <Link to="/" className={classes.toolbarlink} > 
              <Button 
                variant="contained" 
                color="primary"
                onClick=""
                type="submit"
              >Home 
              </Button>
              </Link>
              <Link to="/Itinerary" className={classes.toolbarlink} >
              <Button 
                variant="contained" 
                color="primary"
                onClick=""
                type="submit"
              >Intinerary 
              </Button>
              </Link>
              <Button 
                variant="contained" 
                color="primary"
                onClick={Logout}
                type="submit"
              > LogOut 
              </Button>
          </Box>
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
             Your Destination Starts Here
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    );
}
             

export default Header;