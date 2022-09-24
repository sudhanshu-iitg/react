import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Modal,
  Box,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "../../../customComponents/table";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DetailsTable from "../../../customComponents/detailsTable";
import CustomDropdown from "../../../customComponents/dropdown";
import CustomButton from "../../../customComponents/primaryButton";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import { requestUrl } from "../../../constants/index";
import CustomTextField from "../../../customComponents/textfield";

import moment from "moment";

const styles = () => ({
  cardContainer: {
    padding: "20px 15px",
    height: "auto",
    borderRadius: 15,
    position: "relative",
    border: "2px solid rgba(255, 230, 99, 0.5)",
    width: "100%",
    margin: "20px auto",
    "@media(max-width: 600px)": {
      padding: 0,
      border: "none",
    },
  },

  headContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #DBDBDB",

    "@media(max-width: 600px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },

  titleTypography: {
    fontWeight: 700,
    color: "#FFF",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontStyle: "normal",
    padding: 10,
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    marginBottom: 20,
  },
  personaDetails: {
    margin: "40px 5px",
  },
  rankContainer: {
    background: "rgba(233, 197, 71, 0.1)",
    borderRadius: 10,
    margin: "5px",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  rankTypography: {
    fontWeight: 700,
    fontSize: 20,
    color: "#ccc",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #DBDBDB",
  },

  detailValue: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
  },
  tdsButton: {
    textAlign: "center",
    width: "20%",
    background: "#E9C547",
    color: "#262626",
    marginRight: 20,
    "@media(max-width: 600px)": {
      marginRight: 10,
      width: "60%",
    },
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#434343",
    padding: 20,
    overflow: "scroll",
    height: "auto",
    "@media(max-width: 780px)": {
      width: "85%",
    },
  },

  // backIcon: {
  //   "@hover": {
  //     background: "yellow",
  //   },
});

