import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./customer_register.style";
import Logo from "../../../assets/logo.png";
import { withStyles } from "@mui/styles";
import SponsorDetails from "./sponsorDetails";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CustomSpinner from "../../../customComponents/spinner";
import Illustration from "../../../assets/bankDetails.svg";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import {
  validateEmptyField,
  validateEmail,
  validateMobileNumber,
  validatePassword,
  validateConfirmPassword,
} from "../../../formValidations/validator";
import { motion } from "framer-motion";

const BankDetails = ({ classes, goToNext, goToPrev, details, setDetails }) => {
  const [loading, setLoading] = useState(true);
  const [sponsorId, setSponsorId] = useState(null);
  const [sponsorName, setSponsorName] = useState(null);
  const [bank, setBank] = useState(null);
  const [accNo, setAccNo] = useState(null);
  const [ifscCode, setIfscCode] = useState(null);
  const [branch, setBranch] = useState(null);
  const [payeeName, setPayeeName] = useState(null);
  const [payeeNameError, setPayeeNameError] = useState(null);
  const [bankError, setBankError] = useState(null);
  const [selectedPassBookFile, setSelectedPassBookFile] = useState(null);

  const [accNoError, setAccNoError] = useState(null);
  const [ifscCodeError, setIfscCodeError] = useState(null);
  const [branchError, setBranchError] = useState(null);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    getSponsorDetails();
  }, []);

  const getSponsorDetails = async () => {
    let str = window.location.href;
    let n = str.lastIndexOf("/");
    var result = str.substring(n + 1);

    let sponsorDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPONSORDETAILS + result,
    });
    let listItems = [];
    if (sponsorDetails.response) {
      setLoading(false);
      setSponsorId(sponsorDetails?.response?.sponsor_id);
      setSponsorName(sponsorDetails?.response?.sponsor_name);
    }
  };

  const bankDetailsTextFields = [
    {
      name: "Payee Name",
      placeholder: "Payee Name should be same bank account payee name",
      value: null,
      type: "text",
      error: payeeNameError,
    },
    {
      name: "Bank Name",
      placeholder: "Enter bank name",
      value: null,
      type: "text",
      error: bankError,
    },
    {
      name: "Bank Account Number",
      placeholder: "Enter bank account no",
      value: null,
      type: "number",
      error: accNoError,
    },
    {
      name: "Bank IFSC Code",
      placeholder: "Enter bank ifsc code",
      value: null,
      type: "text",
      error: ifscCodeError,
    },
    {
      name: "Branch Name",
      placeholder: "Enter branch name",
      value: null,
      type: "text",
      error: branchError,
    },
  ];

  const onChange = (e, name) => {
    if (name === "Payee Name") {
      setPayeeName(e.target.value);
      setPayeeNameError(validateEmptyField(e.target.value));
    } else if (name === "Bank Name") {
      setBank(e.target.value);
      setBankError(validateEmptyField(e.target.value));
    } else if (name === "Bank Account Number") {
      setAccNo(e.target.value);
      setAccNoError(validateEmptyField(e.target.value));
    } else if (name === "Bank IFSC Code") {
      setIfscCode(e.target.value);
      setIfscCodeError(validateEmptyField(e.target.value));
    } else if (name === "Branch Name") {
      setBranch(e.target.value);
      setBranchError(validateEmptyField(e.target.value));
    } else console.log("no val");
  };

  const uploadPassBook = (e) => {
    let selectedFile = e.target.files[0];
    const fsize = selectedFile.size;
    const file = Math.round(fsize / 1024);
    if (file > 2048) {
      setSeverity("error");
      setDisplayMsg("File too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
    } else {
      setSelectedPassBookFile(selectedFile);
    }
  };

  const saveAndContinue = async () => {
    //comment out
    // goToNext();

    if (
      bank !== null &&
      accNo !== null &&
      ifscCode !== null &&
      branch !== null &&
      payeeName !== null &&
      selectedPassBookFile !== null
    ) {
      const formData = new FormData();
      formData.append(
        "passbook_image",
        selectedPassBookFile,
        selectedPassBookFile?.name + "-" + sessionStorage?.mobile
      );
      formData.append("bankname", bank);
      formData.append("account_number", accNo);
      formData.append("ifsc", ifscCode);
      formData.append("branch_name", branch);
      formData.append("mobile_number", sessionStorage?.mobile);
      formData.append("payee_name", payeeName);

      let uploadBankDetails = await allRequestHandler({
        requestType: "IMAGE",
        requestUrl: URLS.BANKDETAILS,
        requestData: formData,
      });

      if (uploadBankDetails.response) {
        setSeverity("success");
        setDisplayMsg("Bank Details Sent!");
        setHandleSnackbar(true);
        setTimeout(() => goToNext(), 1500);
      } else {
        setSeverity("error");
        setDisplayMsg("Oops something went wrong!");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all your details to continue");
      setHandleSnackbar(true);
    }
  };

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
          {/*Desktop section */}
          <Grid className={classes.desktopRegister}>
            <Grid
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
            </Grid>
            <Grid
              style={{
                width: "100%",
                height: "auto",
                justifyContent: "space-between",
                position: "relative",
                padding: 30,
                overflowY: "scroll",
              }}
            >
              <Grid container style={{}}>
                <Grid item className={classes.sponsorDetails}>
                  <Typography>Sponsor Name: {sponsorName}</Typography>
                </Grid>
              </Grid>
              <Grid>
                <h2 style={{ color: "#FFF" }}>BANK DETAILS</h2>
                <Grid className={classes.formBox}>
                  <Grid style={{ width: "45%" }}>
                    {bankDetailsTextFields.slice(0, 3).map((field) => {
                      return (
                        <Grid style={{ marginBottom: 10 }}>
                          <CustomTextField
                            fullWidth={true}
                            label={field.name}
                            type={field.type}
                            autoComplete="off"
                            autoFocus
                            BoxHeight="68px"
                            height={100}
                            value={field.value}
                            placeholder={field.placeholder}
                            handleChange={(e) => onChange(e, field.name)}
                            disabled={field.disabled}
                            error={field.error}
                            isRequired={true}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid style={{ width: "45%" }}>
                    {bankDetailsTextFields.slice(-2).map((field) => {
                      return (
                        <Grid style={{ marginBottom: 10 }}>
                          <CustomTextField
                            height={100}
                            fullWidth={true}
                            label={field.name}
                            type={field.type}
                            autoComplete="off"
                            autoFocus
                            isRequired={true}
                            BoxHeight="18px"
                            handleChange={(e) => onChange(e, field.name)}
                            value={field.value}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            error={field.error}
                          />
                        </Grid>
                      );
                    })}
                    <Typography
                      style={{
                        color: "#FFF",
                        fontWeight: 700,
                        fontSize: 15,
                        marginTop: 25,
                        marginBottom: 15,
                      }}
                    >
                      {" "}
                      Upload Pass book
                    </Typography>
                    <div style={{ display: "flex" }}>
                      <label
                        htmlFor="my-pass-book"
                        className={classes.uploadBtn}
                      >
                        Select File
                        <input
                          style={{ display: "none" }}
                          id="my-pass-book"
                          type="file"
                          name="file"
                          onChange={uploadPassBook}
                          required
                        />
                      </label>
                      <Typography
                        style={{
                          color: "#ccc",
                          fontWeight: 400,
                          fontSize: 12,
                          margin: 8,
                        }}
                      >
                        {" "}
                        (File should be less than 2MB)
                      </Typography>
                      <Typography
                        style={{
                          color: "#FFF",
                          fontWeight: 700,
                          fontSize: 15,
                          margin: 8,
                        }}
                      >
                        {selectedPassBookFile?.name}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{ justifyContent: "left", marginBottom: "20px" }}
                >
                  <motion.div
                    className="animatable"
                    whileHover={{
                      scale: 1.011,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <CustomButton
                      text="Save and Continue"
                      style={{
                        margin: "20px auto",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#a38ce8",
                        color: "#262626",
                        fontWeight: 700,
                      }}
                      onClick={saveAndContinue}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Mobile */}
          <Grid className={classes.containerClass}>
            <Grid className={classes.subMobileSection}>
              <SponsorDetails />
              <Grid className={classes.arrow} style={{ marginBottom: 30 }}>
                <span className={classes.personalDetailsButton}>
                  BANK DETAILS
                </span>
              </Grid>
              <Grid style={{ width: "90%", margin: "20px auto" }}>
                {bankDetailsTextFields.map((field) => {
                  return (
                    <Grid>
                      <CustomTextField
                        fullWidth={true}
                        label={field.name}
                        type={field.type}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="18px"
                        handleChange={(e) => onChange(e, field.name)}
                        value={field.value}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        error={field.error}
                        isRequired={true}
                      />
                    </Grid>
                  );
                })}
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 15,
                    marginTop: 25,
                    marginBottom: 15,
                  }}
                >
                  Upload Pass book
                </Typography>
                <div style={{ display: "flex" }}>
                  <label htmlFor="my-pass-book" className={classes.uploadBtn}>
                    Select File
                    <input
                      style={{ display: "none" }}
                      id="my-pass-book"
                      type="file"
                      name="file"
                      onChange={uploadPassBook}
                      required
                    />
                  </label>
                  <Typography
                    style={{
                      color: "#ccc",
                      fontWeight: 400,
                      fontSize: 12,
                      margin: 8,
                    }}
                  >
                    {" "}
                    (File should be less than 2MB)
                  </Typography>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontWeight: 700,
                      fontSize: 15,
                      margin: 8,
                    }}
                  >
                    {selectedPassBookFile?.name}
                  </Typography>
                </div>
              </Grid>
              <Grid style={{ width: "80%", margin: "0px auto" }}>
                <CustomButton
                  text="Save and Continue"
                  onClick={saveAndContinue}
                  style={{
                    margin: "20px auto",
                    textAlign: "center",
                    padding: "26px 55px",
                    background: "#a38ce8",
                    color: "#fff",
                    width: "100%",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(BankDetails);
