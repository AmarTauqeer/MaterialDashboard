import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useSelector, useDispatch } from "react-redux";
import { removeSelectedUser, setUser } from "./redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
    position: "sticky",
    top: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(4),
      cursor: "Pointer",
    },
  },
  text: {
    fontWeight: 500,
    color: "inherit",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "22px",
      color: "#555",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  const user_name = useSelector((state) => state.allUsers.users.user_name);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeSelectedUser());
    history.push("/login");
  };

  return (
    <Container className={classes.container}>
      {user_name && (
        <>
          <Link to="/" className={classes.link}>
            <div className={classes.item}>
              <HomeIcon className={classes.icon} />
              <Typography className={classes.text}>Home</Typography>
            </div>
          </Link>
          <Link to="/category" className={classes.link}>
            <div className={classes.item}>
              <ListIcon className={classes.icon} />
              <Typography className={classes.text}>Category</Typography>
            </div>
          </Link>

          <Link to="/contact" className={classes.link}>
            <div className={classes.item}>
              <ContactMailIcon className={classes.icon} />
              <Typography className={classes.text}>Contact</Typography>
            </div>
          </Link>

          <div className={classes.item}>
            <ExitToAppIcon className={classes.icon} />
            <Typography className={classes.text} onClick={handleClick}>
              Sign out
            </Typography>
          </div>
        </>
      )}
      {!user_name && (
        <>
          <Link to="/" className={classes.link}>
            <div className={classes.item}>
              <HomeIcon className={classes.icon} />
              <Typography className={classes.text}>Home</Typography>
            </div>
          </Link>
          <Link to="/contact" className={classes.link}>
            <div className={classes.item}>
              <ContactMailIcon className={classes.icon} />
              <Typography className={classes.text}>Contact</Typography>
            </div>
          </Link>

          <Link to="/register" className={classes.link}>
            <div className={classes.item}>
              <AccountCircleIcon className={classes.icon} />
              <Typography className={classes.text}>Sign up</Typography>
            </div>
          </Link>

          <Link to="/login" className={classes.link}>
            <div className={classes.item}>
              <VpnKeyIcon className={classes.icon} />
              <Typography className={classes.text}>Sign in</Typography>
            </div>
          </Link>
        </>
      )}
    </Container>
  );
};

export default Sidebar;
