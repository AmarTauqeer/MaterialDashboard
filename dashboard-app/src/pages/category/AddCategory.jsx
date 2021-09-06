import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../components/redux/actions/categoryActions";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  setMessage,
  removeMessage,
} from "../../components/redux/actions/messageActions";

import {
  TextField,
  Container,
  makeStyles,
  Typography,
  Button,
  Breadcrumbs,
} from "@material-ui/core";

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
}));

const AddCategory = () => {
  const classes = useStyles();

  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();

  const message = useSelector((state) => state.messages.messages);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeMessage());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catName || !description) {
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

    const categoryData = {
      category_name: catName,
      description: description,
    };

    const add = async () => {
      const response = await axios
        .post("http://127.0.0.1:8000/add_category/", categoryData)
        .catch((err) => console.log(err));
      dispatch(addCategory(response.data));
    };

    if (categoryData) {
      add();
      const data = [
        {
          open: true,
          messageType: "success",
          message: "Data saved successfully",
        },
      ];
      dispatch(setMessage(data));
      dispatch(addCategory(categoryData));
      history.push("/category");
    }
  };

  return (
    <Container className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/category">
          Category
        </Link>
        <Typography color="textPrimary">Add category</Typography>
      </Breadcrumbs>

      <Typography variant="h5" className={classes.heading}>
        Add Category
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          name="catName"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          label="Category Name"
          type="text"
          variant="outlined"
          required
          className={classes.input}
        />
        <TextField
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          type="text"
          variant="outlined"
          required
          className={classes.input}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.input}
          onClick={handleSubmit}
        >
          Submit
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
  );
};

export default AddCategory;
