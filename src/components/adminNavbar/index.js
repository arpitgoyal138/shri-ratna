import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AdminMenuItems } from "./../menuItems";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import UserImage from "./../../assets/images/user.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
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
  menuItemLink: {
    color: "darkslategray",
  },
  muiMenuIcon: {
    fontSize: "1.2rem",
    minWidth: "35px",
  },
  muiIcon: {
    fontSize: "2rem",
  },
  muiHeaderBgColor: {
    backgroundColor: "var(--primaryColorDark)",
  },
  menuHeader: {
    padding: "10px",
    // backgroundColor: "darkGray",
    textAlign: "center",
  },
  menuSidebarAvatar: {
    display: "inline-block",
    height: "70px",
    width: "70px",
  },
  menuNavbarAvatar: {
    display: "inline-block",
  },
}));
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function AdminNavbar() {
  const { currentUser } = useSelector(mapState);
  // console.log("current:", currentUser);
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
      <AppBar className={classes.muiHeaderBgColor} position="fixed">
        <Toolbar>
          <React.Fragment>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer()}
            >
              <MenuIcon className={classes.muiIcon} />
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
                <div className={classes.menuHeader}>
                  <Avatar
                    className={classes.menuSidebarAvatar}
                    alt={currentUser.displayName}
                    src={currentUser.photoURL || UserImage}
                  />
                  <div>{currentUser.displayName}</div>
                </div>
                <List>
                  <Link className={classes.menuItemLink} to="/">
                    <ListItem button>
                      <ListItemIcon className={classes.muiMenuIcon}>
                        <i className="fas fa-store"></i>
                      </ListItemIcon>
                      <ListItemText primary="Go to website" />
                    </ListItem>
                  </Link>
                  <Divider />
                  {AdminMenuItems.map((item, index) => (
                    <Link
                      className={classes.menuItemLink}
                      to={item.url}
                      key={index}
                    >
                      <ListItem button>
                        <ListItemIcon className={classes.muiMenuIcon}>
                          <i className={item.icon}></i>
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </Link>
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
                {/* <AccountCircle className={classes.muiIcon} /> */}
                <Avatar
                  alt={currentUser.displayName}
                  src={currentUser.photoURL || UserImage}
                />
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
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
