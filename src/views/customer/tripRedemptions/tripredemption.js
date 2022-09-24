import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Redirect } from "react-router-dom";
import AreaGraph from "../../../customComponents/areaGraph";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import styles from "../../admin/payouts/payouts.style";
import CustomSpinner from "../../../customComponents/spinner";
import * as XLSX from "xlsx";
import moment from "moment";

const Payouts = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchBy, setSearchBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [myTrips, setMyTrips] = useState(null);
  const [redeemInfo, setRedeemInfo] = useState(null);
  const [tripRepurchase, setTripRepurchase] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const getTripRedemption = async () => {
    const username = JSON.parse(localStorage.getItem("loginData"))?.username;

    let tripRedeemInfo = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.GETREDEEMTRIP}?user__username=${username}&approved=false&redeem=true`,
    });
    if (
      tripRedeemInfo?.status === "401" ||
      tripRedeemInfo?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    setTripRedemptionData(tripRedeemInfo);
    setLoading(false);
  };

  const setTripRedemptionData = (data) => {
    const content = data?.map((t) => {
      return {
        id: t?.id,
        name: t?.package_selected?.name,
        code: t?.package_selected?.package_id,
        type: t?.package_selected?.category,
        trip_start_date: t?.trip_start_date,
        trip_end_date: t?.trip_end_date,
        no_of_adults: t?.number_of_adults,
        no_of_children: t?.number_of_children,
        netAmt: t?.package_selected?.price,
        approved_on: moment(t?.trip?.approved_on).format("YYYY-MM-DD"),
      };
    });
    setRedeemInfo(content);
  };

  const getTrips = async () => {
    const username = JSON.parse(localStorage.getItem("loginData"))?.username;

    let trips = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TRIPDETAILS + `?trip__user__username=${username}`,
    });
    if (trips) {
      setMyTripsData(trips);
      setLoading(false);
    }
  };

  const setMyTripsData = (data) => {
    const content = data?.map((t) => {
      return {
        id: t?.id,
        dt: moment(t?.requested_on).format("YYYY-MM-DD"),
        name: t?.package_selected?.name,
        code: t?.package_selected?.package_id,
        type: t?.package_selected?.category,
        trip_start_date: t?.trip_start_date,
        trip_end_date: t?.trip_end_date,
        no_of_adults: t?.number_of_adults,
        no_of_children: t?.number_of_children,
        netAmt: t?.package_selected?.price,
        redemdate: t?.redeemed_on,
        bv: t?.package_selected?.bv,
        status: t?.approved ? "Approved" : "On Hold",
        redeemed: t?.redeemed ? "Redeemed" : "On Hold",
        approved_on: moment(t?.trip?.approved_on).format("YYYY-MM-DD"),
      };
    });
    setMyTrips(content);
  };

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
  };

  const exportToExcel = (data, type) => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, type);
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(
      workBook,
      `${type} - ${
        new Date().getFullYear() +
        " - " +
        (new Date().getMonth() + 1) +
        " - " +
        new Date().getDate()
      }.xlsx`
    );
  };

  useEffect(() => {
    getTripRedemption();
    getTrips();
  }, []);

  if (redirect) {
    return <Redirect push to="/login" />;
  }

  return (
    <>
      {loading ? (
        <Grid
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomSpinner />
        </Grid>
      ) : (
        <Grid className={classes.outerContainer}>
          <Grid className={classes.tabContainer}>
            <Tabs
              labels={[
                "My Trips",
                "Redeem Trip Information",
                // "My Trip Repurchase",
              ]}
              tabChange={tabChange}
              value={currentTab}
            />
          </Grid>

          <Grid className={classes.tableContainer}>
            {currentTab === 0 ? (
              <>
                <Table
                  header={[
                    "",
                    "#",
                    "Date",
                    "Trip Name",
                    "Trip Code",
                    "Trip Type",
                    "Trip Start Date",
                    "Trip End Date",
                    "No of Adults",
                    "No of Children",
                    "Net Amount",
                    "Redemption Date",
                    "Total BV",
                    "Request Status",
                    "Redeem Status",
                    "Approved On",
                  ]}
                  data={myTrips}
                  title={"MY TRIPS REPORT"}
                  subtitle={"Reports on your trips"}
                  showMenuOptions={true}
                  showPagination={true}
                  getUserDetails={getTrips}
                  menuOptions={["Redeem Trip"]}
                  showFilterButton={true}
                  filterType={"User Trips"}
                  dataURL={`${URLS.GETREDEEMTRIP}?user__username=${
                    JSON.parse(localStorage.getItem("loginData"))?.username
                  }`}
                  setData={setTripRedemptionData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(myTrips, "trip-reports")
                  }
                />
              </>
            ) : currentTab === 1 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Trip Name",
                    "Trip Code",
                    "Trip Type",
                    "Trip Start Date",
                    "Trip End Date",
                    "No of Adults",
                    "No of Children",
                    "Net Amount",
                    "Approved On",
                  ]}
                  data={redeemInfo}
                  title={"REDEEM TRIP INFORMATION"}
                  subtitle={"Information on the trips you have redeemed"}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"User Trips"}
                  dataURL={`${URLS.GETREDEEMTRIP}?user__username=${
                    JSON.parse(localStorage.getItem("loginData"))?.username
                  }&approved=true&redeem=false`}
                  setData={setTripRedemptionData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(redeemInfo, "redeem-trip-info")
                  }
                />
              </>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withStyles(styles)(Payouts);
