import React, { useState } from "react";
import { Typography, Grid, Menu, MenuItem } from "@mui/material";
import styles from "./header.style";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { withStyles } from "@mui/styles";
import { withRouter, useLocation } from "react-router-dom";
import moment from "moment";

const Header = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation().pathname;

  const showHeader =
    location.startsWith("/login") ||
    location.startsWith("/register") ||
    location.startsWith("/admin/login")
      ? false
      : true;

  return !showHeader ? null : (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.outerHeader}
    >
      <>
        <Grid item>
          <Typography className={classes.title}>
            {location
              .substring(location.lastIndexOf("/") + 1)
              .split("-")
              .join(" ")}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="space-between">
            <Typography>
              <span
                style={{ color: "#FFE974", margin: "auto 10px", fontSize: 12 }}
              >
                {JSON.parse(localStorage.getItem("loginData")).first_name}{" "}
                {JSON.parse(localStorage.getItem("loginData")).last_name}
              </span>
              <span
                style={{
                  color: "#C5B1FF",
                  margin: "auto 10px",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                {localStorage.getItem("userType") === "admin"
                  ? "Role: Admin"
                  : JSON.parse(localStorage.getItem("loginData")).username}
              </span>
              <span
                style={{ color: "#FFF", margin: "auto 10px", fontSize: 13 }}
              >
                Last Login:{" "}
                {moment(
                  JSON.parse(localStorage.getItem("loginData")).last_login
                ).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </Typography>
            {/* <NotificationsNoneIcon style={{ color: "#FFF", fontSize: 25 }} /> */}
          </Grid>
        </Grid>
        {/* <Grid item>
        <Grid
          container
          alignItems="center"
          style={{ cursor: "pointer" }}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <Typography
            className={classes.menuProfile}
            style={{ marginRight: 15, color: "#26184D" }}
          >
            Shiva Kumar
          </Typography>
          <Typography className={classes.initialName}> SK</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          classes={{
            paper: classes.menuOuter,
          }}
        >
          <Grid container direction="column" className={classes.menuInner}>
            <Typography className={classes.menuProfile}>Shiva Kumar</Typography>
            <Typography className={classes.menuEmail}>
              shivakumar@gmail.com
            </Typography>
          </Grid>
          <MenuItem className={classes.menuItem}>Logout</MenuItem>
        </Menu>
      </Grid> */}
      </>
    </Grid>
  );
};

export default withRouter(withStyles(styles)(Header));
