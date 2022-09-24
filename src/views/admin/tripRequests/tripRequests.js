import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import styles from "./tripRequests.style";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import { useHistory, Link, Redirect, location } from "react-router-dom";
import CustomSpinner from "../../../customComponents/spinner";
import moment from "moment";
import * as XLSX from "xlsx";

const TripRequests = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [pendingTripRedemptions, setPendingTripRedemptions] = useState(null);
  const [tripReports, setTripReports] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPendingRequests = async () => {
    let pendingRequests = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TRIPS + "?approved=False&redeem=True",
    });
    if (
      pendingRequests?.status === "401" ||
      pendingRequests?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    console.log(pendingRequests);
    setPendingRequestsData(pendingRequests);
    setLoading(false);
  };

  const setPendingRequestsData = (data) => {
    const content = data?.map((user, index) => {
      return {
        id: user?.id,
        username: user?.user?.username,
        name: user?.user?.first_name + " " + user?.user?.last_name,
        mobile: user?.user?.mobile_number,
        email: user?.user?.email,
        start_date: moment(user?.trip_start_date).format("MMM Do YY"),
        end_date: moment(user?.trip_end_date).format("MMM Do YY"),
        no_of_adults: user?.number_of_adults,
        no_of_children: user?.number_of_children,
        tripid: user?.package_selected?.package_id,
        trip_name: user?.package_selected?.name,
        trip_type: user?.type,
        created_on: moment(user?.request_on).format("MMM Do YY"),
        status: user?.approved ? "Approved" : "On Hold",
        trip_status: !user?.redeemed ? "Pending" : "Trip Redemeed",
        approved_on: moment(user?.trip?.approved_on).format("YYYY-MM-DD"),
      };
    });
    setPendingRequests(content);
  };

  const getPendingRedeemRequests = async () => {
    let pendingRedeemRequests = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TRIPS + "?approved=True&redeem=False",
    });

    if (
      pendingRedeemRequests?.status === "401" ||
      pendingRedeemRequests?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    setPendingTripRedemptionsData(pendingRedeemRequests);
    setLoading(false);
  };

  const setPendingTripRedemptionsData = (data) => {
    const content = data?.map((user, index) => {
      return {
        id: user?.id,
        username: user?.user?.username,
        name: user?.user?.first_name + " " + user?.user?.last_name,
        mobile: user?.user?.mobile_number,
        email: user?.user?.email,
        start_date: moment(user?.trip_start_date).format("MMM Do YY"),
        end_date: moment(user?.trip_end_date).format("MMM Do YY"),
        tripid: user?.package_selected?.package_id,
        trip_name: user?.package_selected?.name,
        trip_type: user?.type,
        created_on: moment(user?.request_on).format("MMM Do YY"),
        status: user?.approved ? "Approved" : "On Hold",
        trip_status: !user?.redeemed ? "Pending" : "Trip Redemeed",
      };
    });
    setPendingTripRedemptions(content);
  };

  const getTripReports = async () => {
    let tripReports = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TRIPS,
    });

    if (
      tripReports?.status === "401" ||
      tripReports?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    setTripReportsData(tripReports);
    setLoading(false);
  };

  const setTripReportsData = (data) => {
    const content = data?.map((user, index) => {
      return {
        id: user?.id,
        username: user?.user?.username,
        name: user?.user?.first_name + " " + user?.user?.last_name,
        mobile: user?.user?.mobile_number,
        email: user?.user?.email,
        start_date: moment(user?.trip_start_date).format("MMM Do YY"),
        end_date: moment(user?.trip_end_date).format("MMM Do YY"),
        tripid: user?.package_selected?.package_id,
        trip_name: user?.package_selected?.name,
        price: user?.package_selected?.price,
        category: user?.package_selected?.category,
        bv: user?.package_selected?.bv,
        trip_type: user?.type,
        created_on: moment(user?.request_on).format("MMM Do YY"),
        no_adults: user?.number_of_adults,
        no_child: user?.number_of_children,
        status: user?.approved ? "Approved" : "On Hold",
        approved_on: user?.approved_on
          ? moment(user?.approved_on).format("MMM Do YY")
          : "Yet to be approved",

        trip_status: !user?.redeemed ? "Pending" : "Trip Redemeed",
      };
    });
    setTripReports(content);
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
    getPendingRequests();
    getPendingRedeemRequests();
    getTripReports();
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
  }
  return loading ? (
    <Grid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <CustomSpinner />
    </Grid>
  ) : (
    <>
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tabContainer}>
          <Tabs
            labels={[
              "Pending Requests",
              "Pending Trip Redemptions",
              "Trip Reports",
            ]}
            tabChange={tabChange}
            value={currentTab}
          />
        </Grid>
        <Grid className={classes.tableContainer}>
          {currentTab === 0 ? (
            <Table
              header={[
                "",
                "#",
                "Username",
                "Name",
                "Mobile",
                "Email",
                "Start Date",
                "End Date",
                "No of Adults",
                "No of Children",
                "Trip ID",
                "Trip Name",
                "Trip Type",
                "Created On",
                "Status",
                "Trip Status",
                "Approved On",
              ]}
              data={pendingRequests}
              title={"trip requests"}
              subtitle={"User’s pending trip requests"}
              menuOptions={["Approve Trip"]}
              showMenuOptions={true}
              showPagination={true}
              getTrips={getPendingRequests}
              showFilterButton={true}
              filterType={"Trip Requests"}
              dataURL={URLS.TRIPS + "?approved=True&redeem=False&"}
              setData={setPendingRequestsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(pendingRequests, "pending-trip-requests")
              }
            />
          ) : currentTab === 1 ? (
            <Table
              header={[
                "",
                "#",
                "Username",
                "Name",
                "Mobile",
                "Email",
                "Start Date",
                "End Date",
                "Trip ID",
                "Trip Name",
                "Trip Type",
                "Created On",
                "Status",
                "Trip Status",
              ]}
              data={pendingTripRedemptions}
              title={"PENDING TRIP REDEMPTIONS"}
              subtitle={"Users pending trip redemptions"}
              menuOptions={["Redeem trip"]}
              showMenuOptions={true}
              showPagination={true}
              getTrips={getPendingRedeemRequests}
              showFilterButton={true}
              filterType={"Trip Requests"}
              dataURL={URLS.TRIPS + "?approved=False&redeem=True&"}
              setData={setPendingTripRedemptionsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(
                  pendingTripRedemptions,
                  "pending-trip-redemptions"
                )
              }
            />
          ) : currentTab === 2 ? (
            <Table
              header={[
                "#",
                "Username",
                "Name",
                "Mobile",
                "Email",
                "Start Date",
                "End Date",
                "Trip ID",
                "Trip Name",
                "Trip Price",
                "Category",
                "BV",
                "Trip Type",
                "Created On",
                "No of Adults",
                "No of Children",
                "Status",
                "Approved on",
                "Trip Status",
              ]}
              data={tripReports}
              title={"trip reports"}
              subtitle={"User’s trip reports"}
              showMenuOptions={false}
              showPagination={true}
              showFilterButton={true}
              filterType={"Trip Requests"}
              dataURL={URLS.TRIPS + "?"}
              setData={setTripReportsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(tripReports, "user's-trip-report")
              }
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(TripRequests);
