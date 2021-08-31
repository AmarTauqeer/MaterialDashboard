import {
  TextField,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  heading: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Contact = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        Contact Us
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          name="name"
          label="Name"
          type="text"
          variant="outlined"
          required
          className={classes.input}
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          required
          className={classes.input}
        />
        <TextField
          name="message"
          label="Message"
          multiline
          rows={4}
          defaultValue="Write your message here"
          variant="outlined"
          className={classes.input}
        />

        <Button variant="contained" color="secondary" className={classes.input}>
          Send
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
