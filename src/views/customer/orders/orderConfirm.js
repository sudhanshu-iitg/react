import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Grid, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import CustomSpinner from "../../../customComponents/spinner";
import ConfirmationModel from "../../../customComponents/modal";
import styles from "./orders.styles";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";

const ConfirmPayment = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  //snackbar
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [openModal, setOpenModal] = useState(true);
  const [orderResponse, setOrderResponse] = useState(true);

  const history = useHistory();

  const paymentConfirm = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const order_id = queryParams.get("order_id");
    const order_token = queryParams.get("order_token");
    const order_value = queryParams.get("order_value");
    const package_selected = queryParams.get("package_selected");

    let orderConfirm = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.CONFIRMPAYMENT,
      requestData: { order_id: order_id },
    });
    if (orderConfirm) {
      setOrderResponse(orderConfirm?.response);
      if (orderConfirm.response) {
        setSeverity("success");
        setDisplayMsg("Payment Successfully paid");
        setHandleSnackbar(true);
        if (createOrder(order_id, order_token, order_value, package_selected)) {
          setTimeout(function () {
            setSeverity("success");
            setDisplayMsg("Order updated Successfully");
            setHandleSnackbar(true);
          }, 2500);
        }
      } else {
        setSeverity("error");
        setDisplayMsg("Somehing went wrong");
        setHandleSnackbar(true);
      }
    }
    setTimeout(function () {
      history.push("/orders");
    }, 4000);
  };

  const createOrder = async (
    orderId,
    transactionId,
    orderValue,
    packageSelected
  ) => {
    const formData = new FormData();
    formData.append("order_no", orderId);
    formData.append(
      "user",
      JSON.parse(localStorage.getItem("loginData")).username
    );
    formData.append("quantity", 1);
    formData.append("order_value", orderValue);
    formData.append("payment_type", "online");
    formData.append("package_selected", packageSelected);
    formData.append("transaction_id", transactionId);

    let orderConfirm = await allRequestHandler({
      requestType: "IMAGE",
      requestUrl: URLS.ORDERREPORT,
      requestData: formData,
    });
    if (orderConfirm?.response?.message === "Package updated successfully") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    paymentConfirm();
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

          <Grid className={classes.outerContainer}></Grid>
        </>
      )}
      <ConfirmationModel
        confirmationHeading={"Payment Confirmation"}
        confirmationMessage={
          orderResponse
            ? "Your payment is successfylly paid and you will be redirected to order page in few sec"
            : "There is some error in payment procedure please try agein and you will be redirected to order page in few sec"
        }
        open={openModal}
      />
    </>
  );
};

export default withStyles(styles)(ConfirmPayment);
