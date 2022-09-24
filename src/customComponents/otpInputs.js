import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";

const styles = (theme) => ({
  otpInput: {
    width: "10%",
    height: 60,
    borderRadius: 10,
    fontSize: 40,
    border: "1px solid #fff",
    marginRight: 10,
    background: "none",
    color: "#fff",
    textAlign: "center",
  },
  centerAlign: {
    display: "flex",
    justifyContent: "center",
    margin: "50px 10px",
  },
});

const OTPBox = ({ classes, otp, setOtp }) => {
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <>
      <Grid container className={classes.centerAlign}>
        <Grid item>
          {otp.map((data, index) => {
            return (
              <input
                className={classes.otpInput}
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}

          {/* <p>OTP Entered - {otp.join("")}</p>
          <p>
            <button
              className="btn btn-secondary mr-2"
              onClick={(e) => setOtp([...otp.map((v) => "")])}
            >
              Clear
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => alert("Entered OTP is " + otp.join(""))}
            >
              Verify OTP
            </button>
          </p> */}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(OTPBox);
