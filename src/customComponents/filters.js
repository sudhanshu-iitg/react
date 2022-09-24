import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import CustomTextField from "./textfield";
import CustomDropdown from "./dropdown";
import CustomButton from "./primaryButton";
import { allRequestHandler } from "../api/index";

const styles = () => ({
  container: {
    borderRadius: 20,
    background: "rgba(197, 177, 255, 0.02)",
    boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
  },
  contentContainer: {
    background: "#282828",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridGap: 30,
    height: "30vh",
    width: "auto",
    padding: 20,
    "@media(max-width: 768px)": {
      gridTemplateColumns: "repeat(1,1fr)",
      gridGap: 100,
    },
  },
});

const objectToQueryString = (obj) => {
  let str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const removeEmptyValues = (obj) => {
  for (let k in obj) if (obj[k] === "" || obj[k] === null) delete obj[k];
  return obj;
};

const Filter = ({
  handleClose,
  open,
  classes,
  filterType,
  setData,
  dataURL,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userJoinDate, setUserJoinDate] = useState(null);
  const [userActivationDate, setUserActivateDate] = useState(null);
  const [userPackageSelectedName, setUserPackageName] = useState(null);
  const [userMobileNo, setUserMobileNo] = useState(null);
  const [userSponsorName, setUserSponsorName] = useState(null);
  const [userSponsorId, setUserSponsorId] = useState(null);
  const [userUplinkId, setUserUplinkId] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [userState, setUserState] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userUserName, setUserUserName] = useState(null);

  const [payoutsAdminEmail, setPayoutsAdminEmail] = useState(null);
  const [payoutsAdminMobile, setPayoutsAdminMobile] = useState(null);
  const [payoutsAdminUserName, setPayoutsAdminUsername] = useState(null);
  const [payoutsAdminPaid_on, setPayoutsAdminPayPaidOn] = useState(null);

  const [payoutsUserPaid_on, setPayoutsUserPaidOn] = useState(null);

  const [staffUsersUserName, setStaffUsersUserName] = useState(null);
  const [staffUsersEmail, setStaffUsersEmail] = useState(null);
  const [staffUsersFirstName, setStaffUsersFirstName] = useState(null);
  const [staffUsersLastName, setStaffUsersLastName] = useState(null);
  const [staffUsersMobile, setStaffUsersMobile] = useState(null);
  const [staffUsersIsApproved, setStaffUsersIsApproved] = useState(null);
  const [staffUsersActivatedOn, setStaffUsersActivatedOn] = useState(null);
  const [staffUsersDateJoin, setStaffUsersDateJoin] = useState(null);
  const [staffUsersIsBlocked, setStaffUsersIsBlocked] = useState(null);
  const [staffUsersDepartment, setStaffUsersDepartment] = useState(null);

  const [tripPackagesUserName, setTripPackagesUserName] = useState(null);
  const [tripPackagesApprovedOn, setTripPackagesApprovedOn] = useState(null);
  const [tripPackagesRedeemed, setTripPackagesRedeemed] = useState(null);
  const [tripPackagesType, setTripPackagesType] = useState(null);
  const [tripPackagesStartDate, setTripPackagesStartDate] = useState(null);
  const [tripPackagesEndDate, setTripPackagesEndDate] = useState(null);
  const [tripPackagesNoOfAdults, setTripPackagesNoOfAdults] = useState(null);
  const [tripPackagesNoOfChild, setTripPackagesNoOfChild] = useState(null);
  const [tripPackagesPackageSelected, setTripPackagesPackageSelected] =
    useState(null);

  const [ordersUserName, setOrdersUserName] = useState(null);
  const [ordersEmail, setOrdersEmail] = useState(null);
  const [ordersMobile, setOrdersMobile] = useState(null);
  const [ordersQuantity, setOrdersQuantity] = useState(null);
  const [ordersPaymentType, setOrdersPaymentType] = useState(null);
  const [ordersApprovedOn, setOrdersApprovedOn] = useState(null);

  const [adminTdsUserName, setAdminTdsUserName] = useState(null);
  const [adminTdsUploadedOn, setAdminTdsUploadedOn] = useState(null);

  const applyUsersFilters = async () => {
    const UserFilters = {
      date_joined: userJoinDate,
      activated_on: userActivationDate,
      package_selected__name: userPackageSelectedName,
      mobile_number: userMobileNo,
      sponsor_name: userSponsorName,
      sponsor_id: userSponsorId,
      uplink_id: userUplinkId,
      city: userCity,
      state: userState,
      country: userCountry,
      first_name: userFirstName,
      last_name: userLastName,
      username: userUserName,
    };
    let filtered = removeEmptyValues(UserFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyStaffUsersFilters = async () => {
    const StaffUserFilters = {
      username: staffUsersUserName,
      email_on: staffUsersEmail,
      first_name: staffUsersFirstName,
      last_name: staffUsersLastName,
      mobile_number: staffUsersMobile,
      is_approved: staffUsersIsApproved,
      activated_on: staffUsersActivatedOn,
      date_joined: staffUsersDateJoin,
      is_blocked: staffUsersIsBlocked,
      department: staffUsersDepartment,
    };
    let filtered = removeEmptyValues(StaffUserFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyPayoutsUsersFilters = async () => {
    const UserPayoutsFilters = {
      paid_on: payoutsUserPaid_on,
    };
    let filtered = removeEmptyValues(UserPayoutsFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyPayoutsAdminFilters = async () => {
    const AdminPayoutsFilters = {
      useremail: payoutsAdminEmail,
      usermobile_number: payoutsAdminMobile,
      user__username: payoutsAdminUserName,
      paid_on: payoutsAdminPaid_on,
    };
    let filtered = removeEmptyValues(AdminPayoutsFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyTripPackagesFilters = async () => {
    const TripPackagesFilters = {
      user__username: tripPackagesUserName,
      package_selected: tripPackagesPackageSelected,
      approved_on: tripPackagesApprovedOn,
      redeemed: tripPackagesRedeemed,
      type: tripPackagesType,
      trip_start_date: tripPackagesStartDate,
      trip_end_date: tripPackagesEndDate,
      number_of_adults: tripPackagesNoOfAdults,
      number_of_children: tripPackagesNoOfChild,
    };
    let filtered = removeEmptyValues(TripPackagesFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyOrdersFilters = async () => {
    const OrdersFilters = {
      user__username: ordersUserName,
      useremail: ordersEmail,
      user__mobile_number: ordersMobile,
      quantity: ordersQuantity,
      payment_type: ordersPaymentType,
      approved_on: ordersApprovedOn,
    };
    let filtered = removeEmptyValues(OrdersFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyUserOrdersFilters = async () => {
    const OrdersFilters = {
      useremail: ordersEmail,
      user__mobile_number: ordersMobile,
      quantity: ordersQuantity,
      payment_type: ordersPaymentType,
      approved_on: ordersApprovedOn,
    };
    let filtered = removeEmptyValues(OrdersFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyUserTripFilters = async () => {
    const TripPackagesFilters = {
      package_selected: tripPackagesPackageSelected,
      approved_on: tripPackagesApprovedOn,
      type: tripPackagesType,
      trip_start_date: tripPackagesStartDate,
      trip_end_date: tripPackagesEndDate,
      number_of_adults: tripPackagesNoOfAdults,
      number_of_children: tripPackagesNoOfChild,
    };
    let filtered = removeEmptyValues(TripPackagesFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}&${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyAdminTdsFilters = async () => {
    const AdminTdsFilters = {
      username__username: adminTdsUserName,
      uploaded_on: adminTdsUploadedOn,
    };
    let filtered = removeEmptyValues(AdminTdsFilters);
    let data = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${dataURL}?${objectToQueryString(filtered)}`,
    });
    if (
      data?.status === "401" ||
      data?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (data.status !== 404) {
      setLoading(false);
      handleClose();
      setData(data);
    }
  };

  const applyFilters = () => {
    if (filterType === "Users") {
      applyUsersFilters();
    } else if (filterType === "Payouts Admin") {
      applyPayoutsAdminFilters();
    } else if (filterType === "Payouts User") {
      applyPayoutsUsersFilters();
    } else if (filterType === "Payouts User") {
      applyPayoutsUsersFilters();
    } else if (filterType === "Staff Users") {
      applyStaffUsersFilters();
    } else if (filterType === "Trip Requests") {
      applyTripPackagesFilters();
    } else if (filterType === "Orders") {
      applyOrdersFilters();
    } else if (filterType === "User Trips") {
      applyUserTripFilters();
    } else if (filterType === "User Orders") {
      applyUserOrdersFilters();
    } else if (filterType === "Admin Tds") {
      applyAdminTdsFilters();
    }
  };
  return (
    <div>
      <Dialog
        className={classes.container}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ background: "#282828", color: "#E9C547", fontWeight: 700 }}
        >
          FILTERS
        </DialogTitle>
        <DialogContent dividers className={classes.contentContainer}>
          {filterType === "Users" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"Joining Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter joining date"}
                handleChange={(e) => setUserJoinDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Activation Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Activation date"}
                handleChange={(e) => setUserActivateDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Package Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter package name"}
                handleChange={(e) => setUserPackageName(e.target.value)}
              />

              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter user name"}
                handleChange={(e) => setUserUserName(e.target.value)}
              />

              <CustomTextField
                fullWidth={true}
                label={"Mobile Number"}
                type={"tel"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter mobile number"}
                handleChange={(e) => setUserMobileNo(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Sponsor Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter sponsor name"}
                handleChange={(e) => setUserSponsorName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Sponsor Id"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter sponsor id"}
                handleChange={(e) => setUserSponsorId(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Uplink Id"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter uplink id"}
                handleChange={(e) => setUserUplinkId(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"City"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter city"}
                handleChange={(e) => setUserCity(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"State"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter state"}
                handleChange={(e) => setUserState(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Country"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter country"}
                handleChange={(e) => setUserCountry(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"First name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter first name"}
                handleChange={(e) => setUserFirstName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Last name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter last name"}
                handleChange={(e) => setUserLastName(e.target.value)}
              />
            </>
          )}
          {filterType === "Payouts Admin" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"Email"}
                type={"email"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter email"}
                handleChange={(e) => setPayoutsAdminEmail(e.target.value)}
              />

              <CustomTextField
                fullWidth={true}
                label={"Mobile Number"}
                type={"tel"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter mobile number"}
                handleChange={(e) => setPayoutsAdminMobile(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter user name"}
                handleChange={(e) => setPayoutsAdminUsername(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Paid On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter paid on date"}
                handleChange={(e) => setPayoutsAdminPayPaidOn(e.target.value)}
              />
            </>
          )}
          {filterType === "Payouts User" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"Paid On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter paid on date"}
                handleChange={(e) => setPayoutsUserPaidOn(e.target.value)}
              />
            </>
          )}
          {filterType === "Staff Users" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter username"}
                handleChange={(e) => setStaffUsersUserName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Email"}
                type={"email"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter email"}
                handleChange={(e) => setStaffUsersEmail(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"First name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter first name"}
                handleChange={(e) => setStaffUsersFirstName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Last name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter last name"}
                handleChange={(e) => setStaffUsersLastName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Mobile Number"}
                type={"tel"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter mobile number"}
                handleChange={(e) => setStaffUsersMobile(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Is Approved"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter True or False"}
                handleChange={(e) => setStaffUsersIsApproved(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Activation Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Activation date"}
                handleChange={(e) => setStaffUsersActivatedOn(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Joining Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter joining date"}
                handleChange={(e) => setStaffUsersDateJoin(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Is Blocked"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter True or False"}
                handleChange={(e) => setStaffUsersIsBlocked(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Department"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter last name"}
                handleChange={(e) => setStaffUsersDepartment(e.target.value)}
              />
            </>
          )}
          {filterType === "Trip Requests" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter username"}
                handleChange={(e) => setTripPackagesUserName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Package Selected"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Package Selected"}
                handleChange={(e) =>
                  setTripPackagesPackageSelected(e.target.value)
                }
              />
              <CustomTextField
                fullWidth={true}
                label={"Approved On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Approved date"}
                handleChange={(e) => setTripPackagesApprovedOn(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Redeemed"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter redeemed"}
                handleChange={(e) => setTripPackagesRedeemed(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Type"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter type"}
                handleChange={(e) => setTripPackagesType(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Trip Start Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter trip start date"}
                handleChange={(e) => setTripPackagesStartDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Trip End Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter trip end date"}
                handleChange={(e) => setTripPackagesEndDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"No of Adults"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter no of adults"}
                handleChange={(e) => setTripPackagesNoOfAdults(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"No of children"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter no of children"}
                handleChange={(e) => setTripPackagesNoOfChild(e.target.value)}
              />
            </>
          )}
          {filterType === "User Trips" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"Package Selected"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Package Selected"}
                handleChange={(e) =>
                  setTripPackagesPackageSelected(e.target.value)
                }
              />
              <CustomTextField
                fullWidth={true}
                label={"Approved On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter Approved date"}
                handleChange={(e) => setTripPackagesApprovedOn(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Type"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter type"}
                handleChange={(e) => setTripPackagesType(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Trip Start Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter trip start date"}
                handleChange={(e) => setTripPackagesStartDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Trip End Date"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter trip end date"}
                handleChange={(e) => setTripPackagesEndDate(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"No of Adults"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter no of adults"}
                handleChange={(e) => setTripPackagesNoOfAdults(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"No of children"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter no of children"}
                handleChange={(e) => setTripPackagesNoOfChild(e.target.value)}
              />
            </>
          )}
          {filterType === "Orders" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter username"}
                handleChange={(e) => setOrdersUserName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Email"}
                type={"email"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter email"}
                handleChange={(e) => setOrdersEmail(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Mobile Number"}
                type={"tel"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter phone"}
                handleChange={(e) => setOrdersMobile(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Quantity"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter quantity"}
                handleChange={(e) => setOrdersQuantity(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Payment Type"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter payment typpe"}
                handleChange={(e) => setOrdersPaymentType(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Approved On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter approved on date"}
                handleChange={(e) => setOrdersApprovedOn(e.target.value)}
              />
            </>
          )}
          {filterType === "User Orders" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"Email"}
                type={"email"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter email"}
                handleChange={(e) => setOrdersEmail(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Mobile Number"}
                type={"tel"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter phone"}
                handleChange={(e) => setOrdersMobile(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Quantity"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter quantity"}
                handleChange={(e) => setOrdersQuantity(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Payment Type"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter payment typpe"}
                handleChange={(e) => setOrdersPaymentType(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Approved On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter approved on date"}
                handleChange={(e) => setOrdersApprovedOn(e.target.value)}
              />
            </>
          )}
          {filterType === "Admin Tds" && (
            <>
              <CustomTextField
                fullWidth={true}
                label={"User Name"}
                type={"text"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter username"}
                handleChange={(e) => setAdminTdsUserName(e.target.value)}
              />
              <CustomTextField
                fullWidth={true}
                label={"Uploaded  On"}
                type={"date"}
                autoComplete="off"
                autoFocus
                BoxHeight="68px"
                height={0}
                placeholder={"Enter uploaded on date"}
                handleChange={(e) => setAdminTdsUploadedOn(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions
          style={{
            background: "#282828",
            color: "#E9C547",
            fontWeight: 700,
          }}
        >
          <CustomButton
            autoFocus
            onClick={handleClose}
            text="Cancel"
            style={{
              margin: "8px auto",
              border: "1px solid #C5B1FF",
              background: "none",
              color: "#C5B1FF",
              fontWeight: 700,
            }}
          />
          <CustomButton
            autoFocus
            onClick={applyFilters}
            text="Apply Filter"
            style={{
              margin: "8px auto",
              background: "#C5B1FF",
              color: "#262626",
              fontWeight: 700,
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(Filter);
