import {
  TextField,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { addUser } from "../../components/redux/actions/userActions";
import {
  setMessage,
  removeMessage,
} from "../../components/redux/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
    width: "30%",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const message = useSelector((state) => state.messages.messages);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeMessage());
  };

  const handleCancelExit = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !pass) {
      const data = [
        {
          open: true,
          messageType: "error",
          message: "Please fill all required field first!",
        },
      ];
      dispatch(setMessage(data));
      return false;
    }

    if (pass !== confirmPass) {
      const data = [
        {
          open: true,
          messageType: "error",
          message: "Password and confirm password not matched",
        },
      ];
      dispatch(setMessage(data));
      return false;
    }

    const userData = {
      user_name: user,
      user_password: pass,
    };

    const add = async () => {
      const response = await axios
        .post("http://127.0.0.1:8000/add_user/", userData)
        .catch((err) => console.log(err));
      dispatch(addUser(response.data));
    };

    if (userData) {
      add();
      dispatch(addUser(userData));
      const data = [
        {
          open: true,
          messageType: "success",
          message: "Account is created",
        },
      ];
      dispatch(setMessage(data));
      history.push("/login");
    }
  };
  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        Sign up
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          name="username"
          label="User Name"
          type="text"
          variant="outlined"
          onChange={(e) => setUser(e.target.value)}
          required
          className={classes.input}
        />
        <TextField
          name="userpass"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPass(e.target.value)}
          required
          className={classes.input}
        />
        <TextField
          name="confirmPass"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
          className={classes.input}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.input}
          onClick={handleSubmit}
        >
          Signup
        </Button>
        <Link to="/login" className={classes.link}>
          Already have an account? Sign In
        </Link>
      </form>
      {message && (
        <Snackbar
          open={message[0].open && message[0].open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={message[0].messageType && message[0].messageType}
          >
            {message[0].message && message[0].message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Register;
