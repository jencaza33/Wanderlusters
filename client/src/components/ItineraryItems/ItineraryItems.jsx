import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import axios from "axios";
const theme = createTheme();

const ItineraryItems = ({ items, handleDelete }) => {
  const classes = useStyles();
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Saved Notes
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
              <Grid  xs={12} sm={8} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     Place Name
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      Notes
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button >
                      DELETE
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))};
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
    </>
  );
};

export default ItineraryItems;
