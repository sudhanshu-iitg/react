import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import {
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Box,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./customer_register.style";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { withStyles } from "@mui/styles";
import SponsorDetails from "./sponsorDetails";
import CustomTextField from "../../../customComponents/textfield";
import CustomDropdown from "../../../customComponents/dropdown";
import CustomButton from "../../../customComponents/primaryButton";
import CustomSpinner from "../../../customComponents/spinner";
import { motion } from "framer-motion";
import { allRequestHandler } from "../../../api/index";
import { URLS } from "../../../constants/index";
import { Divider } from "@material-ui/core";
import YouTube from "react-youtube";

const KycDetails = ({ classes, goToNext, goToPrev }) => {
  const [sponsorId, setSponsorId] = useState(null);
  const [terms, setTerms] = useState(false);
  const [sponsorName, setSponsorName] = useState(null);
  const [selectedSelfieFile, setSelectedSelfieFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState("Kannada");

  const [link1, setLink1] = useState("9ByI-9iMEYQ");
  const [link2, setLink2] = useState("DKl3NC_ntSM");
  const [link3, setLink3] = useState("RbdZR_HycVo");

  const [activeTab, setActiveTab] = useState("kannada");

  const [video1, setVideo1] = useState(false);
  const [allowVideo2, setAllowVideo2] = useState(false);
  const [video2, setVideo2] = useState(false);
  const [allowVideo3, setAllowVideo3] = useState(false);
  const [video3, setVideo3] = useState(false);

  const [mvideo1, setmVideo1] = useState(false);
  const [mallowVideo2, setmAllowVideo2] = useState(false);
  const [mvideo2, setmVideo2] = useState(false);
  const [mallowVideo3, setmAllowVideo3] = useState(false);
  const [mvideo3, setmVideo3] = useState(false);

  const [trimmedDataUrl, setTrimmedDataUrl] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [allowRegistration, setAllowRegistration] = useState(false);
  const [allowUploadSelfie, setAllowUploadSelfie] = useState(false);

  const [freeRegistration, setfreeRegistration] = useState(true);

  const [selfieCode, setSelfieCode] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [showPreview, setShowPreview] = useState(false);

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

  const uploadSelfie = (e) => {
    let selectedFile = e.target.files[0];
    const fsize = selectedFile.size;
    const file = Math.round(fsize / 1024);
    if (file > 2048) {
      setSeverity("error");
      setDisplayMsg("File too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
    } else {
      setSelectedSelfieFile(selectedFile);
      setAllowRegistration(true);
    }
  };

  const getUserDetails = async () => {
    let uploadSelfie = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.FORMPREVIEW,
      requestData: { mobile_number: sessionStorage.mobile },
    });
    setUserDetails(uploadSelfie?.response);
  };

  const completeRegistration = async () => {
    setBtnLoading(true);

    if (terms && selectedSelfieFile) {
      const imgformData = new FormData();
      imgformData.append("selfie", selectedSelfieFile, selectedSelfieFile.name);
      imgformData.append("terms_condition_accepted", terms);
      imgformData.append("mobile_number", sessionStorage.mobile);

      imgformData.append("selfie_code", selfieCode);
      imgformData.append("free_registration", freeRegistration);
      let uploadSelfie = await allRequestHandler({
        requestType: "FORMDATA",
        requestUrl: URLS.COMPLETEREGISTER,
        requestData: imgformData,
      });

      if (uploadSelfie.response === "data saved successfully") {
        setBtnLoading(false);
        setSeverity("success");
        setDisplayMsg("Successfully Registered");
        setHandleSnackbar(true);
        setTimeout(() => goToNext(), 1500);
      } else {
        setBtnLoading(false);
        setSeverity("error");
        setDisplayMsg("Please check if selfie file size is less than 2MB");
        setHandleSnackbar(true);
      }
    } else {
      setBtnLoading(false);
      setSeverity("error");
      setDisplayMsg(
        "You cannot proceed before agreeing to terms and conditions"
      );
      setHandleSnackbar(true);
    }
  };

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

  const checkSelfie = () => {
    if (selectedSelfieFile) {
      setShowPreview(true);
    } else {
      setSeverity("error");
      setDisplayMsg("Please upload your selfie to proceed");
      setHandleSnackbar(true);
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
      showinfo: 0,
      autoplay: 1,
    },
  };

  const mopts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
      showinfo: 0,
      autoplay: 1,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSponsorDetails();
    getUserDetails();
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
            open={showPreview}
            onClose={() => setShowPreview(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modalBox}>
              {/* <Button
            onClick={() => setShowPreview(false)}
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
          </Button> */}

              <Grid container className={classes.modalHeader}>
                <Typography
                  style={{
                    color: "#fff",
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                >
                  <b> CIN: U63030KA2022PTC157267</b>
                </Typography>
                <Grid item>
                  <img
                    src={Logo}
                    height={200}
                    width={200}
                    style={{ marginTop: 20 }}
                    alt=""
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.modalHeading}>
                    RIPSHIP WORLD VENURES PVT LTD
                  </Typography>
                  <Typography
                    className={classes.modalSubtitle}
                    style={{ fontSize: 12 }}
                  >
                    Ground Floor, No 1-5-378/2, SHREYAS, TANTRI LANE KOTTARA
                    MANGALORE - 575006 <br />
                    <span style={{ color: "#E9C547" }}>
                      {" "}
                      Ph:
                    </span> 9066641583 <br />{" "}
                    <span style={{ color: "#E9C547" }}>E-mail:</span>
                    management@ripshipworldventures.com
                    <br /> <span style={{ color: "#E9C547" }}>
                      Website:
                    </span>{" "}
                    www.ripshipworldventures.com
                    <br />
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                style={{
                  textAlign: "center",
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 25,
                  margin: 10,
                }}
              >
                Application Details
              </Typography>

              {personalDetails.map((per, index) => {
                return (
                  <Grid
                    container
                    style={
                      index % 2 === 0
                        ? {
                            background: "#282828",
                            borderRadius: 10,
                            padding: 20,
                          }
                        : { background: "none", padding: 10 }
                    }
                  >
                    <Typography
                      style={{
                        color: "#E9C547",
                        fontWeight: 700,
                        fontSize: 15,
                        width: "40%",
                      }}
                    >
                      {per.title}
                    </Typography>
                    <Typography
                      style={{
                        color: "#FFF",
                        fontSize: 15,
                      }}
                    >
                      {per?.value}
                    </Typography>
                  </Grid>
                );
              })}
              <Divider
                style={{
                  color: "#fff",
                  margin: "20px auto",
                  background: "#fff",
                }}
              />
              <Typography
                style={{
                  textAlign: "center",
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 25,
                  margin: 10,
                }}
              >
                Franchise Agreement
              </Typography>
              <ol>
                {agreement.map((a) => {
                  return (
                    <li style={{ color: "#fff", marginTop: 10 }}>{a.p}</li>
                  );
                })}
              </ol>

              <FormControlLabel
                style={{ marginTop: "20px", padding: 10, paddingLeft: 20 }}
                control={
                  <Checkbox
                    checked={terms}
                    onChange={(e) => {
                      if (e.target.value) setTerms(e.target.checked);
                    }}
                  />
                }
                label={
                  <Typography style={{ color: "#fff" }}>
                    I hereby accept all the terms and conditions provided by
                    Ripship Pvt Ltd<sup>*</sup>
                  </Typography>
                }
              />

              <Grid container style={{ justifyContent: "flex-end" }}>
                <Grid item>
                  <CustomButton
                    loading={btnLoading}
                    text="I Agree"
                    style={{
                      margin: "10px auto",
                      textAlign: "center",
                      padding: "26px 45px",
                      background: "#C5B1FF",
                      color: "#262626",
                      fontWeight: 700,
                    }}
                    onClick={completeRegistration}
                  />
                </Grid>
              </Grid>
            </Box>
          </Modal>

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
                height: "auto",
                width: "100%",
                justifyContent: "space-between",
                position: "relative",
                padding: 30,
                height: "100vh",
                overflowY: "scroll",
              }}
            >
              <Grid container style={{}}>
                <Grid item className={classes.sponsorDetails}>
                  <Typography>Sponsor Name: {sponsorName}</Typography>
                </Grid>
              </Grid>
              <Grid>
                <h2 style={{ color: "#FFF" }}>TERMS AND CONDITIONS</h2>
                <Typography style={{ color: "#FFF", margin: "20px 0px" }}>
                  Please watch each video till the end to continue your
                  registration process.
                </Typography>
                <Typography style={{ color: "#C5B1FF", margin: "20px 0px" }}>
                  Select your preffered language
                </Typography>
                <Grid
                  container
                  style={{ justifyContent: "left" }}
                  className={classes.tab}
                >
                  <Grid
                    item
                    className={classes.activeTab}
                    onClick={() => {
                      setActiveTab("kannada");
                      setLink1("9ByI-9iMEYQ");
                      setLink2("DKl3NC_ntSM");
                      setLink3("RbdZR_HycVo");
                    }}
                    style={
                      activeTab === "kannada"
                        ? {
                            background: "#664FA7",
                            color: "#FFF",
                            border: "none",
                          }
                        : { background: "none" }
                    }
                  >
                    Kannada
                  </Grid>
                  <Grid
                    item
                    className={classes.activeTab}
                    onClick={() => {
                      setActiveTab("english");
                      setLink1("HmhhJfxQeHo");
                      setLink2("L0vP89qpNI8");
                      setLink3("GLHgHpxXT8Q");
                    }}
                    style={
                      activeTab === "english"
                        ? {
                            background: "#664FA7",
                            color: "#FFF",
                            border: "none",
                          }
                        : { background: "none" }
                    }
                  >
                    English
                  </Grid>
                </Grid>
                <Grid
                  className={classes.formBox}
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "30%",
                  }}
                >
                  <CustomButton
                    text="PLAY VIDEO - 1"
                    style={{
                      margin: "20px 0px",
                      textAlign: "center",
                      padding: "26px 45px",
                      background: "#E9C547",
                      color: "#262626",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      setVideo1(true);
                    }}
                  />
                  {video1 && (
                    <Grid>
                      <YouTube
                        videoId={link1}
                        opts={opts}
                        onReady={(e) => {
                          e.target.playVideo();
                        }}
                        onEnd={() => {
                          setAllowVideo2(true);
                        }}
                      />
                    </Grid>
                  )}
                  <CustomButton
                    text="PLAY VIDEO - 2"
                    style={
                      allowVideo2
                        ? {
                            margin: "20px 0px",
                            textAlign: "center",
                            padding: "26px 45px",
                            background: "#E9C547",
                            color: "#262626",
                            fontWeight: 700,
                          }
                        : {
                            margin: "20px 0px",
                            textAlign: "center",
                            padding: "26px 45px",
                            background: "#787878",
                            color: "#BCBCBC",
                            fontWeight: 700,
                            pointerEvents: "none",
                          }
                    }
                    disabled={allowVideo2}
                    onClick={() => {
                      setVideo2(true);
                    }}
                  />
                  {video2 && (
                    <Grid>
                      <YouTube
                        videoId={link2}
                        opts={opts}
                        onReady={(e) => {
                          e.target.playVideo();
                        }}
                        onEnd={() => {
                          setAllowVideo3(true);
                        }}
                      />
                    </Grid>
                  )}
                  <CustomButton
                    text="PLAY VIDEO - 3"
                    style={
                      allowVideo3
                        ? {
                            margin: "20px 0px",
                            textAlign: "center",
                            padding: "26px 45px",
                            background: "#E9C547",
                            color: "#262626",
                            fontWeight: 700,
                          }
                        : {
                            margin: "20px 0px",
                            textAlign: "center",
                            padding: "26px 45px",
                            background: "#787878",
                            color: "#BCBCBC",
                            fontWeight: 700,
                            pointerEvents: "none",
                          }
                    }
                    disabled={allowVideo3}
                    onClick={() => {
                      setVideo3(true);
                    }}
                  />
                  {video3 && (
                    <Grid>
                      <YouTube
                        videoId={link3}
                        opts={opts}
                        onReady={(e) => {
                          e.target.playVideo();
                        }}
                        onEnd={() => {
                          setAllowUploadSelfie(true);
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 13,
                  }}
                >
                  {" "}
                  Upload your selfie
                </Typography>
                <div style={{ display: "flex" }}>
                  <label
                    htmlFor="my-pan-file"
                    style={
                      allowUploadSelfie
                        ? {
                            background: "#E9C547",
                            color: "#000",
                            padding: "0.5em 3em",
                            textTransform: "uppercase",
                            borderRadius: 4,
                            fontSize: 15,
                            cursor: "pointer",
                          }
                        : {
                            padding: "0.5em 3em",
                            textTransform: "uppercase",
                            borderRadius: 4,
                            fontSize: 15,
                            background: "#787878",
                            color: "#BCBCBC",
                            pointerEvents: "none",
                          }
                    }
                  >
                    {/* <span>
                      {" "}
                      <FileUploadOutlinedIcon />{" "}
                    </span> */}
                    Select Photo
                    <input
                      style={{ display: "none" }}
                      id="my-pan-file"
                      type="file"
                      name="file"
                      onChange={uploadSelfie}
                      accept="image/*"
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
                    {" "}
                    {selectedSelfieFile?.name}
                  </Typography>
                </div>

                <Grid
                  container
                  style={{ justifyContent: "left", width: "100%" }}
                >
                  <motion.div
                    className="animatable"
                    whileHover={{
                      scale: 1.011,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <CustomButton
                      text="Complete Registration"
                      style={
                        allowRegistration
                          ? {
                              margin: "20px auto",
                              textAlign: "center",
                              padding: "26px 45px",
                              background: "#E9C547",
                              color: "#000",
                              fontWeight: 700,
                            }
                          : {
                              margin: "20px auto",
                              textAlign: "center",
                              padding: "26px 45px",
                              background: "#787878",
                              color: "#BCBCBC",
                              fontWeight: 700,
                              pointerEvents: "none",
                            }
                      }
                      onClick={checkSelfie}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Mobile */}
          <Grid className={classes.containerClass}>
            <SponsorDetails />
            <Grid className={classes.arrow} style={{ marginBottom: 30 }}>
              <span className={classes.personalDetailsButton}>
                Terms and conditions
              </span>
            </Grid>
            <Typography
              style={{ color: "#FFF", margin: "20px auto", width: "80%" }}
            >
              Please watch each video till the end to continue your registration
              process.
            </Typography>
            <Typography
              style={{ color: "#C5B1FF", margin: "20px auto", width: "80%" }}
            >
              Select your preffered language
            </Typography>
            <Grid
              container
              style={{ justifyContent: "center" }}
              className={classes.tab}
            >
              <Grid
                item
                className={classes.activeTab}
                onClick={() => {
                  setActiveTab("kannada");
                  setLink1("9ByI-9iMEYQ");
                  setLink2("DKl3NC_ntSM");
                  setLink3("RbdZR_HycVo");
                }}
                style={
                  activeTab === "kannada"
                    ? {
                        background: "#664FA7",
                        color: "#FFF",
                        border: "none",
                      }
                    : { background: "none" }
                }
              >
                Kannada
              </Grid>
              <Grid
                item
                className={classes.activeTab}
                onClick={() => {
                  setActiveTab("english");
                  setLink1("HmhhJfxQeHo");
                  setLink2("L0vP89qpNI8");
                  setLink3("GLHgHpxXT8Q");
                }}
                style={
                  activeTab === "english"
                    ? {
                        background: "#664FA7",
                        color: "#FFF",
                        border: "none",
                      }
                    : { background: "none" }
                }
              >
                English
              </Grid>
            </Grid>
            <Grid
              className={classes.formBox}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: "80%",
                margin: "0px auto",
              }}
            >
              <CustomButton
                text="PLAY VIDEO - 1"
                style={{
                  margin: "20px 0px",
                  textAlign: "center",
                  padding: "26px 45px",
                  background: "#E9C547",
                  color: "#262626",
                  fontWeight: 700,
                }}
                onClick={() => {
                  setmVideo1(true);
                }}
              />
              {mvideo1 && (
                <Grid>
                  <YouTube
                    videoId={link1}
                    opts={mopts}
                    onReady={(e) => {
                      e.target.playVideo();
                    }}
                    onEnd={() => {
                      setmAllowVideo2(true);
                    }}
                  />
                </Grid>
              )}
              <CustomButton
                text="PLAY VIDEO - 2"
                style={
                  mallowVideo2
                    ? {
                        margin: "20px 0px",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#E9C547",
                        color: "#262626",
                        fontWeight: 700,
                      }
                    : {
                        margin: "20px 0px",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#787878",
                        color: "#BCBCBC",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }
                }
                disabled={allowVideo2}
                onClick={() => {
                  setmVideo2(true);
                }}
              />
              {mvideo2 && (
                <Grid>
                  <YouTube
                    videoId={link2}
                    opts={mopts}
                    onReady={(e) => {
                      e.target.playVideo();
                    }}
                    onEnd={() => {
                      setmAllowVideo3(true);
                    }}
                  />
                </Grid>
              )}
              <CustomButton
                text="PLAY VIDEO - 3"
                style={
                  mallowVideo3
                    ? {
                        margin: "20px 0px",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#E9C547",
                        color: "#262626",
                        fontWeight: 700,
                      }
                    : {
                        margin: "20px 0px",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#787878",
                        color: "#BCBCBC",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }
                }
                disabled={mallowVideo3}
                onClick={() => {
                  setmVideo3(true);
                }}
              />
              {mvideo3 && (
                <Grid>
                  <YouTube
                    videoId={link3}
                    opts={mopts}
                    onReady={(e) => {
                      e.target.playVideo();
                    }}
                    onEnd={() => {
                      setAllowUploadSelfie(true);
                    }}
                  />
                </Grid>
              )}
            </Grid>

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
              Upload your selfie
            </Typography>
            <div
              style={{
                display: "flex",
                margin: "0px auto",
                marginTop: 10,
                width: "80%",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <label
                htmlFor="my-pan-file"
                style={
                  allowUploadSelfie
                    ? {
                        background: "#E9C547",
                        color: "#000",
                        padding: "0.5em 3em",
                        textTransform: "uppercase",
                        borderRadius: 4,
                        fontSize: 15,
                        cursor: "pointer",
                      }
                    : {
                        padding: "0.5em 3em",
                        textTransform: "uppercase",
                        borderRadius: 4,
                        fontSize: 15,
                        background: "#787878",
                        color: "#BCBCBC",
                        pointerEvents: "none",
                      }
                }
              >
                {/* <span>
                      {" "}
                      <FileUploadOutlinedIcon />{" "}
                    </span> */}
                Select Photo
                <input
                  style={{ display: "none" }}
                  id="my-pan-file"
                  type="file"
                  name="file"
                  onChange={uploadSelfie}
                  accept="image/*"
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
                {" "}
                {selectedSelfieFile?.name}
              </Typography>
            </div>

            <Grid
              style={{ width: "50%", margin: "20px auto", marginBottom: 30 }}
            >
              <CustomButton
                text="Complete Registration"
                style={
                  allowRegistration
                    ? {
                        margin: "20px auto",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#E9C547",
                        color: "#000",
                        fontWeight: 700,
                      }
                    : {
                        margin: "20px auto",
                        textAlign: "center",
                        padding: "26px 45px",
                        background: "#787878",
                        color: "#BCBCBC",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }
                }
                onClick={checkSelfie}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(KycDetails);
