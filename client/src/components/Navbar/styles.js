import { makeStyles } from "@material-ui/core/styles";
import "@fontsource/berkshire-swash";

export default makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  toolbarlink: {
    textDecoration: "none",
  },
  title: {
    display: "none",
    flexGrow: 1,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
}));
