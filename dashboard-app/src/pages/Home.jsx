import { Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((them) => ({
  container: {
    paddingTop: them.spacing(10),
  },
}));

const Home = () => {
  const classes = useStyles();
  return <Container className={classes.container}>Home</Container>;
};

export default Home;
