import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MetricCard from "../../../customComponents/metricCard";
import List from "../../../customComponents/list";
import BarGraph from "../../../customComponents/barGraph";
import CustomSpinner from "../../../customComponents/spinner";
import userCard from "../../../assets/usersCard.svg";
import activeUserCard from "../../../assets/activeUserCard.svg";
import blockedUserCard from "../../../assets/blockedUserCard.svg";
import pendingUserCard from "../../../assets/pendingPayoutsCard.svg";
import pendingTripReqCard from "../../../assets/pendingTripRequestCard.svg";
import pendingActivationCard from "../../../assets/pendingActivationCard.svg";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import moment from "moment";
import { withStyles } from "@mui/styles";
import styles from "./dashboard.style";
import { useHistory, Redirect } from "react-router-dom";

const Dashboard = ({ classes }) => {
  const [metricCards, setMetricCards] = useState(null);
  const [recentRegistration, setRecentRegistration] = useState(null);
  const [recentActivations, setRecentActivations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const [dashboardGraphData, setDashboardGraphData] = useState(null);

  const getDashboardDetails = async () => {
    let dashboardDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.ADMINDASHBOARD,
    });

    if (dashboardDetails) {
      setLoading(false);
      setMetricCards(dashboardDetails.data);
      setRecentRegistration(dashboardDetails?.data?.recent_registrations);
      setRecentActivations(dashboardDetails?.data?.recently_activated);
    }
    if (
      dashboardDetails?.status === "401" ||
      dashboardDetails?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
  };

  const metricCardArray = [
    {
      name: "Total Users",
      amount: metricCards?.total_users || 0,
      src: userCard,
    },
    {
      name: "Active Users",
      amount: metricCards?.activate_users || 0,
      src: activeUserCard,
    },
    {
      name: "Blocked Users",
      amount: metricCards?.blocked_users || 0,
      src: blockedUserCard,
    },
    {
      name: "Pending Payouts",
      amount: metricCards?.pending_payouts || 0,
      src: pendingUserCard,
    },
    {
      name: "PENDING TRIP REQUESTS",
      amount: metricCards?.pending_trips || 0,
      src: pendingTripReqCard,
    },
    {
      name: "PENDING User Activations",
      amount: metricCards?.pending_user || 0,
      src: pendingActivationCard,
    },
  ];

  const recentRegsitrationsList = recentRegistration?.map((reg) => {
    return {
      id: reg.sponsor_id,
      name: reg.first_name + "  " + reg.last_name + ` (` + reg.username + ")",
      date: moment(reg.date_joined).format("DD/MM/YYYY"),
    };
  });

  const recentActivationList = recentActivations?.map((activation) => {
    return {
      id: activation.sponsor_id,
      name:
        activation.first_name +
        "  " +
        activation.last_name +
        ` (` +
        activation.username +
        ")",
      date: moment(activation.date_joined).format("DD/MM/YYYY"),
    };
  });

  const getGraphData = async (type, subType) => {
    const graph = {
      graph_for: "admin",
      type: type,
      sub_type: subType,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    const graphData = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GRAPH,
      requestData: graph,
    });
    if (graphData) {
      const content = graphData?.map((p, index) => {
        return {
          sum: p?.sum,
          date: moment(
            `${new Date().getMonth() + 1}-${p?.day}-${new Date().getFullYear()}`
          ).format("DD-MMM"),
        };
      });
      setDashboardGraphData(content);
    }
  };

  useEffect(() => {
    getDashboardDetails();
    getGraphData("users", "registration");
    // window.onload(history.go(0));
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
  }
  return (
    <>
      {loading ? (
        <Grid className={classes.spinnerContainer}>
          <CustomSpinner />
        </Grid>
      ) : (
        <Grid className={classes.outerContainer}>
          <Grid className={classes.cardList}>
            {metricCardArray.map((card) => {
              return (
                <MetricCard
                  title={card.name}
                  amount={card.amount}
                  icon={card.src}
                />
              );
            })}
          </Grid>
          <Grid className={classes.listContainer}>
            <List
              title={"Recent 5 Registrations"}
              listItems={recentRegsitrationsList}
            />
            <List
              title={"Recent 5 User Activations"}
              listItems={recentActivationList}
            />
          </Grid>
          <Grid className={classes.chartContainer}>
            <BarGraph data={dashboardGraphData} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withStyles(styles)(Dashboard);
