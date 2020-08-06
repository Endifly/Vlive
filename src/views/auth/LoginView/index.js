import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles,
  Grid
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockIcon from "@material-ui/icons/Lock";
import LoginForm from "./LoginForm";
import Skeleton from "@material-ui/lab/Skeleton";

const lightGreen = "#fcfffd"

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    backgroundColor: lightGreen,
    display: "flex",
    height: "calc(100vh)",
    minHeight: "100%",
    flexDirection: "column",
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: "visible",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: "absolute",
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    opacity: "0.3",
    // marginLeft:"-64px"
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push("/app/dashboard");
  };

  return (
      <Grid container item xs={12} justify="center" alignItems="center" className={classes.root}> 
        <Grid item>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h4" color="textPrimary">
                Sign in
              </Typography>
              <Box mt={3}>
                <LoginForm onSubmitSuccess={handleSubmitSuccess} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
}
export default LoginView;
