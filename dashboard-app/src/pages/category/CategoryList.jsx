import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { IconButton, TextField, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddBoxIcon from "@material-ui/icons/AddBox";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  deleteCategory,
} from "../../components/redux/actions/categoryActions";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { CSVLink } from "react-csv";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  setMessage,
  removeMessage,
} from "../../components/redux/actions/messageActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "category_name", label: "Category Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 100 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    padding: theme.spacing(10),
    maxHeight: 600,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  heading: {
    display: "flex",
    paddingLeft: "10px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  searchbar: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  input: {
    display: "flex",
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  delete: {
    "&:hover": {
      cursor: "pointer",
    },
    color: "none",
  },
  link: {
    color: "black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
}));

export default function CategoryList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [searchTerms, setSearchTerms] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const categories = useSelector((state) => {
    return state.allCategories.category;
  });

  const message = useSelector((state) => state.messages.messages);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeMessage());
  };

  const fetchCategories = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/all_category/")
      .catch((err) => console.log(err));
    dispatch(setCategory(response.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setSearchTerms(e.target.value);

    if (categories) {
      const results = categories.filter((cat) =>
        cat.category_name.toLowerCase().includes(e.target.value)
      );
      setSearchResults(results);
    }
  };

  let category = [];
  if (searchTerms) {
    category = searchResults;
  } else {
    category = categories;
  }

  const headers = [
    { label: "ID", key: "id" },
    { label: "Category Name", key: "category_name" },
    { label: "Description", key: "description" },
  ];

  const csvReport = {
    filename: "Category.csv",
    headers: headers,
    data: categories,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //delete handler
  const deleteHandler = (id) => {
    const deleteCat = async () => {
      const response = await axios
        .delete("http://127.0.0.1:8000/delete_category/" + id)
        .catch((err) => console.log(err));
    };

    deleteCat();
    const data = [
      {
        open: true,
        messageType: "success",
        message: "Data deleted successfully",
      },
    ];
    dispatch(setMessage(data));
    dispatch(deleteCategory(id));
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        Category List
      </Typography>
      <div className={classes.searchbar}>
        <TextField
          name="search"
          label="Search category"
          type="text"
          onChange={handleChange}
          value={searchTerms}
          className={classes.input}
        />

        <IconButton className={classes.add}>
          <Link to="/add-category">
            <AddBoxIcon fontSize="large" className={classes.link} />
          </Link>
        </IconButton>
        <IconButton className={classes.csv}>
          {categories && (
            <div className="nav-link">
              <CSVLink {...csvReport}>
                <CloudDownloadIcon fontSize="large" className={classes.link} />
              </CSVLink>
            </div>
          )}
        </IconButton>
      </div>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {category
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <Link
                          to={`/edit-category/${row.id}`}
                          className={classes.link}
                        >
                          <EditIcon size={20} />
                        </Link>

                        <DeleteOutlineIcon
                          className={classes.delete}
                          size={20}
                          onClick={() => deleteHandler(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
    </div>
  );
}
