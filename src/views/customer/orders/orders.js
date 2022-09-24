import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Modal,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DetailsTable from "../../../customComponents/detailsTable";
import CustomDropdown from "../../../customComponents/dropdown";
import Tabs from "../../../customComponents/tabs";
import { URLS, requestUrl } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import CustomSpinner from "../../../customComponents/spinner";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CardIcon from "../../../assets/card.png";
import UpiIcon from "../../../assets/upi.png";
import styles from "./orders.styles";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { typography } from "@mui/system";
import * as XLSX from "xlsx";

const Orders = ({ classes }) => {
  const [redirect, setRedirect] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchBy, setSearchBy] = useState("");
  const [showPackageDetails, setShowPackageDetails] = useState(false);
  const [packages1, setPackages] = useState(null);
  const [repurchasePackages, setRepurchasePackages] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [packageCode, setPackageCode] = useState(null);
  const [packageId, setPackageId] = useState(null);
  const [packageName, setPackageName] = useState(null);
  const [packageAmt, setPackageAmt] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [transID, setTransID] = useState(null);
  const [paymentSlip, setPaymentSlip] = useState(null);
  //order report
  const [orderReport, setOrderReport] = useState(null);
  const [repurchaseOrderReport, setRepurchaseOrderReport] = useState(null);
  const [paymentMethodModal, setPaymentMethodModal] = useState(null);
  const [showCardType, setShowCardType] = useState(false);

  //trip request
  const [tripRequest, setTripRequest] = useState(null);
  const [createTripReq, setCreateTripReq] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripType, setTripType] = useState(null);
  const [tripSelect, setTripSelect] = useState(null);
  const [adultsNo, setAdultsNo] = useState(0);
  const [childNo, setChildNo] = useState(0);

  //snackbar
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [passengerDetails, setPassengerDetails] = useState([
    {
      id: uuidv4(),
      guest_name: "",
      guest_age: "",
      contact_number: "",
      email_id: "",
    },
  ]);

  //repurchase order
  const [repurchaseOrderQty, setRepurchaseOrderQty] = useState(null);

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
  };

  const createTripRequest = () => {
    setCreateTripReq(true);
  };

  const getTripPackages = async () => {
    let dashboardDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.DASHBOARD,
    });
    if (
      dashboardDetails?.status === "401" ||
      dashboardDetails?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);

    if (dashboardDetails) {
      setLoading(false);
      setCurrentPackage(dashboardDetails?.data?.my_package);
    }

    let packages = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PACKAGES,
    });
    if (packages) {
      setPackages(packages?.response);
      setLoading(false);
    }
  };

  const getRepurchaseTripPackages = async () => {
    let packages = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.REPURCHASECUSTOMERPACKAGES,
    });
    if (packages) {
      setRepurchasePackages(packages?.response);
      setLoading(false);
    }
  };

  const getOrderReport = async () => {
    let orderReport = await allRequestHandler({
      requestType: "GET",
      requestUrl:
        requestUrl +
        "orders?user__username=" +
        JSON.parse(localStorage.getItem("loginData")).username,
    });
    if (orderReport) {
      setOrderReportData(orderReport);
    }
  };

  const setOrderReportData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: p?.id,
        userName: p?.user?.username,
        firstName: p?.user?.first_name,
        lastName: p?.user?.last_name,
        packageId: p?.package_selected?.id,
        packageName: p?.package_selected?.name,
        packagePrice: p?.package_selected?.price,
        paymentType: p?.payment_type,
        transactionId: p?.transaction_id,
        paymentSlip: p?.payment_slip,
        requestedOn: moment(p?.requested_on).format("DD/MM/YYYY"),
        status: p?.approved ? "Approved" : "On Hold",
        invoiceview: (
          <Button
            onClick={() =>
              window.open(URLS.UPGRADEINVOICE + p?.id, "_blank").focus()
            }
          >
            <RemoveRedEyeRoundedIcon
              style={{ fontSize: 22, color: "#808080" }}
            />
          </Button>
        ),
      };
    });
    setOrderReport(content);
  };

  const getRepurchaseOrderReport = async () => {
    let repurchaseOrderReport = await allRequestHandler({
      requestType: "GET",
      requestUrl:
        requestUrl +
        "repurchase?user__username=" +
        JSON.parse(localStorage.getItem("loginData")).username,
    });
    if (repurchaseOrderReport) {
      setRepurchaseOrderReportData(repurchaseOrderReport);
    }
  };

  const setRepurchaseOrderReportData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        userName: p?.user?.username,
        firstName: p?.user?.first_name,
        lastName: p?.user?.last_name,
        packageId: p?.package_selected?.id,
        packageName: p?.package_selected?.name,
        packagePrice: p?.package_selected?.price,
        qunatity: p?.quantity,
        amount: p?.amount,
        paid: p?.repurchase_paid ? "Approved" : "On Hold",
        requestedOn: moment(p?.requested_on).format("DD/MM/YYYY"),
        status: p?.approved ? "Approved" : "On Hold",
        invoice: p?.invoice_number,
        invoiceview: (
          <Button
            onClick={() =>
              window.open(URLS.REPURCHASEINVOICE + p?.id, "_blank").focus()
            }
          >
            <RemoveRedEyeRoundedIcon
              style={{ fontSize: 22, color: "#808080" }}
            />
          </Button>
        ),
      };
    });
    setRepurchaseOrderReport(content);
  };

  const getTripRequest = async () => {
    const username = JSON.parse(localStorage.getItem("loginData"))?.username;

    let tripRequest = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TRIPDETAILS + `?trip__user__username=${username}`,
    });
    setTripRequestData(tripRequest);
  };

  const setTripRequestData = (data) => {
    const content = data?.map((user) => {
      return {
        id: user?.id,
        start_date: moment(user?.trip_start_date).format("MMM Do YY"),
        end_date: moment(user?.trip_end_date).format("MMM Do YY"),
        trip_name: user?.package_selected?.name,
        trip_type: user?.package_selected?.category,
        created_on: moment(user?.package_selected?.created_at).format(
          "MMM Do YY"
        ),
        status: user?.trip?.approved ? "Approved" : "On Hold",
        trip_status: user?.trip?.redeemed ? "Pending" : "Trip Completed",
        invoiceview: (
          <Button
            onClick={() =>
              window.open(URLS.UPGRADETRIPINVOICE + user?.id, "_blank").focus()
            }
          >
            <RemoveRedEyeRoundedIcon
              style={{ fontSize: 22, color: "#808080" }}
            />
          </Button>
        ),
      };
    });
    setTripRequest(content);
  };

  const showPackage = (detail) => {
    setShowPackageDetails(true);
    setPackageId(detail?.id);
    setPackageCode(detail?.package_id);
    setPackageName(detail?.name);
    setPackageAmt(detail?.price);
  };

  const cancelPackageDetails = () => {
    setShowPackageDetails(false);
    setPackageCode("");
    setPackageName("");
    setPackageAmt("");
    setPaymentType(null);
    setTransID(null);
    setPaymentSlip(null);
    setRepurchaseOrderQty(null);
  };

  const packDeets = [
    {
      title: "Package Code",
      value: packageCode,
    },
    {
      title: "Package Name",
      value: packageName,
    },
    {
      title: "Amount",
      value: packageAmt,
    },
    {
      title: "Quantity",
      value: 1,
    },
    {
      title: "Total",
      value: packageAmt,
    },
  ];

  const tripDeets = [
    {
      title: "Trip Code",
      value: packageCode,
    },
    {
      title: "Trip Name",
      value: packageName,
    },
    {
      title: "Amount",
      value: packageAmt * (repurchaseOrderQty > 1 ? repurchaseOrderQty : 1),
    },
    {
      title: "Description",
      value: 1,
    },
    // {
    //   title: "Quantity",
    //   value: 1,
    // },
    {
      title: "Total",
      value: packageAmt * (repurchaseOrderQty > 1 ? repurchaseOrderQty : 1),
    },
  ];

  const selectTripMenuItems = packages1?.map((pack) => {
    return {
      id: pack?.id,
      name: pack?.name,
      item_id: pack?.package_id,
    };
  });

  const selectRepurchaseTripMenuItems = repurchasePackages?.map((pack) => {
    return {
      id: pack?.id,
      name: pack?.name,
      item_id: pack?.package_id,
    };
  });

  const handleChangeInput = (id, event, name) => {
    const newInputFields = passengerDetails.map((i) => {
      if (id === i.id) {
        i[name] = event.target.value;
      }
      return i;
    });

    setPassengerDetails(newInputFields);
  };

  const handleAddFields = () => {
    setPassengerDetails([
      ...passengerDetails,
      {
        id: uuidv4(),
        guest_name: "",
        guest_age: "",
        contact_number: "",
        email_id: "",
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...passengerDetails];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setPassengerDetails(values);
  };

  const onChange = (e, name) => {
    if (name === "Start Date") setStartDate(e.target.value);
    else if (name === "End Date") {
      setEndDate(e.target.value);
    } else if (name === "Number of Adults") {
      setAdultsNo(e.target.value);
    } else if (name === "Number of Children") {
      setChildNo(e.target.value);
    } else console.log("no val");
  };

  const requestTripModal = [
    {
      name: "Start Date",
      value: null,
      type: "date",
    },
    {
      name: "End Date",
      value: null,
      type: "date",
    },
    {
      name: "Number of Adults",
      placeholder: "Eg: 123456789",
      value: null,
      type: "number",
    },
    {
      name: "Number of Children",
      placeholder: "Eg: abcdefghijkl",
      value: null,
      type: "number",
    },
  ];

  const getTotal = () => {
    return parseInt(adultsNo) + parseInt(childNo);
  };

  const requestTripApi = async () => {
    console.log(tripSelect);
    const tripDeets = {
      user: JSON.parse(localStorage.getItem("loginData")).id,
      package_selected: tripSelect,
      trip_start_date: startDate,
      trip_end_date: endDate,
      type: tripType,
      number_of_adults: adultsNo,
      number_of_children: childNo,
      trip_details: passengerDetails.map((pac) => {
        return {
          guest_name: pac.guest_name,
          guest_age: pac.guest_age,
          contact_number: pac.contact_number,
          email_id: pac.email_id,
          trip_date: startDate,
        };
      }),
    };
    if (
      tripSelect !== null &&
      startDate !== null &&
      endDate !== null &&
      tripType !== null &&
      adultsNo !== 0 &&
      childNo !== null &&
      passengerDetails.length > 0
    ) {
      const sendTripRequest = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.REQUESTTRIP,
        requestData: tripDeets,
      });
      if (sendTripRequest.data) {
        setDisplayMsg("Trip Request Sent!");
        setSeverity("success");
        setHandleSnackbar(true);
        setCreateTripReq(false);
        getTripRequest();
      } else {
        setDisplayMsg("Oops something went wrong!");
        setSeverity("error");
        setHandleSnackbar(true);
      }
    } else {
      setDisplayMsg(
        "Please enter all details and atleast one passenger detail"
      );
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const sendOrderReport = async () => {
    if (paymentType === "Offline") {
      if (transID && paymentSlip) {
        const formData = new FormData();
        formData.append(
          "order_no",
          Math.floor(100000 + Math.random() * 900000)
        );
        formData.append(
          "user",
          JSON.parse(localStorage.getItem("loginData")).username
        );
        formData.append("quantity", 1);
        formData.append("order_value", packageAmt);
        formData.append("payment_type", paymentType);
        formData.append("package_selected", packageId);
        formData.append("transaction_id", transID);
        formData.append(
          "payment_slip",
          paymentSlip,
          `${
            JSON.parse(localStorage.getItem("loginData")).mobile_number
          } - payment_slip`
        );
        const sendOrderDetails = await allRequestHandler({
          requestType: "IMAGE",
          requestUrl: URLS.ORDERREPORT,
          requestData: formData,
        });

        if (
          sendOrderDetails?.response?.message === "Package updated successfully"
        ) {
          setSeverity("success");
          setDisplayMsg("Order Placed!");
          setHandleSnackbar(true);
          cancelPackageDetails();
        } else {
          setSeverity("error");
          setDisplayMsg("Something went wrong");
          setHandleSnackbar(true);
        }
      } else {
        setSeverity("error");
        setDisplayMsg(
          "Please upload payment slip and mention the transaction ID"
        );
        setHandleSnackbar(true);
      }
    }
  };

  const requestRepurchaseApi = async () => {
    const data = {
      user: JSON.parse(localStorage.getItem("loginData")).id,
      package_selected: packageId,
      quantity: repurchaseOrderQty,
      amount: packageAmt * (repurchaseOrderQty > 1 ? repurchaseOrderQty : 1),
    };
    const sendRepurchaseDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.TRIPREPURCHASE,
      requestData: data,
    });
    if (repurchaseOrderQty) {
      if (sendRepurchaseDetails?.response === "Trip repurchases successfully") {
        setSeverity("success");
        setDisplayMsg("Trip repurchase request sent!");
        setHandleSnackbar(true);
        cancelPackageDetails();
      } else {
        setSeverity("error");
        setDisplayMsg("Something went wrong");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter the quantity");
      setHandleSnackbar(true);
    }
  };

  const exportToExcel = (data, type) => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, type);
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(
      workBook,
      `${type} - ${
        new Date().getFullYear() +
        " - " +
        (new Date().getMonth() + 1) +
        " - " +
        new Date().getDate()
      }.xlsx`
    );
  };

  const payOnline = async (method, type, cardType) => {
    let data = {
      order_amount: packageAmt,
      order_currency: "INR",
      type: type,
      card_type: cardType,
      customer_details: {
        customer_id: JSON.parse(localStorage.getItem("loginData"))
          ?.mobile_number,
        customer_email: JSON.parse(localStorage.getItem("loginData"))?.email,
        customer_phone: JSON.parse(localStorage.getItem("loginData"))
          ?.mobile_number,
      },
      order_meta: {
        return_url:
          window.location.protocol +
          "//" +
          window.location.host +
          "/confirmPayment?order_id={order_id}&order_token={order_token}&order_value=" +
          packageAmt +
          "&package_selected=" +
          packageId,
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
      window.open(pay?.payment_link, "_self", "noopener,noreferrer");
    } else {
      setSeverity("error");
      setDisplayMsg("Somehing went wrong");
      setHandleSnackbar(true);
    }
  };

  const uploadPaymentSlip = (e) => {
    let selectedFile = e.target.files[0];
    const fsize = selectedFile.size;
    const file = Math.round(fsize / 1024);
    if (file > 2048) {
      setSeverity("error");
      setDisplayMsg("File too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
    } else {
      setPaymentSlip(selectedFile);
    }
  };

  useEffect(() => {
    getTripPackages();
    getOrderReport();
    getTripRequest();
    getRepurchaseOrderReport();
    getRepurchaseTripPackages();
  }, []);

  if (redirect) {
    return <Redirect push to="/login" />;
  }
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
          <Modal
            open={createTripReq}
            onClose={() => setCreateTripReq(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modal}>
              <Grid
                container
                style={{
                  justifyContent: "space-between",
                  borderBottom: "2px solid #D0D0D0",
                  alignItems: "center",
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
                  REQUEST A NEW TRIP
                </Typography>
                <Button
                  onClick={() => setCreateTripReq(false)}
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
                </Button>
              </Grid>
              <Grid className={classes.textFieldContainer}>
                {requestTripModal.map((field) => {
                  return (
                    <CustomTextField
                      fullWidth={true}
                      label={field.name}
                      type={field.type}
                      isRequired={true}
                      autoComplete="off"
                      autoFocus
                      BoxHeight="68px"
                      height={70}
                      value={field.value}
                      placeholder={field.placeholder}
                      handleChange={(e) => onChange(e, field.name)}
                    />
                  );
                })}
                <Grid style={{ marginTop: "20px" }}>
                  <CustomDropdown
                    label={"Trip Type"}
                    fullWidth={true}
                    defaultValue={"Select Package"}
                    handleSelectChange={(e) => setTripType(e.target.value)}
                    menuItems={["Domestic", "International"]}
                  />
                </Grid>
                <Grid className={classes.marginTp}>
                  <CustomDropdown
                    label={"Select Trip"}
                    fullWidth={true}
                    defaultValue={"Select Package"}
                    handleSelectChange={(e) => setTripSelect(e.target.value)}
                    menuItems={selectRepurchaseTripMenuItems}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.stickyButton}>
                <CustomButton
                  text="Request Trip"
                  style={{
                    color: "#000",
                    padding: "26px 45px",
                    fontWeight: 700,
                  }}
                  onClick={requestTripApi}
                />
              </Grid>
            </Box>
          </Modal>
          <Grid className={classes.outerContainer}>
            <Grid className={classes.tabContainer}>
              <Tabs
                labels={[
                  "Order Now",
                  "Order Report",
                  "Repurchase Order",
                  "Repurchase Order Report",
                ]}
                tabChange={tabChange}
                value={currentTab}
              />
            </Grid>

            <Grid className={classes.tableContainer}>
              {currentTab === 0 ? (
                <>
                  <Grid className={classes.personalDetailsContainer}>
                    <Grid container>
                      <Typography
                        item
                        className={classes.title}
                        style={{ borderRight: "2px solid #434343" }}
                      >
                        UPGRADE PACKAGE
                      </Typography>{" "}
                      <span item style={{ marginTop: 5, color: "#FFF" }}>
                        Upgrade to better packages
                      </span>
                    </Grid>

                    <Grid className={classes.selectedPackageCard}>
                      <Typography style={{ fontWeight: 700, fontSize: 18 }}>
                        Current Package
                      </Typography>
                      <span className={classes.starIcon}>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5798 4.57767L8.68268 3.98457L6.94055 0.28611C6.89297 0.184848 6.81469 0.102875 6.71799 0.0530477C6.47547 -0.0723237 6.18077 0.0321525 6.05951 0.28611L4.31738 3.98457L0.420236 4.57767C0.312792 4.59374 0.214557 4.64679 0.139346 4.72715C0.0484205 4.82502 -0.00168366 4.95668 4.32016e-05 5.09321C0.00177006 5.22974 0.0551867 5.35996 0.148556 5.45527L2.96819 8.33399L2.30204 12.3989C2.28642 12.4935 2.29641 12.5907 2.33088 12.6796C2.36536 12.7686 2.42293 12.8456 2.49708 12.902C2.57123 12.9584 2.65898 12.9919 2.75039 12.9987C2.8418 13.0055 2.9332 12.9854 3.01424 12.9406L6.50003 11.0214L9.98582 12.9406C10.081 12.9936 10.1915 13.0113 10.2974 12.992C10.5645 12.9438 10.7441 12.6786 10.698 12.3989L10.0319 8.33399L12.8515 5.45527C12.9283 5.37651 12.9789 5.27364 12.9943 5.16113C13.0357 4.87985 12.8484 4.61946 12.5798 4.57767Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <Grid
                        container
                        style={{
                          justifyContent: "space-between",
                          marginTop: 40,
                        }}
                      >
                        <Typography style={{ fontSize: 16 }}>
                          {currentPackage?.package_name}
                        </Typography>
                        <Typography style={{ fontSize: 16 }}>
                          {currentPackage?.package_price}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid className={classes.cardSlider}>
                      {packages1?.map((pack) => {
                        return (
                          <Grid
                            className={classes.packageCard}
                            style={
                              pack.package_id === packageCode
                                ? {
                                    boxShadow:
                                      "0px 12px 17px rgba(197, 177, 255, 0.14), 0px 5px 22px rgba(197, 177, 255, 0.12), 0px 7px 8px rgba(197, 177, 255, 0.2)",
                                  }
                                : {
                                    border: "2px solid #C5B1FF",
                                  }
                            }
                          >
                            <Typography
                              style={{ fontWeight: 700, fontSize: 18 }}
                            >
                              {pack?.name}
                            </Typography>
                            <span className={classes.starIcon}>
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5798 4.57767L8.68268 3.98457L6.94055 0.28611C6.89297 0.184848 6.81469 0.102875 6.71799 0.0530477C6.47547 -0.0723237 6.18077 0.0321525 6.05951 0.28611L4.31738 3.98457L0.420236 4.57767C0.312792 4.59374 0.214557 4.64679 0.139346 4.72715C0.0484205 4.82502 -0.00168366 4.95668 4.32016e-05 5.09321C0.00177006 5.22974 0.0551867 5.35996 0.148556 5.45527L2.96819 8.33399L2.30204 12.3989C2.28642 12.4935 2.29641 12.5907 2.33088 12.6796C2.36536 12.7686 2.42293 12.8456 2.49708 12.902C2.57123 12.9584 2.65898 12.9919 2.75039 12.9987C2.8418 13.0055 2.9332 12.9854 3.01424 12.9406L6.50003 11.0214L9.98582 12.9406C10.081 12.9936 10.1915 13.0113 10.2974 12.992C10.5645 12.9438 10.7441 12.6786 10.698 12.3989L10.0319 8.33399L12.8515 5.45527C12.9283 5.37651 12.9789 5.27364 12.9943 5.16113C13.0357 4.87985 12.8484 4.61946 12.5798 4.57767Z"
                                  fill="#E9C547"
                                />
                              </svg>
                            </span>
                            <Grid
                              container
                              style={{
                                justifyContent: "space-between",
                                marginTop: 20,
                                alignItems: "center",
                              }}
                            >
                              <Typography style={{ fontSize: 16 }}>
                                Rs. {pack?.price}
                              </Typography>
                              <Button
                                className={classes.upgradeBtn}
                                onClick={() => showPackage(pack)}
                              >
                                <span>
                                  {pack.package_id === packageCode
                                    ? "Selected"
                                    : "Select"}
                                </span>
                              </Button>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>

                  {showPackageDetails && (
                    <Grid className={classes.personaDetails}>
                      <Typography
                        className={classes.title}
                        style={{
                          borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
                          padding: 5,
                          marginBottom: 15,
                        }}
                      >
                        PACKAGE DETAILS
                      </Typography>
                      {packDeets.map((pack, index) => {
                        return (
                          <Grid
                            container
                            className={classes.detailsRow}
                            style={
                              index % 2 === 0
                                ? {
                                    background: "rgba(197, 177, 255, 0.2)",
                                    borderRadius: 10,
                                  }
                                : { background: "none" }
                            }
                          >
                            <Typography className={classes.detailValue}>
                              {pack.title}{" "}
                            </Typography>
                            <Typography
                              className={classes.detailValue}
                              style={{ fontWeight: 700, color: "#fff" }}
                            >
                              {" "}
                              {pack.value}
                            </Typography>
                          </Grid>
                        );
                      })}

                      <Grid className={classes.dropdownContainer}>
                        <CustomDropdown
                          label={"Select Payment Type"}
                          fullWidth={true}
                          handleSelectChange={(e) => {
                            setPaymentSlip(null);
                            setTransID(null);
                            setPaymentType(e.target.value);
                            e.target.value === "Online"
                              ? setPaymentMethodModal(true)
                              : setPaymentMethodModal(false);
                          }}
                          menuItems={["Offline", "Online"]}
                        />
                      </Grid>

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
                                  onChange={uploadPaymentSlip}
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

                      {paymentType === "Offline" && (
                        <Grid container>
                          <CustomButton
                            text="Confirm and Pay"
                            style={{
                              margin: "20px auto",
                              textAlign: "center",
                              padding: "6px 35px",
                              background: "#C5B1FF",
                              color: "#262626",
                              fontWeight: 700,
                            }}
                            onClick={sendOrderReport}
                          />
                          <CustomButton
                            text="Cancel"
                            style={{
                              margin: "10px auto",
                              textAlign: "center",
                              padding: "6px 35px",
                              background: "none",
                              boxShadow: "none",
                              fontWeight: 700,
                              border: "2px solid #ccc",
                              color: "#FFF",
                            }}
                            onClick={cancelPackageDetails}
                          />
                        </Grid>
                      )}
                    </Grid>
                  )}
                </>
              ) : currentTab === 1 ? (
                <Grid style={{ minHeight: "100vh", height: "auto" }}>
                  <Table
                    header={[
                      "Id",
                      "Username",
                      "Firstname",
                      "Lastname",
                      "Package Id",
                      "Package Name",
                      "Package Price",
                      "Payment Type",
                      "Transaction Id",
                      "Payment Slip",
                      "Requested On",
                      "Status",
                      "Invoice",
                    ]}
                    data={orderReport}
                    title={"ORDER REPORTS"}
                    showMenuOptions={false}
                    showPagination={true}
                    showFilterButton={true}
                    filterType={"User Orders"}
                    dataURL={`${URLS.ORDERREPORT}?userusername=${
                      JSON.parse(localStorage.getItem("loginData"))?.username
                    }`}
                    setData={setOrderReportData}
                    exportExcel={true}
                    exportToExcelClick={() =>
                      exportToExcel(orderReport, "order-report")
                    }
                  />
                </Grid>
              ) : currentTab === 2 ? (
                <>
                  <Grid className={classes.personalDetailsContainer}>
                    <Grid container>
                      <Typography
                        item
                        className={classes.title}
                        style={{
                          borderRight: "2px solid #434343",
                          textTransform: "uppercase",
                        }}
                      >
                        Repurchase Trips
                      </Typography>{" "}
                      <span item style={{ marginTop: 5, color: "#FFF" }}>
                        Repurchase your favourite trips
                      </span>
                    </Grid>

                    <Grid className={classes.cardSlider}>
                      {repurchasePackages?.map((pack) => {
                        return (
                          <Grid
                            className={classes.packageCard}
                            style={
                              pack.package_id === packageCode
                                ? {
                                    border: "2px solid #E9C547",
                                    boxShadow:
                                      "0px 12px 17px rgba(233, 197, 71, 0.14), 0px 5px 22px rgba(233, 197, 71, 0.12), 0px 7px 8px rgba(233, 197, 71, 0.2)",
                                  }
                                : {
                                    border: "1px solid #E9C547",
                                  }
                            }
                          >
                            <Typography
                              style={{ fontWeight: 700, fontSize: 18 }}
                            >
                              {pack?.name}
                            </Typography>
                            <span className={classes.starIcon}>
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5798 4.57767L8.68268 3.98457L6.94055 0.28611C6.89297 0.184848 6.81469 0.102875 6.71799 0.0530477C6.47547 -0.0723237 6.18077 0.0321525 6.05951 0.28611L4.31738 3.98457L0.420236 4.57767C0.312792 4.59374 0.214557 4.64679 0.139346 4.72715C0.0484205 4.82502 -0.00168366 4.95668 4.32016e-05 5.09321C0.00177006 5.22974 0.0551867 5.35996 0.148556 5.45527L2.96819 8.33399L2.30204 12.3989C2.28642 12.4935 2.29641 12.5907 2.33088 12.6796C2.36536 12.7686 2.42293 12.8456 2.49708 12.902C2.57123 12.9584 2.65898 12.9919 2.75039 12.9987C2.8418 13.0055 2.9332 12.9854 3.01424 12.9406L6.50003 11.0214L9.98582 12.9406C10.081 12.9936 10.1915 13.0113 10.2974 12.992C10.5645 12.9438 10.7441 12.6786 10.698 12.3989L10.0319 8.33399L12.8515 5.45527C12.9283 5.37651 12.9789 5.27364 12.9943 5.16113C13.0357 4.87985 12.8484 4.61946 12.5798 4.57767Z"
                                  fill="#E9C547"
                                />
                              </svg>
                            </span>
                            <Grid
                              container
                              style={{
                                justifyContent: "space-between",
                                marginTop: 20,
                                alignItems: "center",
                              }}
                            >
                              <Typography style={{ fontSize: 16 }}>
                                Rs. {pack?.price}
                              </Typography>
                              <Button
                                className={classes.upgradeBtn}
                                style={{ background: "#E9C547 !important" }}
                                onClick={() => setCreateTripReq(true)}
                              >
                                <span>Buy Now</span>
                              </Button>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </>
              ) : currentTab === 3 ? (
                <Grid style={{ minHeight: "100vh", height: "auto" }}>
                  <Table
                    header={[
                      "Id",
                      "Username",
                      "Firstname",
                      "Lastname",
                      "Package Id",
                      "Package Name",
                      "Package Price",
                      "Quantity",
                      "Amount",
                      "Paid",
                      "Requested On",
                      "Status",
                      "Invoice No",
                      "Invoice",
                    ]}
                    data={repurchaseOrderReport}
                    title={"REPURCHASE ORDER REPORT"}
                    showPagination={true}
                    showMenuOptions={false}
                    dataURL={`${URLS.TRIPREPURCHASE}?userusername=${
                      JSON.parse(localStorage.getItem("loginData")).username
                    }`}
                    showFilterButton={true}
                    filterType={"User Orders"}
                    setData={setRepurchaseOrderReportData}
                    exportExcel={true}
                    exportToExcelClick={() =>
                      exportToExcel(repurchaseOrderReport, "order-report")
                    }
                  />
                </Grid>
              ) : (
                <div></div>
              )}
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

export default withStyles(styles)(Orders);
