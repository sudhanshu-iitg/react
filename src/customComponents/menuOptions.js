import {
  Button,
  Grid,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Box,
  Divider,
  Alert,
  Stack,
  Snackbar,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CustomTextField from "./textfield";
import CustomButton from "./primaryButton";
import { URLS } from "../constants/index";
import { allRequestHandler } from "../api/index";
const styles = () => ({
  menuPaper: {
    background: "#343434",
    border: "2px solid #C5B1FF",
    color: "#FFF",
    borderRadius: 10,
  },
  menuItem: {
    width: "100%",
    fontWeight: 500,
    fontSize: 14,
    "&:hover": {
      background: "rgba(197, 177, 255, 0.4)",
    },
    modalClass: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      borderRadius: 10,
      background: "#fff",
    },
  },
});

const MenuOptions = ({
  classes,
  userInfo,
  menuOptions,
  getUserDetails,
  getTrips,
  api,
  typeURL,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const approveUser = async () => {
    let approveUser = await allRequestHandler({
      requestType: "PUT",
      requestUrl: URLS.APPROVEUSER,
      requestData: {
        username: userInfo[3],
        is_approved: true,
      },
    });
    if (approveUser?.response?.is_approved) {
      setDisplayMsg("User Approved");
      setHandleSnackbar(true);
      setSeverity("success");
    } else if (
      approveUser?.response ===
      "Rejected by admin or terms and condition not accepted"
    ) {
      setDisplayMsg("Rejected by admin or terms and condition not accepted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const rejectUser = async () => {
    let rejectUser = await allRequestHandler({
      requestType: "PUT",
      requestUrl: URLS.APPROVEUSER,
      requestData: {
        username: userInfo[3],
        is_approved: false,
      },
    });
    if (
      rejectUser?.response ===
      "Rejected by admin or terms and condition not accepted"
    ) {
      setDisplayMsg("Rejected by admin or terms and condition not accepted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const blockUser = async () => {
    let blockUser = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.BLOCKUSER,
      requestData: {
        username: userInfo[3],
        block: true,
      },
    });
    if (blockUser.response) {
      getUserDetails();
      setDisplayMsg("User Blocked!");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const unblockUser = async () => {
    let blockUser = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.UNBLOCKUSER,
      requestData: {
        username: userInfo[3],
        block: false,
      },
    });
    if (blockUser.response) {
      getUserDetails();
      setDisplayMsg("User unblocked!");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const approvePayout = async () => {
    let approvePayout = await allRequestHandler({
      requestType: "POST",
      requestUrl: typeURL,
      requestData: {
        username: [userInfo[0]],
      },
    });
    if (approvePayout.response) {
      setDisplayMsg("Paid Successfully");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Some Error occured");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const redeemTrip = async () => {
    let redeemTrip = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.RTRIP + `${userInfo[0]}/`,
      requestData: {
        redeemed: true,
      },
    });
    if (redeemTrip.response === "Trip redeemed successfully") {
      setDisplayMsg("Trip redeemed successfully");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const approveTrip = async () => {
    let approveTrip = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.ATRIP + `${userInfo[0]}/`,
      requestData: {
        approved: true,
      },
    });

    if (approveTrip.data === "request updated") {
      setDisplayMsg("Trip Approved");
      setHandleSnackbar(true);
      setSeverity("success");
      getTrips();
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const deleteTds = async () => {
    let deletePromotion = await allRequestHandler({
      requestType: "DELETE",
      requestUrl: URLS.TDS + "" + userInfo[3] + "/",
    });
    if (!deletePromotion) {
      getUserDetails();
      setDisplayMsg("Tds Deleted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const deletePronotionalMaterial = async () => {
    let deletePromotion = await allRequestHandler({
      requestType: "DELETE",
      requestUrl: URLS.PROMOTIONMATERIAL + "" + userInfo[3] + "/",
    });
    if (!deletePromotion) {
      getUserDetails();
      setDisplayMsg("Promotional Material Deleted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const approvePenUpgPkgReqs = async () => {
    let approvePendingUpgPakRequests = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.ORDERREPORT + `${userInfo[0]}/`,
      requestData: {
        approved: true,
      },
    });
    if (approvePendingUpgPakRequests) {
      getUserDetails();
      setDisplayMsg("Approved");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const deletePenUpgPkgReqs = async () => {
    let approvePendingUpgPakRequests = await allRequestHandler({
      requestType: "DELETE",
      requestUrl: URLS.ORDERREPORT + `${userInfo[0]}/`,
      requestData: {
        approved: true,
      },
    });
    if (approvePendingUpgPakRequests) {
      getUserDetails();
      setDisplayMsg("Deleted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const approvePenRepPkgReqs = async () => {
    let approvePendingUpgPakRequests = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.TRIPREPURCHASE + `${userInfo[0]}/`,
      requestData: {
        approved: true,
      },
    });
    if (approvePendingUpgPakRequests) {
      getUserDetails();
      setDisplayMsg("Approved");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const deletePenRepPkgReqs = async () => {
    let approvePendingUpgPakRequests = await allRequestHandler({
      requestType: "DELETE",
      requestUrl: URLS.TRIPREPURCHASE + `${userInfo[0]}/`,
      requestData: {
        approved: true,
      },
    });
    if (approvePendingUpgPakRequests) {
      getUserDetails();
      setDisplayMsg("Deleted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const deletePackage = async () => {
    let packageDelete = await allRequestHandler({
      requestType: "DELETE",
      requestUrl: URLS.PACKAGES + `?type=package&id=${userInfo[3]}`,
      requestData: {
        type: "package",
        id: userInfo[3],
      },
    });
    if (packageDelete) {
      getUserDetails();
      setDisplayMsg("Deleted");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const approveRedeemRequest = async () => {
    let approveRedeemRequest = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.REDEEMREWARD + `/${userInfo[0]}`,
      requestData: {
        approve: true,
      },
    });
    if (approveRedeemRequest) {
      getUserDetails();
      setDisplayMsg("Approved");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const redeemReward = async () => {
    let redeemRewards = await allRequestHandler({
      requestType: "PATCH",
      requestUrl: URLS.REDEEMREWARD + `/${userInfo[0]}`,
      requestData: {
        redeemed: true,
      },
    });
    if (redeemRewards) {
      getUserDetails();
      setDisplayMsg("Redeemed");
      setHandleSnackbar(true);
      setSeverity("success");
    } else {
      setDisplayMsg("Something went wrong");
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const showModal = (option) => {
    // setModalType(option);
    // setOpenModal(true);
    if (option === "Approve User") {
      approveUser();
      getUserDetails();
    }
    if (option === "Reject User") {
      rejectUser();
      getUserDetails();
    }
    if (option === "Block User") {
      blockUser();
      getUserDetails();
    }
    if (option === "Unblock User") {
      unblockUser();
      getUserDetails();
    }
    if (option === "Redeem Trip") {
      redeemTrip();
      getUserDetails();
    }
    if (option === "Mark as paid") {
      approvePayout();
      getUserDetails();
    }
    if (option === "Approve Trip") {
      approveTrip();
    }
    if (option === "Delete Tds") {
      deleteTds();
      getUserDetails();
    }
    if (option === "Delete Promotional Material") {
      deletePronotionalMaterial();
      getUserDetails();
    }
    if (option === "Approve Upgrade pending package request") {
      approvePenUpgPkgReqs();
      getUserDetails();
    }
    if (option === "Delete Upgrade pending package request") {
      deletePenUpgPkgReqs();
      getUserDetails();
    }
    if (option === "Approve Repurchase Package Requests") {
      approvePenRepPkgReqs();
      getUserDetails();
    }
    if (option === "Delete Repurchase Package Requests") {
      deletePenRepPkgReqs();
      getUserDetails();
    }
    if (option === "Delete Package") {
      deletePackage();
      getUserDetails();
    }
    if (option === "Approve Redeem Request") {
      approveRedeemRequest();
      getUserDetails();
    }
    if (option === "Redeem Reward") {
      redeemReward();
      getUserDetails();
    }
    setAnchorEl(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        open={handleSnackbar}
        onClose={() => setHandleSnackbar(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {" "}
          {displayMsg}{" "}
        </MuiAlert>
      </Snackbar>
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizRoundedIcon style={{ color: "#9A9A9A", fontSize: 35 }} />
        </Button>
        <Menu
          classes={{ paper: classes.menuPaper }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {menuOptions.map((option) => (
            <MenuItem
              onClick={() => showModal(option)}
              className={classes.menuItem}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div>
        {modalType === "Block User" ? (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box style={{ padding: 15 }}>
              <Typography style={{ padding: 15, color: "#fff" }}>
                Mark as paid ?
              </Typography>
              <Grid container style={{ justifyContent: "flex-end" }}>
                <CustomButton text="Yes" />
                <CustomButton text="No, Dont" onClick={handleCloseModal} />
              </Grid>
            </Box>
          </Modal>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(MenuOptions);
