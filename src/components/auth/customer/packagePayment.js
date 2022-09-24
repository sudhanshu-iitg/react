import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import Qr from "../../../assets/QRCODE.jpeg";
import { Grid, Typography, Button, Snackbar, Modal, Box } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./customer_register.style";
import { withStyles } from "@mui/styles";
import SponsorDetails from "./sponsorDetails";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CustomDropdown from "../../../customComponents/dropdown";
import CustomSpinner from "../../../customComponents/spinner";
import { allRequestHandler } from "../../../api/index";
import { URLS } from "../../../constants/index";
import { motion } from "framer-motion";
import axios from "axios";
import CardIcon from "../../../assets/card.png";
import UpiIcon from "../../../assets/upi.png";
import moment from "moment";

const PackagePayment = ({ classes, goToNext, goToPrev }) => {
  const [packageItems, setPackageItems] = useState([]);
  const [packageSelection, setPackageSelection] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [transID, setTransID] = useState(null);
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [sponsorId, setSponsorId] = useState(null);
  const [sponsorName, setSponsorName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [packageValue, setPackageValue] = useState(null);
  const [packagePrice, setPackagePrice] = useState(null);

  const [paymentMethodModal, setPaymentMethodModal] = useState(null);
  const [showCardType, setShowCardType] = useState(false);
  const [partialAmt, setPartialAmt] = useState(null);
  const [regType, setRegType] = useState(null);

  const getSponsorDetails = async () => {
    let str = window.location.href;
    let n = str.lastIndexOf("/");
    var result = str.substring(n + 1);

    let sponsorDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPONSORDETAILS + result,
    });
    if (sponsorDetails?.response) {
      setLoading(false);
      setSponsorId(sponsorDetails?.response?.sponsor_id);
      setSponsorName(sponsorDetails?.response?.sponsor_name);
      setPackageItems(
        sponsorDetails?.response?.packages.map((pack) => {
          return {
            id: pack?.id,
            name: pack?.name,
            item_id: pack?.package_id,
          };
        })
      );
    }
  };

  const getSelectedPackage = async () => {
    let SelectedPackageData = {
      mobile_number: sessionStorage.mobile,
    };
    let packageDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.FORMPREVIEW,
      requestData: SelectedPackageData,
    });
    if (packageDetails?.response) {
      setLoading(false);
      setPackagePrice(packageDetails?.response?.package_selected?.price);
      setPackageValue(packageDetails?.response?.package_selected?.name);
    }
  };

  const netBanking = async () => {
    const headers = {
      "x-client-id": "1474096c73bada742038f2fc2b904741",
      "x-client-secret": "TEST48bc743e7e8522ef8476ae0f81799bc3b52ca443",
    };

    let data = {
      order_amount: partialAmt,
      order_currency: "INR",
      customer_details: {
        customer_id: sessionStorage.mobile,
        customer_email: "devanshi07.tank@gmail.com",
        customer_phone: sessionStorage.mobile,
      },
    };
    let paymentGatewayLink = await axios
      .post("https://sandbox.cashfree.com/pg/orders", data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveAndContinue = async () => {
    if (regType !== "Free Registration") {
      if (partialAmt && paymentType === "Offline") {
        let p = paymentType === "Offline" ? "offline" : "online";
        const formData = new FormData();
        formData.append("payment_mode", p);
        formData.append(
          "payment_slip",
          paymentSlip,
          paymentSlip?.name + "-" + sessionStorage?.mobile
        );
        formData.append("mobile_number", sessionStorage?.mobile);
        formData.append("payment_id", transID);
        formData.append("pay_partial_amount", partialAmt);
        formData.append("transaction_id", transID);
        let uploadSelfie = await allRequestHandler({
          requestType: "FORMDATA",
          requestUrl: URLS.COMPLETEREGISTER,
          requestData: formData,
        });

        if (uploadSelfie.response) {
          setBtnLoading(false);
          setSeverity("success");
          setDisplayMsg("Payment Done");
          setHandleSnackbar(true);
          setTimeout(() => goToNext(), 1500);
        } else {
          setBtnLoading(false);
          setSeverity("error");
          setDisplayMsg("Please check if payment slip file is less than 2MB");
          setHandleSnackbar(true);
        }
      } else {
        setBtnLoading(false);
        setSeverity("error");
        setDisplayMsg("You cannot proceed before payment");
        setHandleSnackbar(true);
      }
    } else {
      const formData = new FormData();
      formData.append("mobile_number", sessionStorage.mobile);
      formData.append("free_registration", true);

      let uploadSelfie = await allRequestHandler({
        requestType: "FORMDATA",
        requestUrl: URLS.COMPLETEREGISTER,
        requestData: formData,
      });

      if (uploadSelfie.response) {
        setSeverity("success");
        setDisplayMsg("Details sent");
        setHandleSnackbar(true);
        setTimeout(() => goToNext(), 1500);
      } else {
        setBtnLoading(false);
        setSeverity("error");
        setDisplayMsg("Somehing went wrong");
        setHandleSnackbar(true);
      }
    }
  };

  const payOnline = async (method, type, cardType) => {
    let data = {
      order_amount: packagePrice,
      order_currency: "INR",
      type: type,
      card_type: cardType,
      customer_details: {
        customer_id: sessionStorage.mobile,
        customer_email: sessionStorage.email,
        customer_phone: sessionStorage.mobile,
      },
      order_meta: {
        return_url:
          "https://b8af79f41056.eu.ngrok.io?order_id={order_id}&order_token={order_token}",
        notify_url: "https://b8af79f41056.eu.ngrok.io/webhook.php",
        payment_methods: method,
      },
      order_expiry_time:
        moment(moment(new Date()).add(5, "m").toDate()).format(
          "YYYY-MM-DDTHH:mm:ss"
        ) + "Z",
    };
    let pay = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.PAYMENTGATEWAY,
      requestData: data,
    });
    if (
      pay?.payment_link !== null &&
      pay?.payment_link !== undefined &&
      pay?.payment_link !== ""
    ) {
      window.open(pay?.payment_link, "_blank", "noopener,noreferrer");
    } else {
      setSeverity("error");
      setDisplayMsg("Somehing went wrong");
      setHandleSnackbar(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSelectedPackage();
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
                Height: "100vh",
                overflowY: "scroll",
              }}
            >
              <Grid container style={{}}>
                <Grid item className={classes.sponsorDetails}>
                  <Typography>Sponsor Name: {sponsorName}</Typography>
                </Grid>
              </Grid>
              <Grid>
                <h2 style={{ color: "#FFF" }}>PACKAGE PAYMENT</h2>
                <Grid style={{ width: "90%" }}>
                  <Grid>
                    <Typography style={{ color: "#fff", lineHeight: "30px" }}>
                      {" "}
                      <span style={{ color: "#E9C547", fontWeight: 700 }}>
                        {" "}
                        SELECTED PACKAGE:
                      </span>{" "}
                      {packageValue}
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      {" "}
                      <span style={{ color: "#E9C547", fontWeight: 700 }}>
                        {" "}
                        PACKAGE PRICE:
                      </span>{" "}
                      {packagePrice}
                    </Typography>
                    {/* <CustomDropdown
                      fullWidth={true}
                      label={"Select Package"}
                      defaultValue={"Select Package"}
                      handleSelectChange={(e) =>
                        setPackageSelection(e.target.value)
                      }
                      menuItems={packageItems}
                    /> */}
                  </Grid>
                  <Grid style={{ marginTop: "40px" }}>
                    <CustomDropdown
                      label={"Select Registration Type"}
                      fullWidth={true}
                      handleSelectChange={(e) => {
                        setRegType(e.target.value);
                        e.target.value === "Pay Full Amount Online"
                          ? setPaymentMethodModal(true)
                          : setPaymentMethodModal(false);
                      }}
                      menuItems={[
                        "Free Registration",
                        // "Pay Partial Amount",
                        // "Pay Full Amount Online",
                      ]}
                    />
                  </Grid>
                  {regType === "Pay Partial Amount" && (
                    <>
                      <CustomTextField
                        fullWidth={true}
                        label={"Partial Amount"}
                        type={"number"}
                        isRequired={true}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="68px"
                        height={80}
                        value={null}
                        placeholder={""}
                        handleChange={(e) => setPartialAmt(e.target.value)}
                      />
                      <span style={{ color: "#E75A5A", marginTop: 5 }}>
                        Partial Amount should not exceed package amount
                      </span>
                      <Grid style={{ marginTop: "40px" }}>
                        <CustomDropdown
                          label={"Select Payment Type"}
                          fullWidth={true}
                          handleSelectChange={(e) => {
                            setPaymentType(e.target.value);
                          }}
                          menuItems={["Online", "Offline"]}
                        />
                      </Grid>
                      {paymentType === "Online" && (
                        <Grid
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <CustomButton
                            text="Continue to netbanking ?"
                            style={{
                              margin: "20px auto",
                              textAlign: "center",
                              padding: "6px",
                              background: "#664FA7",
                              color: "#FFF",
                              fontWeight: 700,
                            }}
                            onClick={netBanking}
                          />
                        </Grid>
                      )}

                      {paymentType === "Offline" && (
                        <Grid className={classes.dropdownContainer}>
                          <Grid
                            style={{ marginBottom: 10, textAlign: "center" }}
                          >
                            <Typography
                              style={{
                                color: "#FFF",
                                fontWeight: 700,
                                fontSize: 15,
                                margin: 8,
                              }}
                            >
                              {" "}
                              Upload Payment Slip
                            </Typography>
                            <div>
                              <label
                                htmlFor="my-file"
                                style={{ color: "#C5B1FF" }}
                              >
                                Select File
                                <input
                                  id="my-file"
                                  type="file"
                                  name="file"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    setPaymentSlip(e.target.files[0])
                                  }
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
                                {paymentSlip?.name}
                              </Typography>
                            </div>
                          </Grid>
                          <CustomTextField
                            fullWidth={true}
                            label={"Transaction ID"}
                            type={"text"}
                            isRequired={true}
                            autoComplete="off"
                            autoFocus
                            BoxHeight="68px"
                            height={70}
                            value={null}
                            placeholder={""}
                            handleChange={(e) => setTransID(e.target.value)}
                          />
                        </Grid>
                      )}
                    </>
                  )}
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

          {/**mobilr */}
          <Grid className={classes.containerClass}>
            <SponsorDetails />
            <Grid className={classes.arrow} style={{ marginBottom: 30 }}>
              <span className={classes.personalDetailsButton}>
                PACKAGE PAYMENT
              </span>
            </Grid>
            <Grid style={{ width: "90%", margin: "20px auto" }}>
              <Grid>
                <Typography style={{ color: "#fff", lineHeight: "30px" }}>
                  {" "}
                  <span style={{ color: "#E9C547", fontWeight: 700 }}>
                    {" "}
                    SELECTED PACKAGE:
                  </span>{" "}
                  {packageValue}
                </Typography>
                <Typography style={{ color: "#fff" }}>
                  {" "}
                  <span style={{ color: "#E9C547", fontWeight: 700 }}>
                    {" "}
                    PACKAGE PRICE:
                  </span>{" "}
                  {packagePrice}
                </Typography>
              </Grid>
              <Grid style={{ marginTop: "40px" }}>
                <CustomDropdown
                  label={"Select Registration Type"}
                  fullWidth={true}
                  handleSelectChange={(e) => {
                    setRegType(e.target.value);
                    e.target.value === "Pay Full Amount Online"
                      ? setPaymentMethodModal(true)
                      : setPaymentMethodModal(false);
                  }}
                  menuItems={[
                    "Free Registration",
                    "Pay Partial Amount",
                    "Pay Full Amount Online",
                  ]}
                />
              </Grid>
              {regType === "Pay Partial Amount" && (
                <>
                  <CustomTextField
                    fullWidth={true}
                    label={"Partial Amount"}
                    type={"number"}
                    isRequired={true}
                    autoComplete="off"
                    autoFocus
                    BoxHeight="68px"
                    height={80}
                    value={null}
                    placeholder={""}
                    handleChange={(e) => setPartialAmt(e.target.value)}
                  />
                  <span style={{ color: "#E75A5A", marginTop: 5 }}>
                    Partial Amount should not exceed package amount
                  </span>
                  <Grid style={{ marginTop: "20px" }}>
                    <CustomDropdown
                      label={"Select Payment Type"}
                      fullWidth={true}
                      handleSelectChange={(e) => {
                        setPaymentSlip(null);
                        setTransID(null);
                        setPaymentType(e.target.value);
                      }}
                      menuItems={["Online", "Offline"]}
                    />
                  </Grid>
                  {paymentType === "Online" && (
                    <Grid
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <CustomButton
                        text="Continue to netbanking ?"
                        style={{
                          margin: "20px auto",
                          textAlign: "center",
                          padding: "6px",
                          background: "#664FA7",
                          color: "#FFF",
                          fontWeight: 700,
                        }}
                        onClick={netBanking}
                      />
                    </Grid>
                  )}
                  {paymentType === "Offline" && (
                    <Grid className={classes.dropdownContainer}>
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
                          Upload Payment Slip
                        </Typography>
                        <div>
                          <label htmlFor="my-file" style={{ color: "#C5B1FF" }}>
                            Select File
                            <input
                              id="my-file"
                              type="file"
                              name="file"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                setPaymentSlip(e.target.files[0])
                              }
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
                            {paymentSlip?.name}
                          </Typography>
                        </div>
                      </Grid>
                      <CustomTextField
                        fullWidth={true}
                        label={"Transaction ID"}
                        type={"number"}
                        isRequired={true}
                        autoComplete="off"
                        autoFocus
                        BoxHeight="68px"
                        height={70}
                        value={null}
                        placeholder={""}
                        handleChange={(e) => setTransID(e.target.value)}
                      />
                    </Grid>
                  )}
                </>
              )}
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
        </>
      )}

      <Modal
        open={paymentMethodModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.paymentBox}>
          {!showCardType && (
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{ color: "#E9C547", fontWeight: 300, fontSize: 14 }}
              >
                Card
              </Typography>
              <CustomButton
                text="Card"
                hideText={true}
                variant="contained"
                btnIcon={CardIcon}
                margin="16px"
                onClick={() => {
                  setShowCardType(true);
                }}
                style={{ marginBottom: 15 }}
              />
              <Typography
                style={{ color: "#E9C547", fontWeight: 300, fontSize: 14 }}
              >
                UPI
              </Typography>
              <CustomButton
                text="UPI"
                hideText={true}
                variant="contained"
                btnIcon={UpiIcon}
                margin="16px"
                style={{ marginBottom: 5 }}
                onClick={() => {
                  payOnline("upi", "upi", null);
                }}
              />

              <Grid>
                <Button
                  style={{
                    borderRadius: 2,
                    fontFamily: "Oxygen",
                    color: "#E9C547",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: "40px",
                    boxShadow: "unset",
                    height: 36,
                    TextTransform: "uppercase",
                    float: "right",
                  }}
                  onClick={() => setPaymentMethodModal(false)}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          )}
          {/* Card Type */}
          {showCardType && (
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{ color: "#E9C547", fontWeight: 300, fontSize: 14 }}
              >
                CREDIT CARD
              </Typography>
              <CustomButton
                text="Credit Card"
                hideText={true}
                variant="contained"
                btnIcon={CardIcon}
                margin="16px"
                style={{ marginBottom: 5 }}
                onClick={() => {
                  payOnline("cc,dc", "card", "credit");
                }}
              />

              <Typography
                style={{ color: "#E9C547", fontWeight: 700, marginBottom: 10 }}
              >
                You will be charged 2.5% for Credit Card Payment
              </Typography>
              <Typography
                style={{ color: "#E9C547", fontWeight: 300, fontSize: 14 }}
              >
                DEBIT CARD
              </Typography>
              <CustomButton
                text="Debit Card"
                hideText={true}
                variant="contained"
                btnIcon={CardIcon}
                margin="16px"
                style={{ marginBottom: 5 }}
                onClick={() => {
                  payOnline("cc,dc", "card", "debit");
                }}
              />
              <Typography style={{ color: "#E9C547", fontWeight: 700 }}>
                You will be charged 1.9% for Debit Card Payment
              </Typography>
              <Grid>
                <Button
                  style={{
                    borderRadius: 2,
                    fontFamily: "Oxygen",
                    color: "#E9C547",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: "40px",
                    boxShadow: "unset",
                    height: 36,
                    TextTransform: "uppercase",
                    float: "right",
                  }}
                  onClick={() => setShowCardType(false)}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(PackagePayment);
