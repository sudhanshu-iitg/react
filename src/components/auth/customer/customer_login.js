import React, { useState } from "react";
import { Grid, Typography, Button, Snackbar } from "@mui/material";
import { withStyles } from "@mui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./customer_login.style";
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
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [redirect, setRedirect] = useState(null);
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
  const logIn = async (e) => {
    sessionStorage.setItem("userType", "customer");
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
          portal: btoa("user"),
        },
      });
      if (getToken?.data.response?.access_token) {
        localStorage.setItem(
          "loginData",
          JSON.stringify(getToken.data.response)
        );
        sessionStorage.setItem("jwtToken", getToken.data.response.access_token);
        localStorage.setItem("userType", "customer");
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
    return <Redirect push to="/dashboard" />;
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
              <Grid container>
                <img
                  src={Logo}
                  height={70}
                  width={70}
                  style={{ marginTop: 25 }}
                  alt=""
                />
                <h2 className={classes.heading}>RIPSHIP WORLD VENTURES WEB</h2>
              </Grid>

              <h2 className={classes.heading}>Login</h2>
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
              {/* <Typography style={{ fontSize: 18 }}>
                Dont have an account ?
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      color: "#E9C547",
                      fontSize: 16,
                      margin: "0px 5px 15px 10px",
                      textDecoration: "none",
                    }}
                  >
                    Register Here
                  </span>
                </Link>
              </Typography> */}
              <Grid style={{ textAlign: "center", marginTop: "3%" }}>
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

                <Link to="/forgot-password">
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
                </Link>
              </Grid>
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CustomerLogin);
