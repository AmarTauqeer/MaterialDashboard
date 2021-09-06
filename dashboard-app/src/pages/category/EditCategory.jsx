import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  selectedCategory,
} from "../../components/redux/actions/categoryActions";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const EditCategory = () => {
  const classes = useStyles();

  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();
  const { id } = useParams();

  const message = useSelector((state) => state.messages.messages);
  const category = useSelector((state) => state.allCategories.category);

  useEffect(() => {
    if (id && id !== null) fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    const selectedCat = category.filter((item) => item.id === parseInt(id));
    setCatName(selectedCat[0].category_name);
    setDescription(selectedCat[0].description);
    setCatId(parseInt(id));
    dispatch(selectedCategory(selectedCat));
  };

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
      id: catId,
      category_name: catName,
      description: description,
    };

    const update = async () => {
      const response = await axios
        .put(`http://127.0.0.1:8000/update_category/${catId}`, categoryData)
        .catch((err) => console.log(err));

      if (response) {
        const data = [
          {
            open: true,
            messageType: "success",
            message: "Data updated successfully",
          },
        ];
        dispatch(setMessage(data));
        dispatch(updateCategory(categoryData));
        history.push("/category");
      }
    };
    if (categoryData) {
      update();
    }
  };

  return (
    <Container className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/category">
          Category
        </Link>
        <Typography color="textPrimary">update</Typography>
      </Breadcrumbs>
      <Typography variant="h5" className={classes.heading}>
        Update Category
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
  );
};

export default EditCategory;
