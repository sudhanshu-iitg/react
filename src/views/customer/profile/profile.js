import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider, Snackbar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import Tabs from "../../../customComponents/tabs";
import DetailsTable from "../../../customComponents/detailsTable";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import CustomSpinner from "../../../customComponents/spinner";
import moment from "moment";
import styles from "./profile.style";

const Profile = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
  };

  const resetPassword = async () => {
    if (
      currentPassword !== null &&
      newPassword !== null &&
      confirmPassword !== null
    ) {
      let resetPassword = await allRequestHandler({
        requestType: "PATCH",
        requestUrl: URLS.CHANGEPASSOWRD,
        requestData: {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
      });
      if (resetPassword?.message === "Password updated successfully") {
        setDisplayMsg("Password updated successfully");
        setSeverity("success");
        setHandleSnackbar(true);
      } else {
        setDisplayMsg("Something went wrong");
        setSeverity("error");
        setHandleSnackbar(true);
      }
    } else {
      setDisplayMsg("Please enter all the fields");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const getUserDetails = async () => {
    let userDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.USERDETAILS,
      requestData: {
        username: JSON.parse(localStorage.getItem("loginData")).username,
      },
    });

    if (
      userDetails?.status === "401" ||
      userDetails?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (userDetails) {
      setLoading(false);
      setUserDetails(userDetails);
    }
  };

  const idDetails = [
    {
      title: "ID Card",
      idCard: true,
    },
    // {
    //   title: "Welcome Letter",
    //   value: "",
    // },
  ];

  const personalDetails = [
    {
      title: "First Name",
      value: userDetails?.user?.first_name,
      view: false,
    },
    {
      title: "Last Name",
      value: userDetails?.user?.last_name,
      view: false,
    },
    {
      title: "Email ID",
      value: userDetails?.user?.email,
      view: false,
    },
    {
      title: "Phone Number",
      value: userDetails?.user?.mobile_number,
      view: false,
    },
    {
      title: "Address",
      value: userDetails?.user?.address,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "City",
      value: userDetails?.user?.city,
      view: false,
      edit: true,
      type: "text",
    },
    // {
    //   title: "Pin Code",
    //   value: userDetails?.user?.address,
    // },
    {
      title: "State",
      value: userDetails?.user?.state,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Country",
      value: userDetails?.user?.country,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Nominee Name",
      value: userDetails?.user?.nominee_name,
      view: false,
    },
    {
      title: "Nominee Age",
      value: userDetails?.user?.nominee_age,
      view: false,
    },
    {
      title: "Relationship with Nominee",
      value: userDetails?.user?.nominee_relation,
      view: false,
    },
    {
      title: "Date of Joining",
      value: moment(userDetails?.user?.date_joined).format("DD/MM/YYYY"),
      view: false,
    },
    {
      title: "Date of Activation",
      value: moment(userDetails?.user?.activated_on).format("DD/MM/YYYY"),
      view: false,
    },
    {
      title: "Selfie Picture",
      value: userDetails?.user?.selfie,
      view: true,
    },
    {
      title: "Payment Mode",
      value: userDetails?.user?.payment_mode,
    },
    {
      title: "Payment Slip",
      value: userDetails?.user?.payment_slip,
      view: true,
    },
    {
      title: "Transaction Id",
      value: userDetails?.user?.transaction_id,
    },
  ];

  const kycDetails = [
    {
      title: "Aadhar Number",
      value: userDetails?.user?.aadhar_number || "-",
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Aadhar Card Document",
      value: userDetails?.documents?.aadhar?.aadhar || "",
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "PAN Details",
      value: userDetails?.user?.pan_number || "-",
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "PAN Card Document",
      value: userDetails?.documents?.pan?.pan || "",
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "Adhar Approved",
      value: userDetails?.documents?.aadhar?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: userDetails?.documents?.aadhar?.rejection_reason || "-",
    },
    {
      title: "Pan Approved",
      value: userDetails?.documents?.pan?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: userDetails?.documents?.pan?.rejection_reason || "-",
    },
    {
      title: "Application Details",
      value: userDetails?.documents?.application?.application,
      appDetails: true,
    },
  ];

  const bankDetails = [
    {
      title: "Bank Name",
      value: userDetails?.bank_details?.bankname,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank Account Number",
      value: userDetails?.bank_details?.account_number,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank IFSC Code",
      value: userDetails?.bank_details?.ifsc,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Bank Branch",
      value: userDetails?.bank_details?.branch_name,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Passbook Image",
      value: userDetails?.bank_details?.passbook_image || "",
      view: true,
      edit: true,
      type: "file",
    },
    {
      title: "Is Approved",
      value: userDetails?.bank_details?.is_approved ? "Approved" : "No",
    },
    {
      title: "Reason",
      value: userDetails?.bank_details?.rejection_reason || "-",
    },
  ];

  const paymentDetails = [
    {
      title: "Payee Name",
      value: userDetails?.user?.payee_name,
      view: false,
    },
    {
      title: "Payment Mode",
      value: userDetails?.user?.payment_mode,
      view: false,
    },
    {
      title: "Payment Slip ",
      value: userDetails?.user?.payment_slip,
      view: true,
    },
  ];

  const packageDetails = [
    {
      title: "Category",
      value: userDetails?.package_selected?.category,
      view: false,
    },
    {
      title: "Package Name",
      value: userDetails?.package_selected?.name,
      view: false,
    },
    {
      title: "Package Id",
      value: userDetails?.package_selected?.package_id,
      view: false,
    },
    {
      title: "Price",
      value: userDetails?.package_selected?.price,
      view: false,
    },
    {
      title: "Description",
      value: userDetails?.package_selected?.short_description,
      view: false,
    },
    {
      title: "Package Type",
      value: userDetails?.package_selected?.type,
      view: false,
    },
  ];

  useEffect(() => {
    getUserDetails();
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
          <Grid className={classes.outerContainer}>
            <Grid className={classes.tabContainer}>
              <Tabs
                labels={[
                  "Profile Details",
                  "Change Password",
                  "ID & Welcome Letter",
                ]}
                tabChange={tabChange}
                value={currentTab}
              />
            </Grid>

            <Grid className={classes.tableContainer}>
              {currentTab === 0 ? (
                <>
                  <Grid className={classes.personalDetailsContainer}>
                    <DetailsTable
                      profileComponent={true}
                      profilePicture={
                        userDetails?.user?.profile_picture[0]?.img
                      }
                      type={"PERSONAL DETAILS"}
                      title={"PERSONAL DETAILS"}
                      details={personalDetails}
                      showEdit={true}
                      getUserDetails={getUserDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                    <Divider
                      style={{ background: "rgba(233, 197, 71, 0.1)" }}
                    />
                    <DetailsTable
                      type={"KYC"}
                      details={kycDetails}
                      title={"KYC DETAILS"}
                      showEdit={true}
                      getUserDetails={getUserDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                    <Divider
                      style={{ background: "rgba(233, 197, 71, 0.1)" }}
                    />
                    <DetailsTable
                      type={"BANK"}
                      details={bankDetails}
                      title={"BANK DETAILS"}
                      showEdit={true}
                      getUserDetails={getUserDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                    <Divider
                      style={{ background: "rgba(233, 197, 71, 0.1)" }}
                    />
                    <DetailsTable
                      details={paymentDetails}
                      title={"PAYMENT DETAILS"}
                      showEdit={false}
                      getUserDetails={getUserDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                    <Divider
                      style={{ background: "rgba(233, 197, 71, 0.1)" }}
                    />
                    <DetailsTable
                      details={packageDetails}
                      title={"PACKAGE DETAILS"}
                      showEdit={false}
                      getUserDetails={getUserDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                  </Grid>
                </>
              ) : currentTab === 1 ? (
                <Grid style={{ height: "100vh" }}>
                  <Grid className={classes.passwordDetailsContainer}>
                    <Typography className={classes.title}>
                      CHANGE PASSWORD
                    </Typography>
                    <CustomTextField
                      fullWidth={true}
                      label={"Current Password"}
                      type={"password"}
                      autoComplete="off"
                      isRequired={true}
                      autoFocus
                      BoxHeight="68px"
                      value={null}
                      placeholder={"Please enter your current password"}
                      style={{
                        background: "none",
                        marginBottom: 10,
                        border: "1px solid #fff",
                        width: "10%",
                      }}
                      labelStyle={{ color: "white" }}
                      handleChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <CustomTextField
                      fullWidth={true}
                      label={"New Password"}
                      type={"password"}
                      autoComplete="off"
                      isRequired={true}
                      autoFocus
                      BoxHeight="68px"
                      value={null}
                      placeholder={"Please enter your new password"}
                      style={{
                        background: "none",
                        marginBottom: 10,
                        border: "1px solid #fff",
                        width: "10%",
                      }}
                      labelStyle={{ color: "white" }}
                      handleChange={(e) => setNewPassword(e.target.value)}
                      // error={field.error}
                    />
                    <CustomTextField
                      fullWidth={true}
                      label={"Confirm Password"}
                      type={"password"}
                      autoComplete="off"
                      isRequired={true}
                      autoFocus
                      BoxHeight="68px"
                      value={null}
                      placeholder={"Re-enter your new password"}
                      style={{
                        background: "none",
                        marginBottom: 10,
                        border: "1px solid #fff",
                        width: "10%",
                      }}
                      labelStyle={{ color: "white" }}
                      handleChange={(e) => setConfirmPassword(e.target.value)}
                      // error={field.error}
                    />
                    <CustomButton
                      style={{
                        padding: "26px 40px",
                        background: "#C5B1FF",
                        color: "#000",
                        borderRadius: 10,
                        marginBottom: 40,
                        fontWeight: 500,
                        fontSize: 16,
                      }}
                      text="RESET PASSWORD"
                      onClick={resetPassword}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid style={{ height: "100vh" }}>
                  <Grid className={classes.personalDetailsContainer}>
                    <DetailsTable
                      title={"ID CARD & WELCOME LETTER"}
                      details={idDetails}
                      rowSelectedUserName={userDetails?.user?.username}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(Profile);
