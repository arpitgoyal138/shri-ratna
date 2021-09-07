import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AdminMenuItems } from "./../menuItems";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function AdminNavbar() {
  const { currentUser } = useSelector(mapState);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <React.Fragment>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>

            <SwipeableDrawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer()}
              onOpen={toggleDrawer()}
            >
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer()}
                onKeyDown={toggleDrawer()}
              >
                <List>
                  {AdminMenuItems.map((item, index) => (
                    <a href={item.url}>
                      <ListItem button key={index}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </a>
                  ))}
                </List>
              </div>
            </SwipeableDrawer>
          </React.Fragment>

          <Typography variant="h6" className={classes.title}>
            Admin
          </Typography>
          {
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openUserMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
                {/* {AdminMenuItems.map((item, index) => {
                  return (
                    <MenuItem key={index} onClick={handleClose}>
                      {item.title}
                    </MenuItem>
                  );
                })} */}
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
