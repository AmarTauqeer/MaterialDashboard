import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedUser, setUser } from "./redux/actions/userActions";
import ProfileMenu from "./ProfileMenu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoL: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoS: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const user_name = useSelector((state) => state.allUsers.users.user_name);
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoL}>
            Admin Dashboard
          </Typography>
          <Typography variant="h6" className={classes.logoS}>
            Dashboard
          </Typography>
          <div className={classes.userinfo}>
            {user_name && (
              <>
                <ProfileMenu />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
