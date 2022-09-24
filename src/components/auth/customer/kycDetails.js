import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import { Grid, Typography, Button, Snackbar } from "@mui/material";
import styles from "./customer_register.style";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import SponsorDetails from "./sponsorDetails";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { motion } from "framer-motion";
import Illustration from "../../../assets/kycSvg.svg";
import { allRequestHandler } from "../../../api/index";
import { URLS } from "../../../constants/index";
import CustomSpinner from "../../../customComponents/spinner";
const KycDetails = ({ classes, goToNext, goToPrev }) => {
  const [loading, setLoading] = useState(true);
  const [sponsorId, setSponsorId] = useState(null);
  const [sponsorName, setSponsorName] = useState(null);

  const [pan, setPAN] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [selectedAdhaarFile, setSelectedAdhaarFile] = useState(null);
  const [selectedPANFile, setSelectedPANFile] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);
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

  const fileType = ["application/pdf"];

  const uploadAdhaar = (e) => {
    let selectedFile = e.target.files[0];
    const fsize = selectedFile.size;
    const file = Math.round(fsize / 1024);
    if (file > 2048) {
      setSeverity("error");
      setDisplayMsg("File too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
    } else {
      setSelectedAdhaarFile(selectedFile);
    }

    // if (selectedFile) {
    //   if (selectedFile && fileType.includes(selectedFile.type)) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(selectedFile);
    //     reader.onloadend = (e) => {
    //       setSelectedAdhaarFile(e.target.result);
    //       setAdhaarError("");
    //     };
    //   } else {
    //     setSelectedAdhaarFile(null);
    //     setAdhaarError("Please select valid pdf file");
    //   }
    // } else {
    //   console.log("select your file");
    // }
  };

  const uploadPAN = (e) => {
    let selectedFile = e.target.files[0];
    const fsize = selectedFile.size;
    const file = Math.round(fsize / 1024);
    if (file > 2048) {
      setSeverity("error");
      setDisplayMsg("File too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
    } else {
      setSelectedPANFile(selectedFile);
    }
    // if (selectedFile) {
    //   if (selectedFile && fileType.includes(selectedFile.type)) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(selectedFile);
    //     reader.onloadend = (e) => {
    //       setSelectedPANFile(e.target.result);
    //       setPanError("");
    //     };
    //   } else {
    //     setSelectedPANFile(null);
    //     setPanError("Please select valid pdf file");
    //   }
    // } else {
    //   console.log("select your file");
    // }
  };

  const uploadPDF = async (e) => {
    setBtnLoading(true);
    if (selectedAdhaarFile !== null && aadhar !== null) {
      const formData = new FormData();

      formData.append(
        "aadhar",
        selectedAdhaarFile,
        selectedAdhaarFile?.name + "-" + sessionStorage.mobile
      );
      if (selectedPANFile !== null) {
        formData.append(
          "pan",
          selectedPANFile,
          selectedPANFile?.name + "-" + sessionStorage.mobile
        );
      }

      formData.append("mobile_number", sessionStorage.mobile);
      if (pan !== null) {
        formData.append("pan_number", pan);
      }

      formData.append("aadhar_number", aadhar);
      let uploadPDF1 = await allRequestHandler({
        requestType: "IMAGE",
        requestUrl: URLS.UPLOADDOC,
        requestData: formData,
      });

      if (uploadPDF1?.response === "documents uploaded successfully") {
        setBtnLoading(false);
        setSeverity("success");
        setDisplayMsg("KYC Details Sent!");
        setHandleSnackbar(true);
        setTimeout(() => goToNext(), 1500);
      } else {
        setBtnLoading(false);
        setSeverity("error");
        setDisplayMsg("File size should be less tha 2MB");
        setHandleSnackbar(true);
      }
    } else {
      setBtnLoading(false);

      setSeverity("error");
      setDisplayMsg("Please upload all your documents to continue");
      setHandleSnackbar(true);
    }
  };

  const saveAndContinue = () => {
    uploadPDF();
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
                <h2 style={{ color: "#FFF" }}>KYC DOCUMENTS</h2>
                <Grid
                  className={classes.formBox}
                  style={{ flexDirection: "column" }}
                >
                  <Grid
                    container
                    style={{
                      justifyContent: "space-between",
                      marginTop: "32px",
                      marginBottom: 50,
                      width: "100%",
                    }}
                  >
                    <Grid item style={{ width: "45%" }}>
                      <CustomTextField
                        fullWidth={true}
                        label={"PAN Number"}
                        type={"text"}
                        autoComplete="off"
                        autoFocus
                        isRequired={false}
                        BoxHeight="68px"
                        height={30}
                        value={null}
                        placeholder={"Your PAN Number"}
                        handleChange={(e) => setPAN(e.target.value)}
                      />
                    </Grid>
                    <Grid item style={{ width: "45%" }}>
                      <CustomTextField
                        fullWidth={true}
                        label={"Aadhar Number"}
                        type={"number"}
                        autoComplete="off"
                        autoFocus
                        isRequired={true}
                        BoxHeight="68px"
                        height={30}
                        value={null}
                        placeholder={"Your Aadhar"}
                        handleChange={(e) => setAadhar(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      justifyContent: "space-between",
                      marginTop: "32px",
                    }}
                  >
                    <Grid item style={{ marginBottom: 10, width: "45%" }}>
                      <Typography
                        style={{
                          color: "#FFF",
                          fontWeight: 700,
                          fontSize: 15,
                          marginBottom: 13,
                        }}
                      >
                        {" "}
                        Upload Pan Card
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <label
                          htmlFor="my-pan-file"
                          className={classes.uploadBtn}
                        >
                          {/* <span>
                      {" "}
                      <FileUploadOutlinedIcon />{" "}
                    </span> */}
                          Select PAN File
                          <input
                            style={{ display: "none" }}
                            id="my-pan-file"
                            type="file"
                            name="file"
                            onChange={uploadPAN}
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
                          {selectedPANFile?.name}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item style={{ marginBottom: 10, width: "45%" }}>
                      <Typography
                        style={{
                          color: "#FFF",
                          fontWeight: 700,
                          fontSize: 15,
                          margin: 8,
                        }}
                      >
                        {" "}
                        Upload Adhaar Card
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <label
                          htmlFor="my-adhaar-file"
                          className={classes.uploadBtn}
                        >
                          Select Adhaar File
                          <input
                            id="my-adhaar-file"
                            type="file"
                            name="file"
                            style={{ display: "none" }}
                            onChange={uploadAdhaar}
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
                          {selectedAdhaarFile?.name}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{ justifyContent: "left" }}>
                  <motion.div
                    className="animatable"
                    whileHover={{
                      scale: 1.011,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <CustomButton
                      loading={btnLoading}
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

          {/*Mobile*/}
          <Grid className={classes.containerClass}>
            <SponsorDetails />
            <Grid className={classes.arrow} style={{ marginBottom: 30 }}>
              <span className={classes.personalDetailsButton}>
                KYC DOCUMENTS
              </span>
            </Grid>

            <Grid
              container
              style={{
                marginTop: "32px",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Grid item style={{ width: "90%", margin: "0 auto" }}>
                <CustomTextField
                  fullWidth={true}
                  label={"PAN Number"}
                  type={"text"}
                  autoComplete="off"
                  autoFocus
                  isRequired={true}
                  BoxHeight="68px"
                  height={70}
                  value={null}
                  placeholder={"Enter your PAN Number"}
                  handleChange={(e) => setPAN(e.target.value)}
                />
              </Grid>
              <Grid item style={{ width: "90%", margin: "0 auto" }}>
                <CustomTextField
                  fullWidth={true}
                  label={"Aadhar Number"}
                  type={"number"}
                  autoComplete="off"
                  autoFocus
                  maxlength={"16"}
                  isRequired={true}
                  BoxHeight="68px"
                  height={90}
                  value={null}
                  placeholder={"Enter your Aadhar number"}
                  handleChange={(e) => setAadhar(e.target.value)}
                />
              </Grid>

              <Grid style={{ marginBottom: 10, textAlign: "center" }}>
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 13,
                  }}
                >
                  Upload Pan Card
                </Typography>
                <div>
                  <label htmlFor="my-pan-file" className={classes.uploadBtn}>
                    {/* <span>
                      {" "}
                      <FileUploadOutlinedIcon />{" "}
                    </span> */}
                    Select PAN File
                    <input
                      style={{ display: "none" }}
                      id="my-pan-file"
                      type="file"
                      name="file"
                      onChange={uploadPAN}
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
                      fontWeight: 500,
                      fontSize: 15,
                      margin: 8,
                    }}
                  >
                    {" "}
                    {selectedPANFile?.name}
                  </Typography>
                </div>
              </Grid>
              <Grid style={{ marginBottom: 10, textAlign: "center" }}>
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 15,
                    margin: 8,
                  }}
                >
                  {" "}
                  Upload Adhaar Card
                </Typography>
                <div>
                  <label htmlFor="my-adhaar-file" className={classes.uploadBtn}>
                    Select Adhaar File
                    <input
                      id="my-adhaar-file"
                      type="file"
                      name="file"
                      style={{ display: "none" }}
                      onChange={uploadAdhaar}
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
                      fontWeight: 500,
                      fontSize: 15,
                      margin: 8,
                    }}
                  >
                    {" "}
                    {selectedAdhaarFile?.name}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Grid style={{ width: "80%", margin: "0px auto" }}>
              <CustomButton
                loading={btnLoading}
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
        </>
      )}
    </>
  );
};

export default withStyles(styles)(KycDetails);