const UserDetails = ({
  classes,
  goBack,
  data,
  showIncomeDetails,
  getUserDetails,
  showEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [incomeData, setIncomeData] = useState(null);
  const [tdsModal, setTdsModal] = useState(false);
  const [tripCompleteModal, setTripCompleteModal] = useState(false);
  const [tripCompleteDate, setTripCompleteDate] = useState(null);
  const [tdsData, setTdsData] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const personalDetails = [
    {
      title: "First Name",
      value: data?.first_name,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Last Name",
      value: data?.last_name,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Username",
      value: data?.username,
      view: false,
    },
    {
      title: "Email ID",
      value: data?.email,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Phone Number",
      value: data?.mobile_number,
      view: false,
      type: "tel",
    },
    {
      title: "Address",
      value: data?.address,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "City",
      value: data?.city,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Pin Code",
      value: data?.pin_code,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "State",
      value: data?.state,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Country",
      value: data?.country,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Nominee Name",
      value: data?.nominee_name,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Nominee Age",
      value: data?.nominee_age,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Relationship with Nominee",
      value: data?.nominee_relation,
      view: false,
      edit: true,
      type: "text",
    },

    {
      title: "Date of Joining",
      value: moment(data?.date_joined).format("MMM Do YY"),
    },
    {
      title: "Date of Activation",
      value:
        moment(data?.activated_on).format("MMM Do YY") !== "Invalid date"
          ? moment(data?.activated_on).format("MMM Do YY")
          : "Yet to be activated",
    },
    {
      title: "Selfie Picture",
      value: data?.selfie,
      view: true,
    },
    {
      title: "Selfie Code",
      value: data?.selfie_code,
      view: false,
    },
    {
      title: "Payment Mode",
      value: data?.payment_mode,
    },
    {
      title: "Payment Slip",
      value: data?.payment_slip,
      view: true,
    },
    {
      title: "Transaction Id",
      value: data?.transaction_id,
    },
    {
      title: "Terms and Conditions",
      value: data?.terms_condition_accepted ? "True" : "False",
    },
  ];

  const kycDetails = [
    {
      title: "Aadhar Number",
      value: data?.aadhar_number || "-",
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Aadhar Card Document",
      value: data?.documents?.aadhar?.aadhar,
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "PAN Details",
      value: data?.pan_number,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "PAN Card Document",
      value: data?.documents?.pan?.pan,
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "Adhar Approved",
      value: data?.documents?.aadhar?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: data?.documents?.aadhar?.rejection_reason || "-",
    },
    {
      title: "Pan Approved",
      value: data?.documents?.pan?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: data?.documents?.pan?.rejection_reason || "-",
    },
  ];

  const applicationDetails = [
    {
      title: "Application Details",
      value: "",
      appDetails: true,
    },
  ];

  const bankDetails = [
    {
      title: "Bank Name",
      value: data?.bank_details[0]?.bankname,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank Account Number",
      value: data?.bank_details[0]?.account_number,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank IFSC Code",
      value: data?.bank_details[0]?.ifsc,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank Branch",
      value: data?.bank_details[0]?.branch_name,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Passbook Image",
      value: data?.bank_details[0]?.passbook_image || "",
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "Is Approved",
      value: data?.bank_details[0]?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: data?.bank_details[0]?.rejection_reason || "-",
    },
  ];

  const paymentDetails = [
    {
      title: "Payee Name",
      value: data?.payee_name,
      view: false,
    },
    {
      title: "Payment Mode",
      value: data?.payment_mode,
      view: false,
    },
    {
      title: "Payment Slip",
      value: data?.payment_slip,
      view: true,
    },
  ];

  const sponsorDetails = [
    {
      title: "Sponsor Name",
      value: data?.sponsor_name,
      view: false,
    },
    {
      title: "Sponsor Id",
      value: data?.sponsor_id,
      view: false,
    },
    {
      title: "Uplink Id",
      value: data?.uplink_id,
      view: false,
    },
  ];

  const packageDetails = [
    {
      title: "Category",
      value: data?.package_selected?.category,
      view: false,
    },
    {
      title: "Package Name",
      value: data?.package_selected?.name,
      view: false,
    },
    {
      title: "Package Id",
      value: data?.package_selected?.package_id,
      view: false,
    },
    {
      title: "Price",
      value: data?.package_selected?.price,
      view: false,
    },
    {
      title: "Description",
      value: data?.package_selected?.short_description,
      view: false,
    },
    {
      title: "Package Type",
      value: data?.package_selected?.type,
      view: false,
    },
  ];

  const freeUserDetails = [
    {
      title: "Amount Paid",
      value: data?.free_user_data?.amount_paid,
    },
    {
      title: "Amount Left",
      value: data?.free_user_data?.amount_left,
    },
    {
      title: "Last Payment Made",
      value: moment(data?.free_user_data?.last_payment_maid).format(
        "DD/MM/YYYY"
      ),
    },
    {
      title: "Transactions",
      value: data?.free_user_data?.transactions,
      freeUserDetailsView: true,
    },
  ];

  const getUrl = (incomeType) => {
    if (incomeType === "Repurchase Income") {
      return `${requestUrl}history/payments?user__username=${data?.username}&paid=true&description=repurchase`;
    } else if (incomeType === "Rewards and Ranks") {
      return `${requestUrl}history/payments?user__username=${data?.username}&paid=true&description=rank`;
    } else if (incomeType === "Career Contest") {
      return `${requestUrl}history/payments?user__username=${data?.username}&paid=true&description=career`;
    } else if (incomeType === "Performance Bonus") {
      return `${requestUrl}history/payments?user__username=${data?.username}&paid=true&description=performance`;
    } else if (incomeType === "Sales Matching Bonus") {
      return `${requestUrl}history/payments?user__username=${data?.username}&paid=true&description=franchaise income`;
    }
  };

  const getIncomeDetails = async (incomeType) => {
    const incomeData = await allRequestHandler({
      requestType: "GET",
      requestUrl: getUrl(incomeType),
    });
    if (incomeData) {
      const content = incomeData?.map((p, index) => {
        return {
          id: index + 1,
          paid_date: moment(p?.paid_on).format("DD/MM/YYYY"),
          mbv: p?.payable_amount,
          total_amount: p?.total_amount,
        };
      });
      setIncomeData(content);
    }
  };

  const getTdsData = async () => {
    let tds = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.TDS}?username__username=${data?.username}`,
    });
    if (
      tds?.status === "401" ||
      tds?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (tds.status !== 404) {
      const content = tds?.map((p) => {
        return {
          username: p?.username?.username,
          tds: (
            <Button onClick={() => window.open(p?.tax_pdf, "_blank").focus()}>
              <RemoveRedEyeRoundedIcon
                style={{ fontSize: 22, color: "#808080" }}
              />
            </Button>
          ),
          uploadedDate: moment(p?.uploaded_on).format("DD/MM/YYYY"),
          id: p?.id,
        };
      });
      setTdsData(content);
    }
  };

  const getTdsReport = async () => {
    const getTds = await allRequestHandler({
      requestType: "EXCEL",
      requestUrl: URLS.TDSREPORT,
      requestData: { type: data?.username },
      responseType: "blob",
    });

    if (getTds?.data?.size === 44) {
      setDisplayMsg("No payouts to generate report");
      setSeverity("error");
      setHandleSnackbar(true);
    } else {
      const url = window.URL.createObjectURL(new Blob([getTds?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Tds Report - ${
          new Date().getFullYear() +
          " - " +
          (new Date().getMonth() + 1) +
          " - " +
          new Date().getDate()
        } .xls`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const markAsTripCompleted = async () => {
    if (tripCompleteDate !== null) {
      let markAsCompleted = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.UPDATETRIP,
        requestData: {
          username: data?.username,
          trip_finished_at: tripCompleteDate,
        },
      });
      if (markAsCompleted.response === "data saved") {
        setTripCompleteModal(false);
        setDisplayMsg(markAsCompleted.response);
        setSeverity("success");
        setHandleSnackbar(true);
        setTripCompleteDate(null);
      } else {
        setTripCompleteModal(false);
        setDisplayMsg(markAsCompleted.response);
        setSeverity("error");
        setHandleSnackbar(true);
        setTripCompleteDate(null);
      }
    } else {
      setDisplayMsg("Please select the date");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        open={handleSnackbar}
        onClose={() => setHandleSnackbar(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {" "}
          {displayMsg}{" "}
        </MuiAlert>
      </Snackbar>
      <Grid className={classes.cardContainer}>
        <div className={classes.headContainer}>
          <Typography className={classes.titleTypography}>
            <span style={{ marginTop: 5, marginRight: 15 }}>
              <Button onClick={() => goBack()}>
                <KeyboardBackspaceRoundedIcon
                  style={{ fontSize: 35 }}
                  className={classes.backIcon}
                />
              </Button>
            </span>
            <span style={{ width: "80%" }}>
              {" "}
              {data?.first_name + " " + data?.last_name}
            </span>
          </Typography>
          <div className={classes.titleTypography}>
            <CustomButton
              text={"Generate Tds"}
              style={{
                textAlign: "center",
                width: "100%",
                background: "#E9C547",
                color: "#262626",
                marginRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
              }}
              onClick={getTdsReport}
            />
            <CustomButton
              text={"View Tds"}
              onClick={() => {
                getTdsData();
                setTdsModal(true);
              }}
              style={{
                textAlign: "center",
                width: "100%",
                background: "#E9C547",
                color: "#262626",
                paddingTop: 20,
                paddingBottom: 20,
                marginRight: 20,
              }}
            />
            <CustomButton
              text={"Mark Trip Completed"}
              onClick={() => setTripCompleteModal(true)}
              style={{
                width: "100%",
                background: "#E9C547",
                color: "#262626",
                padding: 20,
              }}
            />
          </div>
        </div>
        {/* <Grid style={{ width: "42%" }}>
          <Grid className={classes.rankContainer}>
            <MilitaryTechRoundedIcon
              style={{ fontSize: 40, color: "#E9C547" }}
            />
            <Typography className={classes.rankTypography}>
              Current Rank <span style={{ fontWeight: 500 }}>Double Crown</span>
            </Typography>

            <CalendarTodayRoundedIcon
              style={{ fontSize: 30, marginRight: 10, color: "#E9C547" }}
            />
            <Typography className={classes.rankTypography}>
              Achieved On <span style={{ fontWeight: 500 }}>12/02/2022</span>
            </Typography>
          </Grid>
        </Grid> */}
        <DetailsTable
          type={"PERSONAL DETAILS"}
          details={personalDetails}
          title={"PERSONAL DETAILS"}
          getUserDetails={getUserDetails}
          showEdit={true}
          showApproval={false}
          showComplete={true}
          rowSelectedUserName={data?.username}
        />
        <Divider style={{ background: "rgba(233, 197, 71, 0.1)" }} />
        <DetailsTable
          type={"KYC"}
          details={kycDetails}
          title={"KYC DETAILS"}
          getUserDetails={getUserDetails}
          showEdit={true}
          showApproval={true}
          rowSelectedUserName={data?.username}
        />
        <DetailsTable
          type={"APPLICATION"}
          details={applicationDetails}
          title={"APPLICATION DETAILS"}
          getUserDetails={getUserDetails}
          showApproval={true}
          rowSelectedUserName={data?.username}
        />
        <DetailsTable
          type={"BANK"}
          details={bankDetails}
          title={"BANK DETAILS"}
          getUserDetails={getUserDetails}
          showEdit={true}
          showApproval={true}
          rowSelectedUserName={data?.username}
        />
        <Divider style={{ background: "rgba(233, 197, 71, 0.1)" }} />
        <DetailsTable
          type={"PAYMENT"}
          details={paymentDetails}
          title={"PAYMENT DETAILS"}
          isEditing={editing}
          getUserDetails={getUserDetails}
          showEdit={false}
          showApproval={false}
          rowSelectedUserName={data?.username}
        />
        <Divider style={{ background: "rgba(233, 197, 71, 0.1)" }} />
        <DetailsTable
          type={"SPONSER"}
          details={sponsorDetails}
          title={"SPONSOR DETAILS"}
          isEditing={editing}
          getUserDetails={getUserDetails}
          showEdit={false}
          showApproval={false}
          rowSelectedUserName={data?.username}
        />
        <Divider style={{ background: "rgba(233, 197, 71, 0.1)" }} />
        <DetailsTable
          details={packageDetails}
          title={"PACKAGE DETAILS"}
          isEditing={editing}
          getUserDetails={getUserDetails}
          showEdit={false}
        />
        {data?.free_registration && (
          <DetailsTable
            details={freeUserDetails}
            title={"FREE USER DETAILS"}
            getUserDetails={getUserDetails}
          />
        )}
        <Grid className={classes.personaDetails}>
          {showIncomeDetails && (
            <>
              <Typography className={classes.title}>INCOME DETAILS</Typography>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <CustomDropdown
                  label={"Select the type of income"}
                  defaultValue={"Select Package"}
                  menuItems={[
                    "Franchise Income",
                    "Career Contest",
                    "Rewards and Ranks",
                    "Repurchase Income",
                    "Performance Bonus",
                  ]}
                  handleSelectChange={(e) => {
                    getIncomeDetails(e.target.value);
                  }}
                />
              </Grid>
              <Table
                header={["#", "Date", "Matched BV", "Amount"]}
                data={incomeData}
                showPagination={true}
              />
            </>
          )}
        </Grid>
      </Grid>
      <Modal
        open={tdsModal}
        onClose={() => setTdsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Table
            header={["Username", "Tds", "Uploadde On", "Id"]}
            data={tdsData}
            title={"TDS"}
            showPagination={true}
          />
        </Box>
      </Modal>

      <Modal
        open={tripCompleteModal}
        onClose={() => setTripCompleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Typography
            style={{
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: 20,
              color: "#FFF",
              textTransform: "uppercase",
              margin: 10,
            }}
          >
            Mark Trip as Completed
          </Typography>
          <Grid
            item
            style={{
              border: "2px solid rgb(120, 120, 120)",
              borderRadius: 4,
              color: "#E9C547",
              padding: "20px 15px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography style={{ lineHeight: "24px" }}>
              Username: {""}
            </Typography>
            <Typography style={{ lineHeight: "24px" }}>
              {""} {data?.username}
            </Typography>
          </Grid>
          <CustomTextField
            fullWidth={true}
            label={"Trip Finish Date"}
            type={"date"}
            isRequired={true}
            autoComplete="off"
            autoFocus
            BoxHeight="68px"
            height={70}
            placeholder={"Enter reward"}
            handleChange={(e) => setTripCompleteDate(e.target.value)}
          />
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <CustomButton
              text="Mark Trip as Completed"
              style={{
                color: "#000",
                padding: "20px 5px",
                fontWeight: 500,
              }}
              onClick={markAsTripCompleted}
            />
            <CustomButton
              text="Cancel"
              style={{
                color: "#000",
                padding: "20px 5px",
                fontWeight: 500,
              }}
              onClick={() => setTripCompleteModal(false)}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(UserDetails);
