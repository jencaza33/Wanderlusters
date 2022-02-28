import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import axios from "axios";
import ItineraryItems from "../ItineraryItems/ItineraryItems";
import Image from "../../docs/Q2A4186.jpg";

const ItineraryForm = () => {
  const classes = useStyles();
  // using useRef to clear the form
  const placeInput = React.useRef(null);
  const notesInput = React.useRef(null);
  const [data, setData] = useState({
    placename: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const config = getHeader();
    Promise.all([axios.get("/users/Itinerary", config)]).then((res) => {
      // console.log("res.[]++++++", res[0].data.itineraryItems);

      setItems(res[0].data.itineraryItems);
    });
  }, []);
  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  console.log("DATA", data);

  //Sending the token in headers
  const getHeader = () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   // Redirect to login
    // }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return config;
  };

  const handleSubmit = async (id) => {
    if (data.placename === "" || data.notes === "") {
      setError("A place name and notes must be entered.");
    }

    const config = getHeader();

    try {
      // data.token = localStorage.getItem("token");
      const url = `http://localhost:3001/users/Itinerary/`;
      console.log("LocalStorageData", data);
      setItems([data, ...items]);
      const res = await axios.post(url, data, config);
      if (res.status === 400) {
        return setError(res);
      }
      placeInput.current.value = "";
      notesInput.current.value = "";
    } catch (error) {}
  };

  const handleDelete = async (id, index) => {
    const config = getHeader();

    try {
      const url = `http://localhost:3001/users/Itinerary/delete/${id}`;
      // data.token = localStorage.getItem("token");
      // console.log("LocalStorageData", data);
      setItems([]);
      const res = await axios.post(url, {}, config);
      const tempItems = [...items];
      tempItems.splice(index, 1);
      setItems([...tempItems]);
      if (res.status === 400) {
        return setError(res);
      }
    } catch (error) {}
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => e.preventDefault()}
        sx={{ mt: 3 }}
      >
        <div>{error}</div>

        <Link to="/" className={classes.toolbarlink}>
          <Box m={1} p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/");
              }}
              type="submit"
            >
              Home
            </Button>
          </Box>
        </Link>
        <Card elevation={4} className={classes.container}>
          <Typography variant="h2" gutterBottom>
            Travel Intinerary
          </Typography>
          <CardMedia
            className={classes.media}
            style={{ height: 350 }}
            image={
              "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
            }
            // image={"https://source.unsplash.com/random"}
            title="Travel Itinerary"
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="placename"
                  name="placename"
                  label="Place name"
                  fullWidth
                  variant="standard"
                  required
                  onChange={handleChange}
                  autoFocus
                  inputRef={placeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="notes"
                  name="notes"
                  label="Notes"
                  fullWidth
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
                  inputRef={notesInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.buttonSubmit}
                  onClick={handleSubmit}
                  type="submit"
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ItineraryItems items={items} handleDelete={handleDelete} />
    </>
  );
};
export default ItineraryForm;
