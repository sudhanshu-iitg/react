import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Modal,
  Box,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import Logo from "../../../assets/logo.png";
import MetricCard from "../../../customComponents/metricCard";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import SimpleList from "../../../customComponents/simpleList";

import userCard from "../../../assets/usersCard.svg";
import alphaBVCard from "../../../assets/alphabv.svg";
import betaBVCard from "../../../assets/betabv.svg";
import rewardCard from "../../../assets/rewardRedeem.svg";
import rankCard from "../../../assets/rewards.svg";
import pendingUserCard from "../../../assets/pendingPayoutsCard.svg";
import CustomSpinner from "../../../customComponents/spinner";
import CustomButton from "../../../customComponents/primaryButton";
import { withStyles } from "@mui/styles";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./dashboard.style";
import moment from "moment";

const CustomerDashboard = ({ classes }) => {
  const [dashboardDetails, setDashobardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [freeUserData, setFreeUserData] = useState(null);
  const [viewTransactions, setViewTransactions] = useState(false);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const metricCardArray = [
    {
      name: "ALPHA BV",
      amount: dashboardDetails?.alpha_bv?.user_count?.bv || 0,
      src: alphaBVCard,
    },
    {
      name: "Beta bv",
      amount: dashboardDetails?.beta_bv?.user_count?.bv || 0,
      src: betaBVCard,
    },
    {
      name: "TOTAL BV(ALPHA + BETA)",
      amount: dashboardDetails?.total_bv || 0,
      src: userCard,
    },
    {
      name: "REWARD REDEEM",
      amount: dashboardDetails?.reward_redeem || 0,
      src: rewardCard,
    },
    {
      name: "RANK",
      amount: dashboardDetails?.rank || "No Rank",
      src: rankCard,
    },
    {
      name: "LIFETIME EARNINGS",
      amount: "0",
      src: pendingUserCard,
    },
  ];

  const packagelistItems = [
    {
      name: "Package name ",
      value: dashboardDetails?.my_package?.package_name
        ? dashboardDetails?.my_package?.package_name
        : "-",
    },
    // {
    //   name: "Package type",
    //   value: dashboardDetails?.my_package?.package_type
    //     ? dashboardDetails?.my_package?.package_type
    //     : "-",
    // },
    {
      name: "Package BV",
      value: dashboardDetails?.my_package?.package_bv
        ? dashboardDetails?.my_package?.package_bv
        : "-",
    },
  ];

  const kyclistItems = [
    {
      name: "Aadhar Card details",
      value: dashboardDetails?.kyc?.aadhar?.is_approved
        ? "Approved"
        : "On Hold",
    },
    {
      name: "PAN Card details",
      value: dashboardDetails?.kyc?.pan?.is_approved ? "Approved" : "On Hold",
    },
    // {
    //   name: "Application form",
    //   value: dashboardDetails?.kyc?.application?.is_approved
    //     ? "Approved"
    //     : "On Hold",
    // },
    {
      name: "Bank Details",
      value: dashboardDetails?.kyc?.bank_details?.is_approved
        ? "Approved"
        : "On Hold",
    },
  ];

  const helplistItems = [
    {
      name: "Email",
      value: "support@ripshipworldventures.com",
    },
    {
      name: "Phone",
      value: "+(91) 8618313067",
    },
  ];

  const pendingAmount = [
    {
      name: "Amount Paid",
      value: dashboardDetails?.free_user_data?.amount_paid,
    },
    {
      name: "Amount Left",
      value: dashboardDetails?.free_user_data?.amount_left,
    },
    {
      name: "Transactions",
      value: (
        <Button onClick={() => setViewTransactions(true)}>
          <RemoveRedEyeRoundedIcon style={{ fontSize: 22, color: "#808080" }} />
        </Button>
      ),
    },
  ];

  const personalDetails = [
    {
      title: "First Name",
      value: userDetails?.user?.first_name,
    },
    {
      title: "Last Name",
      value: userDetails?.user?.last_name,
    },
    {
      title: "Email ID",
      value: userDetails?.user?.email,
    },
    {
      title: "Phone Number",
      value: userDetails?.user?.mobile_number,
    },
    {
      title: "Address",
      value: userDetails?.user?.address,
      view: false,
    },
    {
      title: "City",
      value: userDetails?.user?.city,
      view: false,
    },
    {
      title: "Pin Code",
      value: userDetails?.user?.pin_code,
    },
    {
      title: "State",
      value: userDetails?.user?.state,
    },
    {
      title: "Country",
      value: userDetails?.user?.country,
    },
    {
      title: "Nominee Name",
      value: userDetails?.user?.nominee_name,
    },
    {
      title: "Nominee Age",
      value: userDetails?.user?.nominee_age,
    },
    // {
    //   title: "Relationship with Nominee",
    //   value: userDetails?.user?.nominee_name,
    // },
    // {
    //   title: "Date of Joining",
    //   // value: userDetails?.user?.date_joined,
    // },
    // {
    //   title: "Date of Activation",
    //   // value: userDetails?.user?.activated_on,
    // },
    // {
    //   title: "Selfie Picture",
    //   value: "",
    // },
    {
      title: "Aadhar Number",
      value: userDetails?.user?.aadhar_number,
    },
    // {
    //   title: "Aadhar Card Document",
    //   value: userDetails?.documents?.aadhar?.aadhar,
    // },
    {
      title: "PAN Details ",
      value: userDetails?.user?.pan_number,
    },
    // {
    //   title: "PAN Card Document",
    //   value: userDetails?.documents?.pan?.pan,
    // },
    {
      title: "Bank Name",
      value: userDetails?.bank_details?.bankname,
    },
    {
      title: "Bank Account Number",
      value: userDetails?.bank_details?.account_number,
    },
    {
      title: "Bank IFSC Code",
      value: userDetails?.bank_details?.ifsc,
    },
    {
      title: "Bank Branch",
      value: userDetails?.bank_details?.branch_name,
    },
  ];

  const agreement = [
    {
      p: `Every distributor registered in Ripship World Ventures Private Limited should compulsorily
carry ID card while presenting the business concept to the public. No distributor is entitled to
make fake promises and create f.`,
    },
    {
      p: `As an active distributor of Ripship World Ventures Private Limited I am aware that I am not
supposed to promote or involve my other business/professional activities in the events
conducted by and which are irrelevant to Ripship World Ventures Private Limited`,
    },

    {
      p: `Rispship World Ventures Distributors or Independent Distributors operating their own business
and or not employees/agents of Ripship World Ventures or its affiliated Companies`,
    },

    {
      p: `I agree that I am of age 18 years or above and hold a PAN Card with an assigned PAN number
according to the Government of India`,
    },
    {
      p: `The commissions/bonus/income to the distributor will be released by the company after
deduction of TDS (Tax Deducted at Source). The TDS will be deducted at the rate applicable from
time to time. In case if the PAN Number is not updated during registration the income will be held
until the PAN Card is uploaded`,
    },
    {
      p: `In case of any permanent disability or death of the registered active distributor, the future income
will be directed to the Assigned Nominee.`,
    },
    {
      p: `I am aware that as a distributor once I complete the video consent and accept the terms and
conditions on the website during registration process, I am not entitled to claim any refund and I
am also informed that I am permitted to hold my video consent and acceptance of terms and
conditions as long as I want to claiming for the refund.`,
    },
    {
      p: `As a distributor of Ripship World Ventures Private Limited I am liable to follow the code of
conduct framed by the Company and in case I failed to do so, which includes unethical activities
like misuse of the Company’s Sale Amount or handling financial dealings with the fellow
members of Ripship World Ventures Private Limited, sexual harassment of fellow members,
promoting irrelevant information regarding the business concept of Ripship World Ventures
Private Limited.`,
    },
    {
      p: `The terms and conditions that are mentioned above is in accordance of Ministry of Consumer
Affairs, any dispute arising out of these terms will be subject to exclusive jurisdiction of the courts
of Mangaluru, Karnataka.`,
    },
    {
      p: `These terms and conditions are subject to change from time to time, failure to comply with the
rules of conduct and these conditions may result in action against your independent business.`,
    },
  ];

  const getUserDetails = async () => {
    let userDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.USERPRF,
      requestData: {
        username: JSON.parse(localStorage.getItem("loginData")).username,
      },
    });
    if (userDetails) {
      setUserDetails(userDetails);
      console.log(getUserDetails);
    }
  };

  const getDashboardDetails = async () => {
    let dashboardDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.DASHBOARD,
    });

    if (
      dashboardDetails?.status === "401" ||
      dashboardDetails?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);

    if (dashboardDetails) {
      setLoading(false);
      setDashobardDetails(dashboardDetails?.data);
      setFreeUserData(dashboardDetails?.data?.free_user_data);
    }
  };

  useEffect(() => {
    getDashboardDetails();
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
              <SimpleList
                title={"My PACKAGE"}
                listItems={packagelistItems}
                color={"#C5B1FF"}
              />
              <SimpleList
                title={"KYC"}
                listItems={kyclistItems}
                color={"#40E25B"}
              />

              <SimpleList
                title={"HELP / SUPPORT"}
                listItems={helplistItems}
                color={"#E9C547"}
              />

              {freeUserData && (
                <SimpleList
                  title={"PENDING AMOUNT"}
                  listItems={pendingAmount}
                  color={"#E9C547"}
                />
              )}
            </Grid>

            <Typography
              style={{
                color: "#E9C547",
                fontSize: 24,
                float: "right",
                letterSpacing: "5px",
              }}
            >
              {dashboardDetails?.ip_address}
            </Typography>
          </Grid>
        </>
      )}
      <Modal
        open={viewTransactions}
        onClose={() => setViewTransactions(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              padding: 10,
              alignItems: "center",
            }}
          >
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
              View Transactions
            </Typography>
            <Button
              onClick={() => setViewTransactions(false)}
              style={{ float: "right" }}
            >
              {" "}
              <CloseRoundedIcon
                style={{
                  fontSize: 30,
                  color: "#E9C547",
                  margin: 10,
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              />
            </Button>
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "none",
                padding: 10,
              }}
            >
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Paid
              </Typography>
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Lefthand
              </Typography>
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Paid Date
              </Typography>
            </Grid>
            {freeUserData?.transactions?.map((trans, index) => {
              return (
                <Grid
                  container
                  style={
                    index % 2 === 0
                      ? {
                          background: "#434343",
                          padding: 20,
                          borderRadius: 10,
                          display: "flex",
                          justifyContent: "space-between",
                        }
                      : {
                          background: "none",
                          padding: 10,
                          display: "flex",
                          justifyContent: "space-between",
                        }
                  }
                >
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {trans?.amt_paid}
                  </Typography>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {trans?.amt_left}
                  </Typography>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {moment(trans?.paid_on).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(CustomerDashboard);
