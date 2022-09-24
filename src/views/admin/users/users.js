import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Divider } from "@mui/material";
import AreaGraph from "../../../customComponents/areaGraph";
import { withStyles } from "@mui/styles";
import CustomSpinner from "../../../customComponents/spinner";
import Table from "../../../customComponents/table";
import UserDetails from "./userDetails";
import moment from "moment";
import Tabs from "../../../customComponents/tabs";
import LineGraph from "../../../customComponents/lineGraph";
import styles from "./users.style";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import { Redirect } from "react-router-dom";
import * as XLSX from "xlsx";

const tableHeader = [
  "",
  "",
  "#",
  "Joining Date",
  "Activation Date",
  "Username",
  "Name",
  "Email",
  "Mobile Number",
  "Sponsor ID",
  "Sponsor Name",
  "PAN Number",
];
const Users = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newUsers, setNewUsers] = useState(null);
  const [selectedNewUserRowUsername, setSelectedNewUserRowUsername] =
    useState(null);
  const [selectedNewUserDetails, setSelectedNewUserDetails] = useState(null);

  const [rejectedNewUsers, setRejectedNewUsers] = useState(null);
  const [
    selectedRejectedNewUserRowUsername,
    setSelectedRejectedNewUserRowUsername,
  ] = useState(null);
  const [selectedRejectedNewUserDetails, setSelectedRejectedNewUserDetails] =
    useState(null);

  const [freeUsers, setFreeUsers] = useState(null);
  const [selectedFreeUserRowUsername, setSelectedFreeUserRowUsername] =
    useState(null);
  const [selectedFreeUserDetails, setSelectedFreeUserDetails] = useState(null);

  const [blockedFreeUsers, setBlockedFreeUsers] = useState(null);
  const [
    selectedBlockedFreeUserRowUsername,
    setSelectedBlockedFreeUserRowUsername,
  ] = useState(null);
  const [selectedBlockedFreeUserDetails, setSelectedBlockedFreeUserDetails] =
    useState(null);

  const [activeCustomers, setActiveCustomers] = useState(null);
  const [
    selectedActiveCustomerRowUsername,
    setSelectedActiveCustomerRowUsername,
  ] = useState(null);
  const [selectedActiveCustomerDetails, setSelectedActiveCustomerDetails] =
    useState(null);

  const [blockedActiveCustomers, setBlockedActiveCustomers] = useState(null);
  const [
    selectedBlockedActiveCustomerRowUsername,
    setSelectedBlockedActiveCustomerRowUsername,
  ] = useState(null);
  const [
    selectedBlockedActiveCustomerDetails,
    setSelectedBlockedActiveCustomerDetails,
  ] = useState(null);

  const [activeDistributors, setActiveDistributors] = useState(null);
  const [
    selectedActiveDistributorRowUsername,
    setSelectedActiveDistributorRowUsername,
  ] = useState(null);

  const [
    selectedActiveDistributorDetails,
    setSelectedActiveDistributorDetails,
  ] = useState(null);

  const [blockedActiveDistributors, setBlockedActiveDistributors] =
    useState(null);
  const [
    selectedBlockedActiveDistributorRowUsername,
    setSelectedBlockedActiveDistributorRowUsername,
  ] = useState(null);

  const [
    selectedBlockedActiveDistributorDetails,
    setSelectedBlockedActiveDistributorDetails,
  ] = useState(null);

  const [freeRegistrationGraphData, setFreeRegistrationGraphData] =
    useState(null);
  const [newRegistrationGraphData, setNewRegistrationGraphData] =
    useState(null);
  const [customerGraphData, setCustomerGraphData] = useState(null);
  const [distributorGraphData, setDistributorGraphData] = useState(null);

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
    setSelectedNewUserRowUsername(null);
    setSelectedRejectedNewUserRowUsername(null);
    setSelectedFreeUserRowUsername(null);
    setSelectedBlockedActiveCustomerRowUsername(null);
    setSelectedActiveCustomerDetails(null);
    setSelectedBlockedActiveCustomerRowUsername(null);
    setSelectedActiveDistributorRowUsername(null);
    setSelectedBlockedActiveDistributorRowUsername(null);
  };

  const getNewUsers = async () => {
    let newUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.NEWUSERS,
    });
    if (
      newUsers?.status === "401" ||
      newUsers?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (newUsers?.status !== 404) {
      setNewUsersData(newUsers);
      setLoading(false);
    }
  };

  const setNewUsersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setNewUsers(content);
  };

  const openNewUserSelectedRow = (username) => {
    setSelectedNewUserRowUsername(username);
    getSelectedNewUserDetails(username);
  };

  const getSelectedNewUserDetails = async (username) => {
    let selectedNewUser = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedNewUser?.status === "401" ||
      selectedNewUser?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedNewUser?.status !== 404) {
      setSelectedNewUserDetails(selectedNewUser[0]);
      setLoading(false);
    }
  };

  const getRejectedNewUsers = async () => {
    let rejectedNewUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.REJECTEDNEWUSERS,
    });
    if (
      rejectedNewUsers?.status === "401" ||
      rejectedNewUsers?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (rejectedNewUsers?.status !== 404) {
      setRejectedNewUsersData(rejectedNewUsers);
      setLoading(false);
    }
  };

  const setRejectedNewUsersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setRejectedNewUsers(content);
  };

  const openRejectedNewUserSelectedRow = (username) => {
    setSelectedRejectedNewUserRowUsername(username);
    getSelectedRejectedNewUserDetails(username);
  };

  const getSelectedRejectedNewUserDetails = async (username) => {
    let selectedRejectedNewUser = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedRejectedNewUser?.status === "401" ||
      selectedRejectedNewUser?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedRejectedNewUser?.status !== 404) {
      setSelectedRejectedNewUserDetails(selectedRejectedNewUser[0]);
    }
  };

  const getFreeUsers = async () => {
    let freeUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.FREEUSERS,
    });
    if (
      freeUsers?.status === "401" ||
      freeUsers?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (freeUsers?.status !== 404) {
      setFreeUsersData(freeUsers);
      setLoading(false);
    }
  };

  const setFreeUsersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setFreeUsers(content);
  };

  const openFreeUserSelectedRow = (username) => {
    setSelectedFreeUserRowUsername(username);
    getSelectedFreeUserDetails(username);
  };

  const getSelectedFreeUserDetails = async (username) => {
    let selectedFreeUser = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedFreeUser?.status === "401" ||
      selectedFreeUser?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedFreeUser?.status !== 404) {
      setSelectedFreeUserDetails(selectedFreeUser[0]);
    }
  };

  const getBlockedFreeUsers = async () => {
    let blockedFreeUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.BLOCKEDFREEUSER,
    });
    if (
      blockedFreeUsers?.status === "401" ||
      blockedFreeUsers?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (blockedFreeUsers?.status !== 404) {
      setBlockedFreeUsersData(blockedFreeUsers);
      setLoading(false);
    }
  };

  const setBlockedFreeUsersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setBlockedFreeUsers(content);
  };

  const openBlockedFreeUserSelectedRow = (username) => {
    setSelectedBlockedFreeUserRowUsername(username);
    getSelectedBlockedFreeUserDetails(username);
  };

  const getSelectedBlockedFreeUserDetails = async (username) => {
    let selectedFreeUser = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedFreeUser?.status === "401" ||
      selectedFreeUser?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedFreeUser?.status !== 404) {
      setSelectedBlockedFreeUserDetails(selectedFreeUser[0]);
    }
  };

  const getActiveCustomers = async () => {
    let activeCustomers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.ACTIVECUSTOMERS,
    });
    if (
      activeCustomers?.status === "401" ||
      activeCustomers?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (activeCustomers?.status !== 404) {
      setActiveCustomersData(activeCustomers);
      setLoading(false);
    }
  };

  const setActiveCustomersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setActiveCustomers(content);
  };

  const openActiveCustomerSelectedRow = (username) => {
    setSelectedActiveCustomerRowUsername(username);
    getSelectedActiveCustomerDetails(username);
  };

  const getSelectedActiveCustomerDetails = async (username) => {
    let selectedActiveCustomer = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedActiveCustomer?.status === "401" ||
      selectedActiveCustomer?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedActiveCustomer?.status !== 404) {
      setSelectedActiveCustomerDetails(selectedActiveCustomer[0]);
    }
  };

  const getBlockedActiveCustomers = async () => {
    let blockedActiveCustomers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.BLOCKEDACTIVECUSTOMERS,
    });
    if (
      blockedActiveCustomers?.status === "401" ||
      blockedActiveCustomers?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (blockedActiveCustomers?.status !== 404) {
      setBlockedActiveCustomersData(blockedActiveCustomers);
      setLoading(false);
    }
  };

  const setBlockedActiveCustomersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setBlockedActiveCustomers(content);
  };

  const openBlockedActiveCustomerSelectedRow = (username) => {
    setSelectedBlockedActiveCustomerRowUsername(username);
    getSelectedBlockedActiveCustomerDetails(username);
  };

  const getSelectedBlockedActiveCustomerDetails = async (username) => {
    let selectedBlockedActiveCustomer = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedBlockedActiveCustomer?.status === "401" ||
      selectedBlockedActiveCustomer?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedBlockedActiveCustomer?.status !== 404) {
      setSelectedBlockedActiveCustomerDetails(selectedBlockedActiveCustomer[0]);
    }
  };

  const getActiveDistributors = async () => {
    let activeDistributors = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.ACTIVEDISTRIBUTORS,
    });
    if (
      activeDistributors?.status === "401" ||
      activeDistributors?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (activeDistributors?.status !== 404) {
      setActiveDistributorsData(activeDistributors);
      setLoading(false);
    }
  };

  const setActiveDistributorsData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setActiveDistributors(content);
  };

  const openActiveDistributorSelectedRow = (username) => {
    setSelectedActiveDistributorRowUsername(username);
    getSelectedActiveDistributorDetails(username);
  };

  const getSelectedActiveDistributorDetails = async (username) => {
    let selectedActiveDistributor = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedActiveDistributor?.status === "401" ||
      selectedActiveDistributor?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedActiveDistributor?.status !== 404) {
      setSelectedActiveDistributorDetails(selectedActiveDistributor[0]);
    }
  };

  const getBlockedActiveDistributors = async () => {
    let blockedActiveDistributors = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.BLOCKEDDISTRIBUTOR,
    });
    if (
      blockedActiveDistributors?.status === "401" ||
      blockedActiveDistributors?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (blockedActiveDistributors?.status !== 404) {
      setBlockedActiveDistributorsData(blockedActiveDistributors);
      setLoading(false);
    }
  };

  const setBlockedActiveDistributorsData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        join_date: moment(p?.date_joined).format("MMM Do YY"),
        activation_date: p?.activated_on
          ? moment(p?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
        username: p?.username,
        cust_name: p?.first_name + " " + p?.last_name,
        email: p?.email,
        mobile: p?.mobile_number,
        sponsor_id: p?.sponsor_id,
        sponsor_name: p?.sponsor_name,
        pan_number: p?.pan_number,
      };
    });
    setBlockedActiveDistributors(content);
  };

  const openBlockedActiveDistributorSelectedRow = (username) => {
    setSelectedActiveDistributorRowUsername(username);
    getSelectedActiveDistributorDetails(username);
  };

  const getSelectedBlockedActiveDistributorDetails = async (username) => {
    let selectedBlockedActiveDistributor = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPECIFICUSER + "" + username,
    });
    if (
      selectedBlockedActiveDistributor?.status === "401" ||
      selectedBlockedActiveDistributor?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedBlockedActiveDistributor?.status !== 404) {
      setSelectedBlockedActiveDistributorDetails(
        selectedBlockedActiveDistributor[0]
      );
    }
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
      if (subType === "free_user_registration") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            month: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setFreeRegistrationGraphData(content);
      } else if (subType === "new_user_registration") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            month: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setNewRegistrationGraphData(content);
      } else if (subType === "distributor") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            month: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setDistributorGraphData(content);
      } else if (subType === "customer") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            month: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setCustomerGraphData(content);
      }
    }
  };

  useEffect(() => {
    getNewUsers();
    getRejectedNewUsers();
    getFreeUsers();
    getActiveCustomers();
    getActiveDistributors();
    getBlockedFreeUsers();
    getBlockedActiveCustomers();
    getBlockedActiveDistributors();
    getGraphData("users", "free_user_registration");
    getGraphData("users", "new_user_registration");
    getGraphData("users", "distributor");
    getGraphData("users", "customer");
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
          <Grid className={classes.tabContainer}>
            <Tabs
              labels={[
                "New Users",
                "Free Users",
                // "Active Customers",
                "Active Distributors",
              ]}
              tabChange={tabChange}
              value={currentTab}
            />
          </Grid>

          <Grid className={classes.tableContainer}>
            {currentTab === 0 ? (
              selectedNewUserRowUsername !== null &&
              selectedNewUserRowUsername !== undefined &&
              selectedNewUserRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedNewUserRowUsername(null);
                    getNewUsers();
                    getRejectedNewUsers();
                  }}
                  showIncomeDetails={true}
                  data={selectedNewUserDetails}
                  getUserDetails={() =>
                    getSelectedNewUserDetails(selectedNewUserRowUsername)
                  }
                />
              ) : selectedRejectedNewUserRowUsername !== null &&
                selectedRejectedNewUserRowUsername !== undefined &&
                selectedRejectedNewUserRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedRejectedNewUserRowUsername(null);
                    getNewUsers();
                    getRejectedNewUsers();
                  }}
                  showIncomeDetails={true}
                  data={selectedRejectedNewUserDetails}
                  getUserDetails={() =>
                    getSelectedRejectedNewUserDetails(
                      selectedRejectedNewUserRowUsername
                    )
                  }
                />
              ) : (
                <Grid>
                  <Grid
                    style={{
                      background: "rgba(197, 177, 255, 0.02)",
                      boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
                      borderRadius: 20,
                      margin: "0 auto",
                      marginBottom: 50,
                      padding: 20,
                    }}
                  >
                    <Grid>
                      <Typography className={classes.chartTitle}>
                        Average New Users
                      </Typography>
                    </Grid>
                    <LineGraph data={freeRegistrationGraphData} />
                  </Grid>
                  <Grid>
                    <Table
                      header={tableHeader}
                      data={newUsers}
                      title={"NEW USERS LIST"}
                      subtitle={"Users who are waiting for approval"}
                      menuOptions={["Approve User", "Reject User"]}
                      showMenuOptions={true}
                      showPagination={true}
                      onRowClick={openNewUserSelectedRow}
                      showEye={true}
                      showEdit={true}
                      showFilterButton={true}
                      filterType={"Users"}
                      dataURL={URLS.NEWUSERS}
                      setData={setNewUsersData}
                      getUserDetails={() => {
                        getNewUsers();
                        getRejectedNewUsers();
                      }}
                      exportExcel={true}
                      exportToExcelClick={() =>
                        exportToExcel(newUsers, "new-users")
                      }
                    />
                  </Grid>

                  <Grid style={{ marginTop: "40px" }}>
                    <Table
                      header={tableHeader}
                      data={rejectedNewUsers}
                      title={"REJECTED NEW USERS LIST"}
                      subtitle={"Rejected Users who are waiting for approval"}
                      menuOptions={["Approve User"]}
                      showMenuOptions={true}
                      showPagination={true}
                      onRowClick={openRejectedNewUserSelectedRow}
                      showEye={true}
                      showEdit={true}
                      showFilterButton={true}
                      filterType={"Users"}
                      dataURL={URLS.REJECTEDNEWUSERS}
                      setData={setRejectedNewUsersData}
                      getUserDetails={() => {
                        getNewUsers();
                        getRejectedNewUsers();
                      }}
                      exportExcel={true}
                      exportToExcelClick={() =>
                        exportToExcel(rejectedNewUsers, "rejected-new-users")
                      }
                    />
                  </Grid>
                </Grid>
              )
            ) : currentTab === 1 ? (
              selectedFreeUserRowUsername !== null &&
              selectedFreeUserRowUsername !== undefined &&
              selectedFreeUserRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedFreeUserRowUsername(null);
                    getFreeUsers();
                    getBlockedFreeUsers();
                  }}
                  showIncomeDetails={true}
                  data={selectedFreeUserDetails}
                  getUserDetails={() =>
                    getSelectedFreeUserDetails(selectedFreeUserRowUsername)
                  }
                />
              ) : selectedBlockedFreeUserRowUsername !== null &&
                selectedBlockedFreeUserRowUsername !== undefined &&
                selectedBlockedFreeUserRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedBlockedFreeUserRowUsername(null);
                    getFreeUsers();
                    getBlockedFreeUsers();
                  }}
                  showIncomeDetails={true}
                  data={selectedBlockedFreeUserDetails}
                  getUserDetails={() =>
                    getSelectedBlockedFreeUserDetails(
                      selectedBlockedFreeUserRowUsername
                    )
                  }
                />
              ) : (
                <Grid>
                  <Grid
                    style={{
                      background: "rgba(197, 177, 255, 0.02)",
                      boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
                      borderRadius: 20,
                      margin: "0 auto",
                      marginBottom: 50,
                      padding: 20,
                    }}
                  >
                    <Grid>
                      <Typography className={classes.chartTitle}>
                        Average Free Users
                      </Typography>
                    </Grid>
                    <LineGraph data={newRegistrationGraphData} />
                  </Grid>
                  <Grid>
                    <Table
                      header={tableHeader}
                      data={freeUsers}
                      title={"Free USERS LIST"}
                      subtitle={"Users who are on a free package"}
                      menuOptions={["Block User"]}
                      showMenuOptions={true}
                      showPagination={true}
                      onRowClick={openFreeUserSelectedRow}
                      showEye={true}
                      showFilterButton={true}
                      filterType={"Users"}
                      dataURL={URLS.FREEUSERS}
                      setData={setFreeUsersData}
                      getUserDetails={() => {
                        getFreeUsers();
                        getBlockedFreeUsers();
                      }}
                      exportExcel={true}
                      exportToExcelClick={() =>
                        exportToExcel(freeUsers, "free-users")
                      }
                    />
                  </Grid>
                  {blockedFreeUsers?.length > 0 && (
                    <Grid style={{ marginTop: "40px" }}>
                      <Table
                        header={tableHeader}
                        data={blockedFreeUsers}
                        title={"Blocked Free USERS LIST"}
                        subtitle={"Blocked Users who are on a free package"}
                        menuOptions={["Unblock User"]}
                        showMenuOptions={true}
                        showPagination={true}
                        onRowClick={openBlockedFreeUserSelectedRow}
                        showEye={true}
                        showFilterButton={true}
                        filterType={"Users"}
                        dataURL={URLS.BLOCKEDFREEUSER}
                        setData={setBlockedFreeUsersData}
                        getUserDetails={() => {
                          getFreeUsers();
                          getBlockedFreeUsers();
                        }}
                        exportExcel={true}
                        exportToExcelClick={() =>
                          exportToExcel(blockedFreeUsers, "blocked-free-users")
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              )
            ) : // ) : currentTab === 2 ? (
            //   selectedActiveCustomerRowUsername !== null &&
            //   selectedActiveCustomerRowUsername !== undefined &&
            //   selectedActiveCustomerRowUsername !== "" ? (
            //     <UserDetails
            //       goBack={() => {
            //         setSelectedActiveCustomerRowUsername(null);
            //         getActiveCustomers();
            //         getBlockedActiveCustomers();
            //       }}
            //       showIncomeDetails={true}
            //       data={selectedActiveCustomerDetails}
            //       getUserDetails={() =>
            //         getSelectedActiveCustomerDetails(
            //           selectedActiveCustomerRowUsername
            //         )
            //       }
            //     />
            //   ) : selectedBlockedActiveCustomerRowUsername !== null &&
            //     selectedBlockedActiveCustomerRowUsername !== undefined &&
            //     selectedBlockedActiveCustomerRowUsername !== "" ? (
            //     <UserDetails
            //       goBack={() => {
            //         setSelectedBlockedActiveCustomerRowUsername(null);
            //         getActiveCustomers();
            //         getBlockedActiveCustomers();
            //       }}
            //       showIncomeDetails={true}
            //       data={selectedBlockedActiveCustomerDetails}
            //       getUserDetails={() =>
            //         getSelectedBlockedActiveCustomerDetails(
            //           selectedBlockedActiveCustomerRowUsername
            //         )
            //       }
            //     />
            //   ) : (
            //     <Grid>
            //       <Grid
            //         style={{
            //           background: "rgba(197, 177, 255, 0.02)",
            //           boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
            //           borderRadius: 20,
            //           margin: "0 auto",
            //           marginBottom: 50,
            //           padding: 20,
            //         }}
            //       >
            //         <Grid>
            //           <Typography className={classes.chartTitle}>
            //             Average Active Cusromers
            //           </Typography>
            //         </Grid>
            //         <LineGraph data={customerGraphData} />
            //       </Grid>
            //       <Grid>
            //         <Table
            //           header={tableHeader}
            //           data={activeCustomers}
            //           title={"ACTIVE CUSTOMERS"}
            //           subtitle={"Customers who are active"}
            //           menuOptions={["Block User"]}
            //           showMenuOptions={true}
            //           showPagination={true}
            //           onRowClick={openActiveCustomerSelectedRow}
            //           showEye={true}
            //           showFilterButton={true}
            //           filterType={"Users"}
            //           dataURL={URLS.ACTIVECUSTOMERS}
            //           setData={setActiveCustomersData}
            //           getUserDetails={() => {
            //             getActiveCustomers();
            //             getBlockedActiveCustomers();
            //           }}
            //           exportExcel={true}
            //           exportToExcelClick={() =>
            //             exportToExcel(activeCustomers, "active-customers")
            //           }
            //         />
            //       </Grid>
            //       {blockedActiveCustomers?.length > 0 && (
            //         <Grid style={{ marginTop: "40px" }}>
            //           <Table
            //             header={tableHeader}
            //             data={blockedActiveCustomers}
            //             title={"BLOCKED ACTIVE CUSTOMERS"}
            //             subtitle={"Blocked Customers who are active"}
            //             menuOptions={["Unblock User"]}
            //             showMenuOptions={true}
            //             showPagination={true}
            //             onRowClick={openBlockedActiveCustomerSelectedRow}
            //             showEye={true}
            //             showFilterButton={true}
            //             filterType={"Users"}
            //             dataURL={URLS.BLOCKEDACTIVECUSTOMERS}
            //             setData={setBlockedActiveCustomersData}
            //             getUserDetails={() => {
            //               getActiveCustomers();
            //               getBlockedActiveCustomers();
            //             }}
            //             exportExcel={true}
            //             exportToExcelClick={() =>
            //               exportToExcel(
            //                 blockedActiveCustomers,
            //                 "blocked-active-customers"
            //               )
            //             }
            //           />
            //         </Grid>
            //       )}
            //     </Grid>
            //   )
            currentTab === 2 ? (
              selectedActiveDistributorRowUsername !== null &&
              selectedActiveDistributorRowUsername !== undefined &&
              selectedActiveDistributorRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedActiveDistributorRowUsername(null);
                    getActiveDistributors();
                    getBlockedActiveDistributors();
                  }}
                  showIncomeDetails={true}
                  data={selectedActiveDistributorDetails}
                  getUserDetails={() =>
                    getSelectedActiveDistributorDetails(
                      selectedActiveDistributorRowUsername
                    )
                  }
                />
              ) : selectedBlockedActiveDistributorRowUsername !== null &&
                selectedBlockedActiveDistributorRowUsername !== undefined &&
                selectedBlockedActiveDistributorRowUsername !== "" ? (
                <UserDetails
                  goBack={() => {
                    setSelectedBlockedActiveDistributorRowUsername(null);
                    getActiveDistributors();
                    getBlockedActiveDistributors();
                  }}
                  showIncomeDetails={true}
                  data={selectedBlockedActiveDistributorDetails}
                  getUserDetails={() =>
                    getSelectedBlockedActiveDistributorDetails(
                      selectedBlockedActiveDistributorRowUsername
                    )
                  }
                />
              ) : (
                <Grid>
                  <Grid
                    style={{
                      background: "rgba(197, 177, 255, 0.02)",
                      boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
                      borderRadius: 20,
                      margin: "0 auto",
                      marginBottom: 50,
                      padding: 20,
                    }}
                  >
                    <Grid>
                      <Typography className={classes.chartTitle}>
                        Average Active Distributors
                      </Typography>
                    </Grid>
                    <LineGraph data={distributorGraphData} />
                  </Grid>
                  <Grid>
                    <Table
                      header={tableHeader}
                      data={activeDistributors}
                      title={"ACTIVE DISTRIBUTORS LIST"}
                      subtitle={"Distributors who are ACTIVE"}
                      menuOptions={["Block User"]}
                      showMenuOptions={true}
                      showPagination={true}
                      onRowClick={openActiveDistributorSelectedRow}
                      showEye={true}
                      showFilterButton={true}
                      filterType={"Users"}
                      dataURL={URLS.ACTIVEDISTRIBUTORS}
                      setData={setActiveDistributorsData}
                      getUserDetails={() => {
                        getActiveDistributors();
                        getBlockedActiveDistributors();
                      }}
                      exportExcel={true}
                      exportToExcelClick={() =>
                        exportToExcel(activeDistributors, "active-distributors")
                      }
                    />
                  </Grid>
                  {blockedActiveDistributors?.length > 0 && (
                    <Grid style={{ marginTop: "40px" }}>
                      <Table
                        header={tableHeader}
                        data={blockedActiveDistributors}
                        title={"BLOCKED ACTIVE DISTRIBUTORS LIST"}
                        subtitle={"Blocked Distributors who are ACTIVE"}
                        menuOptions={["Unblock User"]}
                        showMenuOptions={true}
                        showPagination={true}
                        onRowClick={openBlockedActiveDistributorSelectedRow}
                        showEye={true}
                        showFilterButton={true}
                        filterType={"Users"}
                        dataURL={URLS.BLOCKEDDISTRIBUTOR}
                        setData={setBlockedActiveDistributorsData}
                        getUserDetails={() => {
                          getActiveDistributors();
                          getBlockedActiveDistributors();
                        }}
                        exportExcel={true}
                        exportToExcelClick={() =>
                          exportToExcel(
                            blockedActiveDistributors,
                            "blocked-active-distributors"
                          )
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              )
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      )}{" "}
    </>
  );
};

export default withStyles(styles)(Users);
