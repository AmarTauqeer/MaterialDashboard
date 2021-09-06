import {
  TextField,
  Container,
  makeStyles,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { selectedUser } from "../../components/redux/actions/userActions";
import {
  setMessage,
  removeMessage,
} from "../../components/redux/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    width: "100%",
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const message = useSelector((state) => state.messages.messages);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeMessage());
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

    // send data to django
    if (user && pass) {
      const userData = {
        user_name: user,
        user_password: pass,
        is_admin: isAdmin,
      };

      axios.post("http://127.0.0.1:8000/check_user/", userData).then((res) => {
        if (res.data === "Found") {
          dispatch(selectedUser(userData));
          history.push({
            pathname: "/",
          });
        } else {
          const data = [
            {
              open: true,
              messageType: "error",
              message: "Invalid credentials",
            },
          ];
          dispatch(setMessage(data));
        }
      });
    }
  };

  return (
    <Container className={classes.container}>
      <span className={classes.heading}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      </span>
      <Typography variant="h5" className={classes.heading}>
        Sign in
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          name="user"
          label="User Name"
          type="text"
          variant="outlined"
          value={user}
          required
          className={classes.input}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          name="pass"
          label="Password"
          type="password"
          variant="outlined"
          value={pass}
          required
          className={classes.input}
          onChange={(e) => setPass(e.target.value)}
        />

        <Button
          variant="contained"
          color="secondary"
          className={classes.input}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Link to="/forgot-password" className={classes.link}>
          Forgot password
        </Link>
        <Link to="/register" className={classes.link}>
          Don't have an account? Sign Up
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

export default Login;
