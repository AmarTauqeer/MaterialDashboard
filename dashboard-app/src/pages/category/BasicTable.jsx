import React from "react";
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
import {
  IconButton,
  InputBase,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(id, name, description, action) {
  return { id, name, description, action };
}

const rows = [
  createData("1", "Fruites", "f description", "button"),
  createData("2", "Fruites", "f description", "button"),
  createData("3", "Fruites", "f description", "button"),
  createData("4", "Fruites", "f description", "button"),
  createData("5", "Fruites", "f description", "button"),
  createData("6", "Fruites", "f description", "button"),
  createData("7", "Fruites", "f description", "button"),
  createData("8", "Fruites", "f description", "button"),
  createData("9", "Fruites", "f description", "button"),
  createData("10", "Fruites", "f description", "button"),
  createData("11", "Fruites", "f description", "button"),
  createData("12", "Fruites", "f description", "button"),
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
    padding: "5px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  input: {
    display: "flex",
    width: "50%",
  },
  add: {
    backgroundColor: "lightblue",
  },
  csv: {
    backgroundColor: "lightgreen",
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          className={classes.input}
        />
        <IconButton className={classes.add}>
          <AddIcon fontSize="inherit" />
        </IconButton>
        <IconButton className={classes.csv}>
          <CloudDownloadIcon fontSize="inherit" />
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
