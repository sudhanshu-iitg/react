import React, { useState } from "react";
import { Grid, Typography, Button, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import styles from "./admin_auth.style";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import Logo from "../../../assets/logo.png";
import { allRequestHandler } from "../../../api/index";
import { URLS } from "../../../constants/index";
import { motion } from "framer-motion";
import { validateEmptyField } from "../../../formValidations/validator";
import { Redirect } from "react-router-dom";
const AdminLogin = ({ classes }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [loginInProcess, setLoginInProcess] = useState(false);

  const loginDetailsTextFields = [
    {
      name: "Username",
      value: null,
      type: "text",
      error: emailError,
    },
    {
      name: "Password",
      value: null,
      type: "password",
      error: passwordError,
    },
  ];

  const setRestrictions = () => {
    if (JSON.parse(localStorage.getItem("loginData")).is_admin) {
      return <Redirect push to="/admin/dashboard" />;
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Trips"
    ) {
      return <Redirect push to="/admin/trip-requests" />;
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Payouts"
    ) {
      return <Redirect push to="/admin/payouts" />;
    } else if (
      JSON.parse(localStorage.getItem("loginData")).is_staff &&
      JSON.parse(localStorage.getItem("loginData")).department === "Activation"
    ) {
      return <Redirect push to="/admin/users" />;
    }
  };

  const logIn = async (e) => {
    sessionStorage.setItem("userType", "admin");
    if (
      username !== "" &&
      password !== "" &&
      username !== null &&
      password !== null
    ) {
      setLoginInProcess(true);
      let getToken = await allRequestHandler({
        requestType: "LOGIN",
        requestUrl: URLS.ADMINLOGIN,
        requestData: {
          username: btoa(username),
          password: btoa(password),
          portal: btoa("admin"),
        },
      });
      if (getToken?.data.response?.access_token) {
        localStorage.setItem(
          "loginData",
          JSON.stringify(getToken.data.response)
        );
        sessionStorage.setItem("jwtToken", getToken.data.response.access_token);
        setDisplayMsg("Login Sucessful");
        setSeverity("success");
        setHandleSnackbar(true);

        setTimeout(() => setRedirect(true), 1000);
      } else {
        setLoginInProcess(false);
        let validationMsg = "Please check your credentials";
        setDisplayMsg(validationMsg);
        setSeverity("error");
        setHandleSnackbar(true);
        setRedirect(false);
      }
    } else {
      setLoginInProcess(false);
      setDisplayMsg("Please enter your crendentials");
      setHandleSnackbar(true);
      setSeverity("error");
      setRedirect(false);
    }
  };

  const onChange = (e, name) => {
    if (name === "Username") {
      setUsername(e.target.value);
      setEmailError(validateEmptyField(e.target.value));
    } else {
      setPassword(e.target.value);
      setPasswordError(validateEmptyField(e.target.value));
    }
  };

  if (redirect) {
    return setRestrictions();
  }

  return (
    <>
      <Grid className={classes.outerLogin}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={2000}
          open={handleSnackbar}
          onClose={() => setHandleSnackbar(false)}
        >
          <MuiAlert elevation={6} variant="filled" severity={severity}>
            {" "}
            {displayMsg}{" "}
          </MuiAlert>
        </Snackbar>
        <Grid className={classes.leftSection}>
          <img src={Logo} alt="Welcome to Arizze" width={"100%"} />
        </Grid>

        <Grid className={classes.formBox}>
          <>
            <Grid className={classes.emailVerified}>
              <h2 className={classes.heading}>ADMIN LOGIN</h2>
              <form>
                {loginDetailsTextFields.map((field) => {
                  return (
                    <Grid style={{ marginBottom: 35 }}>
                      <CustomTextField
                        fullWidth={true}
                        label={field.name}
                        type={field.type}
                        autoComplete="off"
                        isRequired={true}
                        autoFocus
                        BoxHeight="68px"
                        value={field.value}
                        placeholder={field.placeholder}
                        style={{
                          background: "none",
                          marginBottom: 10,
                          border: "1px solid #fff",
                          width: "10%",
                        }}
                        labelStyle={{ color: "white" }}
                        handleChange={(e) => onChange(e, field.name)}
                        error={field.error}
                      />
                    </Grid>
                  );
                })}
              </form>
              <Grid style={{ textAlign: "center" }}>
                <motion.div
                  className="animatable"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <CustomButton
                    style={
                      loginInProcess
                        ? {
                            padding: "26px 40px",
                            marginBottom: 40,
                            fontWeight: 500,
                            fontSize: 16,
                            pointerEvents: "none",
                            background: "#787878",
                            color: "#BCBCBC",
                          }
                        : {
                            padding: "26px 40px",
                            background: "#E9C547",
                            marginBottom: 40,
                            fontWeight: 500,
                            fontSize: 16,
                          }
                    }
                    text="LOGIN"
                    onClick={logIn}
                  />
                </motion.div>

                <CustomButton
                  style={{
                    background: "rgba(222, 159, 76, 0.1)",
                    borderRadius: "20px",
                    padding: "10px 40px",
                    color: "#FFF",
                    fontSize: 16,
                  }}
                  text=" Forgot Password ?"
                />
              </Grid>
            </Grid>
          </>

          {/* <Grid className={classes.emailVerified} style={{ width: "100%" }}>
              <Grid style={{ textAlign: "center" }}>
                <h2>Verify Your Email Address</h2>
                <p className={classes.welcomeTxt}>
                  Please enter the six digit code sent to your email
                  test@gmail.com
                </p>
                <OTPInput />

                <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                  {" "}
                  <motion.div
                    className="animatable"
                    whileHover={{
                      scale: 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <CustomButton
                      style={{
                        padding: "26px 40px",
                        background: "rgba(255, 255, 255, 0.25)",
                        marginBottom: 40,
                      }}
                      text="VERIFY AND LOGIN"
                      onClick={() => setVerified(false)}
                    />
                  </motion.div>
                </Link>
                <span className={classes.forgotPassword}>Resend code?</span>
              </Grid>
            </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(AdminLogin);
