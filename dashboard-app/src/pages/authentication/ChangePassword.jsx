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
import {
  removeSelectedUser,
  setUser,
} from "../../components/redux/actions/userActions";

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

const ChangePassword = () => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const message = useSelector((state) => state.messages.messages);
  const user_name = useSelector((state) => state.allUsers.users.user_name);

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

    if (!pass || !oldPass || !confirmPass) {
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
      user_name: user_name,
      old_password: oldPass,
      user_password: pass,
    };

    //console.log(userData);

    const update = async () => {
      const response = await axios
        .put("http://127.0.0.1:8000/change_password/", userData)
        .catch((err) => console.log(err));

      //dispatch(addUser(response.data));
    };

    if (userData) {
      update();
      //dispatch(addUser(userData));
      const data = [
        {
          open: true,
          messageType: "success",
          message: "Password updated successfully",
        },
      ];
      dispatch(setMessage(data));
      history.push("/login");
    }
  };
  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.heading}>
          Change Password
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            name="user"
            label="User Name"
            type="text"
            variant="outlined"
            onChange={(e) => setUser(e.target.value)}
            required
            className={classes.input}
            disabled
            value={user_name && user_name}
          />
          <TextField
            name="oldpassword"
            label="Old Password"
            type="password"
            variant="outlined"
            onChange={(e) => setOldPass(e.target.value)}
            required
            className={classes.input}
          />
          <TextField
            name="userpass"
            label="New Password"
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
            Update
          </Button>
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
    </>
  );
};

export default ChangePassword;
