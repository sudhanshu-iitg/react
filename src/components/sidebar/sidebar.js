import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { allRequestHandler } from "../../api/index";
import { URLS } from "../../constants/index";
import { Link, useLocation } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./sidebar.style";
import DashboardIcon from "../../assets/dashboardIcon.svg";
import MenuIcon from "@mui/icons-material/Menu";
import PayoutsIcon from "../../assets/payoutsIcon.svg";
import GeneologyIcon from "../../assets/geneologyIcon.svg";
import UsersIcon from "../../assets/usersIcon.svg";
import OrderIcon from "../../assets/orderSidebar.svg";
import TripRequestsIcon from "../../assets/tripsReqIcon.svg";
import SupportTicketIcon from "../../assets/supportIcon.svg";
import CustomButton from "../../customComponents/primaryButton";
import StaffUsersIcon from "../../assets/staffIcon.svg";
import CompanyFinancialsIcon from "../../assets/companyIcon.svg";
import TripPackagesIcon from "../../assets/tripPackIcon.svg";
import ProfileIcon from "../../assets/profileIcon.svg";
import PromotionalMaterialsIcon from "../../assets/promotionIcon.svg";
import SettingsIcon from "../../assets/settingsIcon.svg";
import { Redirect } from "react-router-dom";
import ConfirmationModal from "../../customComponents/modal";
const drawerWidth = 250;

const Sidebar = ({ classes }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const path = window.location.pathname;

  const Nav = ({ name, pathname, icon }) => {
    return (
      <Link to={pathname} style={{ textDecoration: "none" }}>
        <div
          className={classes.sidebarLink}
          style={{
            borderLeft: path === pathname ? "4px solid #FFE660" : "unset",
            background: path === pathname ? "rgba(255, 230, 96, 0.2)" : "unset",
          }}
        >
          <img src={icon} alt="" className={classes.sidebarIcons} />
          <Typography
            className={classes.sidebarTypography}
            style={{ color: "#ccc" }}
          >
            {name}
          </Typography>
        </div>
      </Link>
    );
  };

  const AdminNav = (
    <>
      <Nav name="Dashboard" pathname="/admin/dashboard" icon={DashboardIcon} />
      <Nav name="Payouts" pathname="/admin/payouts" icon={PayoutsIcon} />
      <Nav name="Geneology" pathname="/admin/geneology" icon={GeneologyIcon} />
      <Nav name="Users" pathname="/admin/users" icon={UsersIcon} />
      <Nav name="Orders" pathname="/admin/orders" icon={OrderIcon} />
      <Nav
        name="Trip Requests"
        pathname="/admin/trip-requests"
        icon={TripRequestsIcon}
      />
      <Nav
        name="Payouts History"
        pathname="/admin/payout-history"
        icon={PayoutsIcon}
      />
      {/* <Nav
        name="Support Tickets"
        pathname="/admin/support-tickets"
        icon={SupportTicketIcon}
      />*/}
      <Nav
        name="Staff Users"
        pathname="/admin/staff-users"
        icon={StaffUsersIcon}
      />
      {/* <Nav
            name="Company Financials"
            pathname="/admin/company-financials"
            icon={CompanyFinancialsIcon}
          /> */}
      <Nav
        name="Trip Packages"
        pathname="/admin/trip-packages"
        icon={TripPackagesIcon}
      />
      <Nav
        name="Promotional Material"
        pathname="/admin/promotional-materials"
        icon={PromotionalMaterialsIcon}
      />
      <Nav name="Settings" pathname="/admin/settings" icon={SettingsIcon} />
    </>
  );

  const CustomerNav = (
    <>
      <Nav name="Dashboard" pathname="/dashboard" icon={DashboardIcon} />
      <Nav name="Profile" pathname="/profile" icon={ProfileIcon} />
      <Nav name="Orders" pathname="/orders" icon={OrderIcon} />
      <Nav name="Geneology" pathname="/geneology" icon={GeneologyIcon} />
      <Nav name="Payouts History" pathname="/payouts" icon={PayoutsIcon} />
      <Nav
        name="Trip Redemption"
        pathname="/trip-redemptions"
        icon={TripRequestsIcon}
      />
      <Nav
        name="Promotional Material"
        pathname="/promotional-materials"
        icon={PromotionalMaterialsIcon}
      />
      <Nav name="Settings" pathname="/settings" icon={SettingsIcon} />
    </>
  );
  const logout = async () => {
    let log = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.LOGOUT,
    });
    if (log.response === "User logged out") {
      setRedirect(true);
    }
  };
  const location = useLocation().pathname;
  if (redirect) {
    return sessionStorage.userType === "admin" ? (
      <Redirect push to="/admin/login" />
    ) : (
      <Redirect push to="/login" />
    );
  }

  const setRestrictions = () => {
    if (JSON.parse(localStorage.getItem("loginData")).is_admin) {
      return AdminNav;
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Trips"
    ) {
      return (
        <Nav
          name="Trip Requests"
          pathname="/admin/trip-requests"
          icon={TripRequestsIcon}
        />
      );
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Payouts"
    ) {
      return (
        <>
          <Nav name="Payouts" pathname="/admin/payouts" icon={PayoutsIcon} />
          <Nav
            name="Payouts History"
            pathname="/admin/payout-history"
            icon={PayoutsIcon}
          />
        </>
      );
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Activation"
    ) {
      return <Nav name="Users" pathname="/admin/users" icon={UsersIcon} />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(97% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: "none" },
            background: "transperant",
          }}
        >
          <Toolbar style={{ background: "#292929" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: "rgba(255, 230, 99, 1)",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{
                textTransform: "capitalize",
                color: "#FFF",
                fontSize: 18,
              }}
            >
              {location
                .substring(location.lastIndexOf("/") + 1)
                .split("-")
                .join(" ")}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#242424",
              border: "2px solid rgba(233, 197, 71, 0.2)",
            },
          }}
        >
          <Typography className={classes.logo}>
            Ripship Worldventures Web
          </Typography>
          {/* {AdminNav} */}

          {sessionStorage.userType === "admin"
            ? setRestrictions()
            : CustomerNav}
          <CustomButton
            text="Logout"
            startIcon={<LogoutIcon style={{ color: "#fff" }} />}
            style={{
              margin: "20px auto",
              textAlign: "center",
              padding: "22px",
              background: "#B096FB",
              color: "#FFF",
              borderRadius: 10,
              fontWeight: 700,
            }}
            onClick={handleOpen}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#242424",

              border: "2px solid rgba(233, 197, 71, 0.2)",
              boxShadow: `10.3472px 11.4969px 72.4307px rgba(0, 0, 0, 0.24)`,
            },
          }}
          open
        >
          <Typography className={classes.logo}>
            Ripship Worldventures Web
          </Typography>

          {/* {AdminNav} */}
          {sessionStorage.userType === "admin"
            ? setRestrictions()
            : CustomerNav}
          <CustomButton
            text="Logout"
            startIcon={<LogoutIcon style={{ color: "#fff" }} />}
            style={{
              margin: "20px auto",
              textAlign: "center",
              padding: "22px",
              background: "#B096FB",
              color: "#FFF",
              borderRadius: 10,
              fontWeight: 700,
            }}
            onClick={handleOpen}
          />
        </Drawer>
      </Box>
      <ConfirmationModal
        confirmationHeading={"Confirm Log out"}
        confirmationMessage={"Are you sure want to logout"}
        open={open}
        handleOnClickTitle={"Logout"}
        handleOnClick={logout}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default withStyles(styles)(Sidebar);
