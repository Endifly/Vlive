import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Hidden,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import Clock from 'react-live-clock';
const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
  },
  menuButton: {
    marginRight: "auto",
  },
  title: {
    flexGrow: 1,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.05em",
  },
  liveStatus : {
    background:"orange",
    marginRight:"16px",
  }
}));

function TopBar({ onMobileNavOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={6} style={{background:"#00610b"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onMobileNavOpen}
          >
          <Typography variant="h6" className={classes.title}>
            VLIKE
          </Typography>

          </IconButton>

          {/* <Button className={classes.liveStatus}>Live</Button> */}
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} className={classes.clock}/>
          <IconButton color="inherit" component={RouterLink} to="/home">
            <HomeIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => {}}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default TopBar;
