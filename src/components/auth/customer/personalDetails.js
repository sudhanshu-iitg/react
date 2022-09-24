import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import { Grid, Typography, Button, Snackbar, Modal, Box } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./customer_register.style";
import { withStyles } from "@mui/styles";
import SponsorDetails from "./sponsorDetails";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CustomDropdown from "../../../customComponents/dropdown";
import { motion } from "framer-motion";
import { URLS } from "../../../constants/index";
import CustomSpinner from "../../../customComponents/spinner";
import OTPInput from "../../../customComponents/otpInputs";
import { allRequestHandler } from "../../../api/index";

import Timer from "otp-timer";
import axios from "axios";
import {
  validateEmptyField,
  validateEmail,
  validateMobileNumber,
  validatePassword,
  validateConfirmPassword,
} from "../../../formValidations/validator";

const PersonalDetails = ({ classes, goToNext, setDetails, setCurrentStep }) => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [packageSelection, setPackageSelection] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [nomineeAge, setNomineeAge] = useState(null);
  const [nomineeName, setNomineeName] = useState(null);
  const [nomineeRelation, setNomineeRelation] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [packageItems, setPackageItems] = useState([]);
  const [sponsorId, setSponsorId] = useState(null);
  const [sponsorName, setSponsorName] = useState(null);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [packageSelectionError, setPackageSelectionError] = useState(null);
  const [emailIdError, setEmailIdError] = useState(null);
  const [mobileNoError, setMobileNoError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [pinCodeError, setPinCodeError] = useState(null);
  const [nomineeAgeError, setNomineeAgeError] = useState(null);
  const [nomineeNameError, setNomineeNameError] = useState(null);
  const [nomineeRelationError, setNomineeRelationError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [btnLoading, setBtnLoading] = useState(false);
  const [verifyLoading, setVerfiyLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [resumeModal, setResumeModal] = React.useState(false);
  const [resumeMobileNo, setResumeMobileNo] = useState(null);
  const [resumebtnDisable, setResumeBtnDisable] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openResumeModal = () => setResumeModal(true);
  const closeResumeModal = () => setResumeModal(false);

  const autoFillPlace = async () => {
    let placeDeets = await axios({
      method: "get",
      url: `https://api.postalpincode.in/pincode/${pinCode}`,
    });
    if (placeDeets?.data[0]?.Status === "Success") {
      setCity(placeDeets?.data[0].PostOffice[0].District);
      setState(placeDeets?.data[0].PostOffice[0].State);
      setCountry(placeDeets?.data[0].PostOffice[0].Country);
    } else {
      setCity(null);
      setState(null);
      setCountry(null);
      setSeverity("error");
      setDisplayMsg("Enter a valid PIN Code");
      setHandleSnackbar(true);
    }
  };

  const personalDetailsTextFields = [
    {
      name: "First Name",
      placeholder: "Enter your first name",
      value: null,
      type: "text",
      error: firstNameError,
    },
    {
      name: "Last Name",
      placeholder: "Enter your last name",
      value: null,
      type: "text",
      error: lastNameError,
    },
    {
      name: "Email ID",
      placeholder: "Enter your email address",
      value: null,
      type: "text",
      error: emailIdError,
    },
    {
      name: "Mobile Number",
      placeholder: "Enter your mobile number",
      value: null,
      type: "tel",
      error: mobileNoError,
    },
    {
      name: "Address",
      placeholder: "Enter your address",
      value: null,
      type: "text",
      error: addressError,
    },
  ];

  const nomineeDetails = [
    {
      name: "Nominee Name",
      placeholder: "Enter nominee name",
      value: null,
      type: "text",
      error: nomineeNameError,
    },
    {
      name: "Nominee Age",
      placeholder: "Enter nominee age",
      value: null,
      type: "number",
      error: nomineeAgeError,
    },
    {
      name: "Relationship with Nominee",
      placeholder: "Enter relationship with nominee",
      value: null,
      type: "text",
      error: nomineeRelationError,
    },
  ];

  const passwordFields = [
    {
      name: "Password",
      placeholder: "Enter your password",
      value: null,
      type: "password",
      error: passwordError,
    },
    {
      name: "Confirm Password",
      placeholder: "Confirm your password",
      value: null,
      type: "password",
      error: confirmPasswordError,
    },
  ];

  const onChange = (e, name) => {
    if (name === "First Name") {
      setFirstName(e.target.value);
      setFirstNameError(validateEmptyField(e.target.value));
    } else if (name === "Last Name") {
      setLastName(e.target.value);
      setLastNameError(validateEmptyField(e.target.value));
    } else if (name === "Email ID") {
      setEmailId(e.target.value);
      setEmailIdError(validateEmail(e.target.value));
    } else if (name === "Mobile Number") {
      setMobileNo(e.target.value);
      setMobileNoError(validateEmptyField(e.target.value));
    } else if (name === "Address") {
      setAddress(e.target.value);
      setAddressError(validateEmptyField(e.target.value));
    } else if (name === "City") {
      setCity(e.target.value);
      setCityError(validateEmptyField(e.target.value));
    } else if (name === "State") {
      setState(e.target.value);
      setStateError(validateEmptyField(e.target.value));
    } else if (name === "Country") {
      setCountry(e.target.value);
      setCountryError(validateEmptyField(e.target.value));
    } else if (name === "PIN Code") {
      setPinCode(e.target.value);
      setPinCodeError(validateEmptyField(e.target.value));
    } else if (name === "Nominee Name") {
      setNomineeName(e.target.value);
      setNomineeNameError(validateEmptyField(e.target.value));
    } else if (name === "Nominee Age") {
      setNomineeAge(e.target.value);
      setNomineeAgeError(validateEmptyField(e.target.value));
    } else if (name === "Relationship with Nominee") {
      setNomineeRelation(e.target.value);
      setNomineeRelationError(validateEmptyField(e.target.value));
    } else if (name === "Password") {
      setPassword(e.target.value);
      setPasswordError(validateEmptyField(e.target.value));
    } else if (name === "Confirm Password") {
      setConfirmPassword(e.target.value);
      setConfirmPasswordError(
        validateConfirmPassword(password, e.target.value)
      );
    } else console.log("no val");
  };

  const openModal = () => {
    setShowOtpModal(true);
    setOtp(new Array(6).fill(""));
    setVerfiyLoading(false);
  };

  const saveAndContinue = async () => {
    //comment out later
    // goToNext();

    if (
      firstName !== null &&
      firstName !== "" &&
      lastName !== null &&
      lastName !== "" &&
      emailId !== null &&
      emailId !== "" &&
      mobileNo !== null &&
      mobileNo !== "" &&
      address !== null &&
      address !== "" &&
      city !== null &&
      city !== "" &&
      pinCode !== null &&
      pinCode !== "" &&
      state !== null &&
      state !== "" &&
      country !== null &&
      country !== "" &&
      nomineeName !== null &&
      nomineeName !== "" &&
      nomineeAge !== null &&
      nomineeAge !== "" &&
      nomineeRelation !== null &&
      nomineeRelation !== "" &&
      password !== null &&
      password !== "" &&
      confirmPassword !== null &&
      confirmPassword !== ""
    ) {
      const mobileDetails = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.FORMPREVIEW,
        requestData: { mobile_number: mobileNo },
      });
      if (mobileDetails.response && mobileDetails.response !== false) {
        setSeverity("error");
        setDisplayMsg(
          "User with this mobile number already exist, please use different mobile number"
        );
        setHandleSnackbar(true);
        return;
      }
      sessionStorage.setItem("mobile", mobileNo);
      sessionStorage.setItem("selectedPackage", packageSelection);
      setBtnLoading(true);
      const sendOtp = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.OTP,
        requestData: { mobile_number: mobileNo },
      });
      setBtnLoading(false);
      openModal();
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all your details to continue");
      setHandleSnackbar(true);
    }
  };

  const getSponsorDetails = async () => {
    let str = window.location.href;
    let n = str.lastIndexOf("/");
    var result = str.substring(n + 1);

    let sponsorDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPONSORDETAILS + result,
    });

    let listItems = [];
    setPackageItems(
      sponsorDetails?.response?.packages.map((pack) => {
        return {
          id: pack?.id,
          name: pack?.name,
          item_id: pack?.package_id,
        };
      })
    );
    if (sponsorDetails?.response) {
      setLoading(false);
      setSponsorId(sponsorDetails?.response?.sponsor_id);
      setSponsorName(sponsorDetails?.response?.sponsor_name);
    }
  };

  const verifyOtp = async () => {
    const personal = {
      first_name: firstName,
      last_name: lastName,
      package_selected: packageSelection,
      email: emailId,
      mobile_number: mobileNo,
      address: address,
      city: city,
      state: state,
      country: country,
      nominee_age: nomineeAge,
      nominee_name: nomineeName,
      nominee_relation: nomineeRelation,
      password: password,
      sponsor_id: sponsorId,
      sponsor_name: sponsorName,
      pin_code: pinCode,
      otp: otp.join(""),
    };

    let str = window.location.href;
    let n = str.lastIndexOf("/");
    var result = str.substring(n + 1);
    setVerfiyLoading(true);
    const sendPersonalDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.PERSONALDETAILS + result,
      requestData: personal,
    });

    if (sendPersonalDetails.response === "User registered successfully") {
      sessionStorage.setItem("email", emailId);
      setSeverity("success");
      setDisplayMsg("Personal Details Sent!");
      setHandleSnackbar(true);
      setVerfiyLoading(false);
      setTimeout(() => goToNext(), 1500);
    } else {
      setSeverity("error");
      setDisplayMsg(sendPersonalDetails.data.response);
      setHandleSnackbar(true);
      setHandleSnackbar(true);
      setVerfiyLoading(false);
      setOtp(new Array(6).fill(""));
      if (sendPersonalDetails.data.response === "Account already exist") {
        setShowOtpModal(false);
      }
    }
  };

  const resendOtp = async () => {
    const sendOtp = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.OTP,
      requestData: { mobile_number: mobileNo },
    });
  };

  const resumeRegistration = async () => {
    closeResumeModal();
    if (resumeMobileNo !== null && resumeMobileNo !== "") {
      const mobileDetails = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.FORMPREVIEW,
        requestData: { mobile_number: resumeMobileNo },
      });
      if (mobileDetails?.response === false) {
        setSeverity("error");
        setDisplayMsg("User with this mobile no doesn't exist");
        setHandleSnackbar(true);
        setResumeBtnDisable(true);
        return;
      }
      sessionStorage.setItem("mobile", resumeMobileNo);
      sessionStorage.setItem("email", mobileDetails?.response?.user?.email);
      if (mobileDetails?.response?.step_progress) {
        setCurrentStep(mobileDetails?.response?.step_progress - 1);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all your details to continue");
      setHandleSnackbar(true);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getSponsorDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
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
          <Modal
            open={showOtpModal}
            onClose={() => setShowOtpModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className={classes.modalBox}
              style={{ height: "auto", textAlign: "center", color: "#fff" }}
            >
              <h2>Verify Your Details Please</h2>
              <p style={{ color: "#fff" }}>
                Please enter the six digit code sent to your mobile number
              </p>
              <OTPInput otp={otp} setOtp={setOtp} />
              <div>
                <Timer
                  seconds={120}
                  minutes={0}
                  resend={resendOtp}
                  textColor={"#FFF"}
                  buttonColor={"#fff"}
                  background={"#664FA7"}
                />
              </div>
              <CustomButton
                text="Verify"
                style={{
                  margin: "20px auto",
                  textAlign: "center",
                  padding: "26px 45px",
                  background: "#C5B1FF",
                  color: "#262626",
                  fontWeight: 700,
                }}
                onClick={verifyOtp}
                loading={verifyLoading}
              />
            </Box>
          </Modal>
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
              <Grid>
                <Grid className={classes.welcomeSection}>
                  <h1 className={classes.welcome}>WELCOME!</h1>
                  <p className={classes.welcomeTxt}>
                    Hello there, you are in the right place for business and
                    travel. Please fill in the fields below to complete your
                    registration and to get your trip!
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              style={{
                width: "100%",
                height: "100vh",
                overflowY: "scroll",
                justifyContent: "space-between",
                position: "relative",
                padding: 30,
                background: "#292929",
              }}
            >
              <Grid>
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item className={classes.sponsorDetails}>
                    <Typography style={{ lineHeight: "24px" }}>
                      Sponsor Name: {""}
                      {""} {sponsorName}
                    </Typography>
                  </Grid>

                  <Button
                    onClick={openResumeModal}
                    style={
                      resumebtnDisable
                        ? {
                            padding: "1rem 3rem",
                            background: "#787878",
                            color: "#BCBCBC",
                            fontSize: 16,
                            borderRadius: 4,
                            fontWeight: 700,
                            pointerEvents: "none",
                          }
                        : {
                            padding: "1rem 3rem",
                            background: "#E9C547",
                            color: "#262626",
                            fontSize: 16,
                            borderRadius: 4,
                            fontWeight: 700,
                          }
                    }
                  >
                    Resume Registration
                  </Button>
                </Grid>

                <Grid>
                  <h2 style={{ color: "#FFF" }}>PERSONAL DETAILS</h2>
                  <Grid className={classes.formBox}>
                    <Grid className={classes.personalFormBox}>
                      {personalDetailsTextFields.map((field) => {
                        return field.name === "Package Selection" ? (
                          <Grid style={{ marginTop: 25 }}>
                            <CustomDropdown
                              fullWidth={true}
                              label={"Select Package"}
                              defaultValue={"Select Package"}
                              handleSelectChange={(e) => {
                                setPackageSelection(e.target.value);
                                handleOpen();
                              }}
                              menuItems={packageItems}
                            />
                          </Grid>
                        ) : (
                          <Grid style={{ marginBottom: 10 }}>
                            <CustomTextField
                              fullWidth={true}
                              label={field.name}
                              type={field.type}
                              autoComplete="off"
                              autoFocus
                              isRequired={true}
                              BoxHeight="68px"
                              height={30}
                              value={field.value}
                              onInput={
                                field.type === "tel"
                                  ? (e) => {
                                      e.target.value = e.target.value.slice(
                                        0,
                                        10
                                      );
                                    }
                                  : ""
                              }
                              placeholder={field.placeholder}
                              handleChange={(e) => onChange(e, field.name)}
                              onBlur={field.onBlur}
                              disabled={field.disabled}
                              error={field.error}
                            />
                          </Grid>
                        );
                      })}

                      <CustomTextField
                        label={"PIN Code"}
                        type={"number"}
                        autoComplete="off"
                        autoFocus
                        isRequired={true}
                        height={30}
                        placeholder={"Enter valid PIN Code"}
                        handleChange={(e) => onChange(e, "PIN Code")}
                        onBlur={autoFillPlace}
                        error={pinCodeError}
                      />

                      <Grid
                        style={{
                          padding: "1rem 3rem",
                          color: "#E9C547",
                          background: "rgba(233, 197, 71, 0.1)",
                          fontSize: 16,
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        <Typography>
                          {city === null || city === "" || city === undefined
                            ? "Select Pin Code, City will be selected"
                            : `City :  ${city}`}
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          padding: "1rem 3rem",
                          color: "#E9C547",
                          background: "rgba(233, 197, 71, 0.1)",
                          fontSize: 16,
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        <Typography>
                          {state === null || state === "" || state === undefined
                            ? "Select Pin Code, State will be selected"
                            : `State :  ${state}`}
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          padding: "1rem 3rem",
                          color: "#E9C547",
                          background: "rgba(233, 197, 71, 0.1)",
                          fontSize: 16,
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        <Typography>
                          {country === null ||
                          country === "" ||
                          country === undefined
                            ? "Select Pin Code, Country will be selected"
                            : `Country :  ${country}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid style={{ marginTop: 100 }}>
                  <h2 style={{ color: "#FFF" }}>NOMINEE DETAILS</h2>
                  <Grid className={classes.formBox}>
                    <Grid className={classes.personalFormBox}>
                      {nomineeDetails.map((field) => {
                        return (
                          <Grid style={{ marginBottom: 10 }}>
                            <CustomTextField
                              fullWidth={true}
                              label={field.name}
                              type={field.type}
                              autoComplete="off"
                              autoFocus
                              isRequired={true}
                              BoxHeight="68px"
                              height={40}
                              value={field.value}
                              placeholder={field.placeholder}
                              handleChange={(e) => onChange(e, field.name)}
                              disabled={field.disabled}
                              error={field.error}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid style={{ marginTop: 100 }}>
                  <h2 style={{ color: "#FFF" }}>PASSWORD DETAILS</h2>
                  <Grid className={classes.formBox}>
                    <Grid className={classes.personalFormBox}>
                      {passwordFields.map((field) => {
                        return (
                          <Grid style={{ marginBottom: 10 }}>
                            <CustomTextField
                              fullWidth={true}
                              label={field.name}
                              type={field.type}
                              autoComplete="off"
                              autoFocus
                              isRequired={true}
                              BoxHeight="68px"
                              height={40}
                              value={field.value}
                              placeholder={field.placeholder}
                              handleChange={(e) => onChange(e, field.name)}
                              disabled={field.disabled}
                              error={field.error}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <motion.div
                    className="animatable"
                    style={{ margin: "60px auto" }}
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
                        padding: "26px 55px",
                        background: "#a38ce8",
                        color: "#fff",
                        width: "100%",
                      }}
                      onClick={saveAndContinue}
                      loading={btnLoading}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/**Mobile code */}
          <Grid className={classes.containerClass}>
            <Grid className={classes.subMobileSection}>
              <svg
                style={{ width: "100%", height: "100%" }}
                width="390"
                height="392"
                viewBox="0 0 390 392"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-1.41682 392C56.5709 301.116 215.786 141.22 388.743 228.708C561.701 316.197 672.313 374.023 706 392V0H388.743C364.777 56.7609 253.193 163.292 -1.41682 135.327C-256.027 107.363 -107.504 294.791 -1.41682 392Z"
                  fill="#E9C547"
                />
              </svg>
              <img src={Logo} alt="logo" className={classes.logoContainer} />
              <Grid className={classes.welcomeMsg}>
                <h1>WELCOME!</h1>
                <p>
                  Hello there, you are in the right place for business and
                  travel. Please fill in the fields below to complete your
                  registration and to get your trip!
                </p>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 20,
                }}
              >
                <Button
                  onClick={openResumeModal}
                  style={
                    resumebtnDisable
                      ? {
                          padding: "1rem 3rem",
                          background: "#787878",
                          color: "#BCBCBC",
                          fontSize: 16,
                          borderRadius: 4,
                          fontWeight: 700,
                          pointerEvents: "none",
                        }
                      : {
                          padding: "1rem 3rem",
                          background: "#E9C547",
                          color: "#262626",
                          fontSize: 16,
                          borderRadius: 4,
                          fontWeight: 700,
                        }
                  }
                >
                  Resume Registration
                </Button>
              </Grid>

              <Grid className={classes.arrow}>
                <svg
                  width="30"
                  height="86"
                  viewBox="0 0 30 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5858 85.4142C14.3668 86.1953 15.6332 86.1953 16.4142 85.4142L29.1421 72.6863C29.9232 71.9052 29.9232 70.6389 29.1421 69.8579C28.3611 69.0768 27.0948 69.0768 26.3137 69.8579L15 81.1716L3.68629 69.8579C2.90524 69.0768 1.63891 69.0768 0.857861 69.8579C0.0768125 70.6389 0.0768125 71.9052 0.857861 72.6863L13.5858 85.4142ZM13 -8.74228e-08L13 84L17 84L17 8.74228e-08L13 -8.74228e-08Z"
                    fill="#E9C547"
                  />
                </svg>
              </Grid>

              <SponsorDetails />

              <Grid className={classes.arrow}>
                <svg
                  width="30"
                  height="86"
                  viewBox="0 0 30 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5858 85.4142C14.3668 86.1953 15.6332 86.1953 16.4142 85.4142L29.1421 72.6863C29.9232 71.9052 29.9232 70.6389 29.1421 69.8579C28.3611 69.0768 27.0948 69.0768 26.3137 69.8579L15 81.1716L3.68629 69.8579C2.90524 69.0768 1.63891 69.0768 0.857861 69.8579C0.0768125 70.6389 0.0768125 71.9052 0.857861 72.6863L13.5858 85.4142ZM13 -8.74228e-08L13 84L17 84L17 8.74228e-08L13 -8.74228e-08Z"
                    fill="#E9C547"
                  />
                </svg>
              </Grid>
              <Grid
                className={classes.arrow}
                style={{ margin: 30, marginBottom: 45 }}
              >
                <span className={classes.personalDetailsButton}>
                  PERSONAL DETAILS
                </span>
              </Grid>
              <Grid style={{ width: "90%", margin: "20px auto" }}>
                {personalDetailsTextFields.map((field) => {
                  return field.name === "Package Selection" ? (
                    <Grid style={{ marginTop: 10, marginBottom: 10 }}>
                      <CustomDropdown
                        fullWidth={true}
                        label={"Select Package"}
                        defaultValue={"Select Package"}
                        handleSelectChange={(e) => {
                          setPackageSelection(e.target.value);
                          handleOpen();
                        }}
                        menuItems={packageItems}
                      />
                    </Grid>
                  ) : (
                    <Grid>
                      <CustomTextField
                        fullWidth={true}
                        label={field.name}
                        type={field.type}
                        isRequired={true}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="18px"
                        value={field.value}
                        onInput={
                          field.type === "tel"
                            ? (e) => {
                                e.target.value = e.target.value.slice(0, 10);
                              }
                            : ""
                        }
                        placeholder={field.placeholder}
                        handleChange={(e) => onChange(e, field.name)}
                        disabled={field.disabled}
                        error={field.error}
                      />
                    </Grid>
                  );
                })}
                <Grid style={{ marginBottom: 50 }}>
                  <CustomTextField
                    label={"PIN Code"}
                    type={"number"}
                    autoComplete="off"
                    autoFocus
                    isRequired={true}
                    height={30}
                    placeholder={"Enter valid PIN Code"}
                    handleChange={(e) => onChange(e, "PIN Code")}
                    onBlur={autoFillPlace}
                    error={pinCodeError}
                  />
                </Grid>
                <Grid
                  style={{
                    padding: "1rem 3rem",
                    color: "#E9C547",
                    background: "rgba(233, 197, 71, 0.1)",
                    fontSize: 16,
                    borderRadius: 4,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  <Typography>
                    {city === null || city === "" || city === undefined
                      ? "Select Pin Code, City will be selected"
                      : `City :  ${city}`}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    padding: "1rem 3rem",
                    color: "#E9C547",
                    background: "rgba(233, 197, 71, 0.1)",
                    fontSize: 16,
                    borderRadius: 4,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  <Typography>
                    {state === null || state === "" || state === undefined
                      ? "Select Pin Code, State will be selected"
                      : `State :  ${state}`}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    padding: "1rem 3rem",
                    color: "#E9C547",
                    background: "rgba(233, 197, 71, 0.1)",
                    fontSize: 16,
                    borderRadius: 4,
                    fontWeight: 700,
                    marginBottom: 58,
                  }}
                >
                  <Typography>
                    {country === null || country === "" || country === undefined
                      ? "Select Pin Code, Country will be selected"
                      : `Country :  ${country}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                className={classes.arrow}
                style={{ margin: 30, marginBottom: 45 }}
              >
                <span className={classes.personalDetailsButton}>
                  NOMINEE DETAILS
                </span>
              </Grid>
              <Grid style={{ width: "90%", margin: "20px auto" }}>
                {nomineeDetails.map((field) => {
                  return (
                    <Grid>
                      <CustomTextField
                        fullWidth={true}
                        label={field.name}
                        type={field.type}
                        isRequired={true}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="18px"
                        value={field.value}
                        placeholder={field.placeholder}
                        handleChange={(e) => onChange(e, field.name)}
                        disabled={field.disabled}
                        error={field.error}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              <Grid
                className={classes.arrow}
                style={{ margin: 30, marginBottom: 45 }}
              >
                <span className={classes.personalDetailsButton}>
                  SET YOUR PASSWORD
                </span>
              </Grid>
              <Grid style={{ width: "90%", margin: "20px auto" }}>
                {passwordFields.map((field) => {
                  return (
                    <Grid>
                      <CustomTextField
                        fullWidth={true}
                        label={field.name}
                        type={field.type}
                        isRequired={true}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="18px"
                        value={field.value}
                        placeholder={field.placeholder}
                        handleChange={(e) => onChange(e, field.name)}
                        disabled={field.disabled}
                        error={field.error}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              <Grid
                style={{ width: "80%", margin: "20px auto", marginBottom: 30 }}
              >
                <CustomButton
                  fullWidth={true}
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
                  loading={btnLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "0 auto",
            borderRadius: 10,
            background: "#434343",
            overflow: "scroll",
            height: "auto",
            width: "60%",
            "@media(max-width: 780px)": {
              width: "85%",
            },
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              color: "#E9C547",
              fontWeight: 400,
              fontSize: 25,
              margin: 10,
            }}
          >
            Are you sure you want to select this Package?
          </Typography>
          {packageItems
            ?.filter((item) => {
              if (!packageSelection) return true;
              if (item.id === packageSelection) {
                return true;
              }
            })
            .map((per) => {
              return (
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#E9C547",
                    fontWeight: 700,
                    fontSize: 35,
                  }}
                >
                  {per.name}
                </Typography>
              );
            })}
          <CustomButton
            text="NO"
            onClick={() => {
              setPackageSelection("");
              handleClose();
            }}
            style={{
              margin: "20px auto",
              textAlign: "center",
              color: "#fff",
              float: "left",
            }}
          />
          <CustomButton
            text="YES"
            onClick={() => {
              setPackageSelection(packageSelection);
              handleClose();
            }}
            style={{
              margin: "20px auto",
              textAlign: "center",
              color: "#fff",
              float: "right",
            }}
          />
        </Box>
      </Modal>

      <Modal
        open={resumeModal}
        onClose={() => setResumeModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.paymentBox}>
          <Typography
            style={{
              textAlign: "center",
              color: "#E9C547",
              fontWeight: 400,
              fontSize: 20,
              margin: 10,
            }}
          >
            Are you already registered? Enter your Mobile number.
          </Typography>
          <CustomTextField
            fullWidth={true}
            label={"Mobile Number"}
            type={"tel"}
            autoComplete="off"
            autoFocus
            isRequired={true}
            BoxHeight="68px"
            height={40}
            placeholder={"Enter your mobile number"}
            handleChange={(e) => setResumeMobileNo(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
          />

          <Grid style={{ marginTop: 44 }}>
            <CustomButton
              text="CANCEL"
              onClick={() => {
                setPackageSelection("");
                closeResumeModal();
              }}
              style={{
                margin: "20px auto",
                textAlign: "center",
                color: "#fff",
                float: "left",
              }}
            />
            <CustomButton
              text="SUBMIT"
              onClick={() => {
                resumeRegistration();
              }}
              style={{
                margin: "20px auto",
                textAlign: "center",
                color: "#fff",
                float: "right",
              }}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(PersonalDetails);
