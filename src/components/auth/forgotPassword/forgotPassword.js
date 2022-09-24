import React, { useState } from "react";
import { Grid, Typography, Button, Modal, Box, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import styles from "../customer/customer_login.style";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import Logo from "../../../assets/logo.png";
import { allRequestHandler } from "../../../api/index";
import { URLS } from "../../../constants/index";
import { motion } from "framer-motion";
import { validateEmptyField } from "../../../formValidations/validator";
import { useHistory, Link, Redirect } from "react-router-dom";

const CustomerLogin = ({ classes }) => {
  const [username, setUsername] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [showOtpModal, setShowResetModal] = useState(false);
  const [verifyLoading, setVerfiyLoading] = useState(false);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [redirect, setRedirect] = useState(null);

  const resetPassword = async (e) => {
    if (username !== "" && username !== null && username !== undefined) {
      let userDetails = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.RESETPASSWORD,
        requestData: {
          username: username,
        },
      });

      if (
        userDetails ===
        "An Otp has been sent to you ,please check your registered mobile number "
      ) {
        setSeverity("success");
        setDisplayMsg(userDetails);
        setHandleSnackbar(true);
        setTimeout(() => setShowResetModal(true), 2000);
      } else {
        setSeverity("error");
        setDisplayMsg(userDetails.data);
        setHandleSnackbar(true);
      }
    } else {
      setUserNameError("Please enter your username");
      setHandleSnackbar(true);
      setSeverity("error");
      setRedirect(false);
    }
  };

  const setNewPassword = async () => {
    const reset = {
      username: username,
      password: password,
      otp: otp,
    };
    if (
      username !== null &&
      username !== "" &&
      password !== null &&
      password !== "" &&
      cPassword !== null &&
      cPassword !== "" &&
      otp !== null &&
      otp !== ""
    ) {
      if (password === cPassword) {
        let details = await allRequestHandler({
          requestType: "PATCH",
          requestUrl: URLS.RESETPASSWORD,
          requestData: reset,
        });
        if (details === "Password updated successfully") {
          setSeverity("success");
          setDisplayMsg(details);
          setHandleSnackbar(true);
          setShowResetModal(false);
          <Redirect push to="/login" />;
        } else {
          setSeverity("error");
          setDisplayMsg(details.data);
          setHandleSnackbar(true);
        }
      } else {
        setSeverity("error");
        setDisplayMsg("Both passwords should be same");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Make sure you have entered all the details");
      setHandleSnackbar(true);
    }
  };
  if (redirect) {
    return <Redirect push to="/dashboard" />;
  }
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
      <Grid className={classes.outerLogin}>
        <Grid
          className={classes.leftSection}
          style={{
            position: "relative",
            background:
              "linear-gradient(189.42deg, rgba(233, 197, 71, 0.7) -23.58%, rgba(233, 197, 71, 0) 110.93%",
          }}
        >
          <div style={{ marginTop: "30%", width: "100%" }}>
            <svg
              style={{ width: "100%", height: "100%" }}
              width="500"
              height="392"
              viewBox="0 0 500 392"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-1.79489 392C72.5361 301.116 276.624 141.22 498.328 228.708C720.032 316.197 861.819 374.023 905 392V0H498.328C467.607 56.7609 324.574 163.292 -1.79489 135.327C-328.164 107.363 -137.782 294.791 -1.79489 392Z"
                fill="#E9C547"
              />
            </svg>
          </div>

          <img
            src={Logo}
            alt="Welcome to Arizze"
            width={500}
            height={500}
            style={{ position: "absolute", top: "16%", left: "8%" }}
          />
        </Grid>

        <Grid className={classes.formBox}>
          <>
            <Grid className={classes.emailVerified}>
              <h2 className={classes.heading}>Forgot Password ?</h2>
              <Typography style={{ marginTop: 10 }}>
                Please enter your Username
              </Typography>

              <Grid style={{ marginBottom: 35 }}>
                <CustomTextField
                  fullWidth={true}
                  isRequired={true}
                  label={"Username"}
                  type={"text"}
                  autoComplete="off"
                  autoFocus
                  BoxHeight="68px"
                  placeholder={"Enter your username"}
                  style={{
                    background: "none",
                    marginBottom: 10,
                    border: "1px solid #fff",
                  }}
                  labelStyle={{ color: "white" }}
                  handleChange={(e) => setUsername(e.target.value)}
                  error={userNameError}
                />
              </Grid>

              <Grid style={{ textAlign: "center", marginTop: "3%" }}>
                <motion.div
                  className="animatable"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <CustomButton
                    style={{
                      padding: "26px 40px",
                      background: "#E9C547",
                      marginBottom: 40,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                    text="Reset Password"
                    onClick={resetPassword}
                  />
                </motion.div>
                <Link to="/login">
                  {" "}
                  <CustomButton
                    style={{
                      background: "rgba(222, 159, 76, 0.1)",
                      borderRadius: "20px",
                      padding: "10px 40px",
                      color: "#FFF",
                      fontSize: 16,
                    }}
                    text="Back to Login"
                  />
                </Link>
              </Grid>
            </Grid>
          </>
        </Grid>
      </Grid>
      <Modal
        open={showOtpModal}
        onClose={() => setShowResetModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={classes.modalBox}
          style={{
            color: "#FFF",
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "0 auto",
            borderRadius: 10,
            background: "#282828",
            overflow: "scroll",
            height: "auto",
            width: "70%",
          }}
        >
          <Grid
            container
            style={{
              borderBottom: "2px solid #D0D0D0",
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
              Enter Details
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridGap: 30,
              height: "auto",
              marginBottom: 70,
            }}
          >
            <Grid
              item
              style={{
                border: "2px solid rgb(120, 120, 120)",
                borderRadius: 4,
                color: "#E9C547",
                padding: "15px 15px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Username {""}</Typography>
              <Typography>
                {""} {username}
              </Typography>
            </Grid>
            <Grid style={{ marginBottom: 30 }}>
              <CustomTextField
                fullWidth={true}
                label={"Password"}
                type={"password"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Password"}
                handleChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid style={{ marginBottom: 30 }}>
              <CustomTextField
                fullWidth={true}
                label={"Confirm Password"}
                type={"password"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Confirm Password"}
                handleChange={(e) => setCPassword(e.target.value)}
              />
            </Grid>

            <Grid style={{ marginBottom: 30 }}>
              <CustomTextField
                fullWidth={true}
                label={"Otp"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter received Otp"}
                handleChange={(e) => setOtp(e.target.value)}
              />
            </Grid>
          </Grid>
          <CustomButton
            text="Set New Password"
            style={{
              textAlign: "center",
              padding: "26px 45px",
              background: "#C5B1FF",
              color: "#262626",
              fontWeight: 700,
            }}
            onClick={setNewPassword}
            loading={verifyLoading}
          />
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(CustomerLogin);
