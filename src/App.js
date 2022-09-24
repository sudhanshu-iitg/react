import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import CustomerLogin from "./components/auth/customer/customer_login";
import ForgotPassword from "./components/auth/forgotPassword/forgotPassword";
import CustomerRegister from "./components/auth/customer/customer_register";
import AdminLogin from "./components/auth/admin/admin_login";
import AdminDashboard from "./views/admin/dashboard/dashboard";
import Payouts from "./views/admin/payouts/payouts";
import PayoutsHistory from "./views/admin/payouts/payoutsHistory";
import Geneology from "./views/admin/geneology/genelogy";
import Users from "./views/admin/users/users";
import TripRequests from "./views/admin/tripRequests/tripRequests";
import SupportTickets from "./views/admin/supportTickets/supportTickets";
import StaffUsers from "./views/admin/staffUsers/staffUsers";
import TripPackages from "./views/admin/tripPackages/tripPackages";
import PromotionalMaterials from "./views/admin/promotionalMaterials/promotionalMaterials";
import Settings from "./views/admin/settings/settings";
import AdminOrders from "./views/admin/orders/orders";
//Customer
import CustomerDashboard from "./views/customer/dashboard/dashboard";
import Profile from "./views/customer/profile/profile";
import Orders from "./views/customer/orders/orders";
import CustomerGeneology from "./views/customer/geneology/geneology";
import CustomerPayouts from "./views/customer/payouts/payouts";
import TripRedemption from "./views/customer/tripRedemptions/tripredemption";
import ConfirmPayment from "./views/customer/orders/orderConfirm";
import CustomerPromotionalMaterials from "./views/customer/PromotionalMaterials/promotionalMaterials";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import CustomerSetting from "./views/customer/settings/settings";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E9C547",
      light: "#B096FB",
      dark: "#ffeb7d",
    },
    error: {
      main: "#E57777",
      light: "#E75A5A",
      dark: "#C91E1E",
    },
    info: {
      main: "#659BED",
      light: "#5A5FE7",
      dark: "#2D7EF9",
    },
    success: {
      main: "#5FE775",
      light: "#40E25B",
      dark: "#1EC93A",
    },
  },
  typography: {
    fontFamily: "Oxygen",
    color: "#ffeb7d",
  },
  multilineColor: {
    color: "red",
  },
});

const App = () => {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <div>
            <Route exact path="/login" render={() => <CustomerLogin />} />
            <Route
              exact
              path="/forgot-password"
              render={() => <ForgotPassword />}
            />
            <Route path="/register" render={() => <CustomerRegister />} />
            <Route exact path="/admin/login" render={() => <AdminLogin />} />

            <Grid
              container
              style={
                {
                  // height: "auto",
                  // background: "#292929",
                  // minHeight: "100vh",
                }
              }
            >
              <Grid item>
                <Route
                  exact
                  path="/admin/dashboard"
                  render={() => <Sidebar />}
                />
                <Route exact path="/admin/payouts" render={() => <Sidebar />} />
                <Route
                  exact
                  path="/admin/payout-history"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/geneology"
                  render={() => <Sidebar />}
                />
                <Route exact path="/admin/users" render={() => <Sidebar />} />
                <Route exact path="/admin/orders" render={() => <Sidebar />} />
                <Route
                  exact
                  path="/admin/trip-requests"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/support-tickets"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/staff-users"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/company-financials"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/trip-packages"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/promotional-materials"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/admin/settings"
                  render={() => <Sidebar />}
                />
                <Route exact path="/dashboard" render={() => <Sidebar />} />

                <Route exact path="/profile" render={() => <Sidebar />} />
                <Route exact path="/orders" render={() => <Sidebar />} />
                <Route exact path="/geneology" render={() => <Sidebar />} />
                <Route exact path="/payouts" render={() => <Sidebar />} />
                <Route
                  exact
                  path="/promotional-materials"
                  render={() => <Sidebar />}
                />
                <Route exact path="/settings" render={() => <Sidebar />} />
                <Route
                  exact
                  path="/trip-redemptions"
                  render={() => <Sidebar />}
                />
                <Route
                  exact
                  path="/confirmPayment"
                  render={() => <Sidebar />}
                />
              </Grid>

              <Grid
                item
                xs
                style={{
                  padding: 13,
                  height: "auto",
                  background: "#292929",
                  width: "60%",
                }}
              >
                <Route path="/" render={() => <Header />} />
                <Route
                  exact
                  path="/admin/dashboard"
                  render={() => <AdminDashboard />}
                />
                <Route
                  exact
                  path="/admin/geneology"
                  render={() => <Geneology />}
                />
                <Route exact path="/admin/payouts" render={() => <Payouts />} />
                <Route exact path="/admin/users" render={() => <Users />} />
                <Route
                  exact
                  path="/admin/orders"
                  render={() => <AdminOrders />}
                />
                <Route
                  exact
                  path="/admin/trip-requests"
                  render={() => <TripRequests />}
                />
                <Route
                  exact
                  path="/admin/payout-history"
                  render={() => <PayoutsHistory />}
                />
                <Route
                  exact
                  path="/admin/support-tickets"
                  render={() => <SupportTickets />}
                />
                <Route
                  exact
                  path="/admin/staff-users"
                  render={() => <StaffUsers />}
                />
                <Route
                  exact
                  path="/admin/trip-packages"
                  render={() => <TripPackages />}
                />
                <Route
                  exact
                  path="/admin/promotional-materials"
                  render={() => <PromotionalMaterials />}
                />
                <Route
                  exact
                  path="/admin/settings"
                  render={() => <Settings />}
                />
                <Route
                  exact
                  path="/dashboard"
                  render={() => <CustomerDashboard />}
                />
                <Route exact path="/profile" render={() => <Profile />} />
                <Route exact path="/orders" render={() => <Orders />} />
                <Route
                  exact
                  path="/geneology"
                  render={() => <CustomerGeneology />}
                />
                <Route
                  exact
                  path="/payouts"
                  render={() => <CustomerPayouts />}
                />
                <Route
                  exact
                  path="/trip-redemptions"
                  render={() => <TripRedemption />}
                />
                <Route
                  exact
                  path="/promotional-materials"
                  render={() => <CustomerPromotionalMaterials />}
                />
                <Route
                  exact
                  path="/settings"
                  render={() => <CustomerSetting />}
                />
                <Route
                  exact
                  path="/confirmPayment"
                  render={() => <ConfirmPayment />}
                />
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </Switch>
    </Router>
  );
};

export default App;
