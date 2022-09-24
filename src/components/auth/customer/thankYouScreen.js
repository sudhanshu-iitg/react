import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import Logo from "../../../assets/logo.png";
import styles from "./customer_register.style";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import { motion } from "framer-motion";
import thankyoupage from "../../../assets/thankyoupage.svg";
import thankDesk from ".././../../assets/thankYouDesktop.svg";
import { withRouter, useLocation, Redirect } from "react-router-dom";

const ThankYouScreen = ({ classes, goToNext }) => {
  const [goToLogin, setGoToLogin] = useState(false);

  if (goToLogin) return <Redirect exact push to="/login" />;
  return (
    <>
      <Grid
        className={classes.desktopRegister}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {/* <Grid
          className={classes.leftSection}
          style={{
            position: "relative",
            background:
              "linear-gradient(189.42deg, rgba(233, 197, 71, 0.7) -23.58%, rgba(233, 197, 71, 0) 110.93%",
          }}
        >
          <div style={{ marginTop: "20%", width: "100%" }}>
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
            width={292}
            height={300}
            style={{ position: "absolute", top: "10%", left: "5%" }}
          />
        </Grid> */}
        <Grid
          style={{
            height: "auto",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: 30,
            textAlign: "center",
          }}
        >
          <Grid>
            <img src={thankDesk} height={300} width={400} alt="" />
            <Grid
              container
              style={{
                justifyContent: "center",
                flexDirection: "column",
                width: "80%",
                background: "#E9C547",
                borderRadius: 10,
                padding: "25px 42px",
                textAlign: "center",
              }}
            >
              <div>
                {" "}
                <svg
                  width="47"
                  height="47"
                  viewBox="0 0 47 47"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.5 0.125C10.5906 0.125 0.125 10.5906 0.125 23.5C0.125 36.4094 10.5906 46.875 23.5 46.875C36.4094 46.875 46.875 36.4094 46.875 23.5C46.875 10.5906 36.4094 0.125 23.5 0.125ZM33.632 19.5475C33.8186 19.3342 33.9606 19.0858 34.0497 18.8169C34.1389 18.5479 34.1733 18.2638 34.1511 17.9813C34.1288 17.6989 34.0503 17.4237 33.9201 17.172C33.7899 16.9203 33.6107 16.6972 33.393 16.5159C33.1754 16.3345 32.9236 16.1984 32.6526 16.1158C32.3816 16.0331 32.0967 16.0055 31.8149 16.0345C31.533 16.0635 31.2598 16.1487 31.0113 16.2848C30.7629 16.421 30.5441 16.6055 30.368 16.8275L21.2305 27.7904L16.5024 23.0601C16.1016 22.673 15.5648 22.4589 15.0076 22.4637C14.4505 22.4685 13.9175 22.692 13.5235 23.086C13.1295 23.48 12.906 24.013 12.9012 24.5701C12.8964 25.1273 13.1105 25.6641 13.4976 26.0649L19.8726 32.4399C20.0814 32.6485 20.3314 32.8114 20.6066 32.9181C20.8819 33.0248 21.1763 33.073 21.4712 33.0596C21.7661 33.0462 22.0549 32.9715 22.3194 32.8403C22.5838 32.7091 22.818 32.5242 23.007 32.2975L33.632 19.5475Z"
                    fill="#262626"
                  />
                </svg>
              </div>
              <h2 style={{ color: "#fff", marginBottom: 0 }}>THANK YOU!</h2>
              <p style={{ color: "#fff" }}>
                Your registration has been successfully considered, please wait
                for a few hours while the admin processes your application. You
                will be notified regarding the status of the application through
                the registered mail id and also you will be receiving the
                customer ID through the mail ID.
              </p>
            </Grid>
            <Typography
              style={{
                color: "#C5B1FF",
                fontWeight: 700,
                fontSize: 15,
                margin: 13,
                width: "75%",
              }}
            >
              {" "}
              Already registered?
            </Typography>

            <Grid container style={{ justifyContent: "center", width: "80%" }}>
              <motion.div
                className="animatable"
                whileHover={{
                  scale: 1.011,
                  transition: { duration: 0.3 },
                }}
              >
                <CustomButton
                  text="LOGIN"
                  style={{
                    margin: "20px auto",
                    textAlign: "center",
                    padding: "26px 45px",
                    background: "#a38ce8;",
                    color: "#262626",
                    fontWeight: 700,
                  }}
                  onClick={() => setGoToLogin(true)}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*Mobile */}
      <Grid className={classes.containerClass}>
        <Grid>
          <svg
            width="100%"
            height="301"
            viewBox="0 0 390 301"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.361031 301C38.8729 300.333 135.303 275.641 212.927 182.214C290.551 88.7876 403.986 78.3327 451 84.7836V-32H389.981C359.972 25.3908 259.441 129.095 97.391 84.7836C-21.9872 52.1407 -64.0082 25.9443 -73.6618 10.1427V301H0.361031Z"
              fill="#C5B1FF"
              fill-opacity="0.2"
            />
          </svg>

          <img
            src={thankyoupage}
            alt="logo"
            className={classes.logoContainer}
          />
          <Grid className={classes.welcomeMsg} style={{ marginTop: 40 }}>
            <h1>THANK YOU!</h1>
            <p>
              Your registration has been successfully considered, please wait
              for a few hours while the admin processes your application. You
              will be notified regarding the status of the application through
              the registered mail id and also you will be receiving the customer
              ID through the mail ID.
            </p>
          </Grid>

          <Grid style={{ width: "50%", margin: "20px auto", marginBottom: 30 }}>
            <Typography
              style={{
                color: "#FFF",
                fontWeight: 700,
                fontSize: 15,
                margin: "0px auto",
                marginBottom: 13,
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {" "}
              Already registered?
            </Typography>
            <CustomButton
              text="Login"
              style={{
                margin: "20px auto",
                textAlign: "center",
                padding: "26px 55px",
                width: "100%",
              }}
              onClick={() => setGoToLogin(true)}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default withStyles(styles)(ThankYouScreen);
