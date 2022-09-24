import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Grid,
  Tooltip,
  Typography,
  Modal,
  Box,
  Snackbar,
  mobileStepperClasses,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useHistory, Link, Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Tabs from "../../../customComponents/tabs";
import styles from "../../admin/geneology/geneology.style";
import CustomTextfield from "../../../customComponents/textfield";
import StarIcon from "@mui/icons-material/Star";
import CustomButton from "../../../customComponents/primaryButton";
import CustomTooltip from "../../../customComponents/tooltip";
import CustomSpinner from "../../../customComponents/spinner";
import Table from "../../../customComponents/table";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import activeUser from "../../../assets/star.svg";
import pendingKyc from "../../../assets/pendingKyc.svg";
import blocked from "../../../assets/blocked.svg";
import free from "../../../assets/freeUser.svg";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import { Button } from "@material-ui/core";
import * as XLSX from "xlsx";

const TooltipText = ({ data }) => {
  const arrayofTooltip = [
    {
      title: "Joining Date ",
      value: `: ${moment(data?.user_personal_data?.joining_date).format(
        "MMM Do YY"
      )}`,
    },
    {
      title: "Activation Date  ",
      value: data?.user_personal_data?.activation_date
        ? `: ${moment(data?.user_personal_data?.activation_date).format(
            "MMM Do YY"
          )}`
        : "Yet to be activated",
    },
    // {
    //   title: "Members (Alpha / Beta) ",
    //   value: ": 32 / 45",
    // },
    // {
    //   title: "Alpha BV",
    //   value: ": 25,000",
    // },
    // {
    //   title: "Beta BV",
    //   value: " : 25,000",
    // },
    // {
    //   title: "Total BV (Alpha / Beta) ",
    //   value: ": 50,000",
    // },
  ];
  return arrayofTooltip.map((item) => {
    return (
      <Typography
        style={{
          fontSize: 16,
          color: "#E9C547",
          lineHeight: "25.2px",
        }}
      >
        {item.title}{" "}
        <span
          style={{
            color: "#fff",
          }}
        >
          {item?.value}
        </span>
      </Typography>
    );
  });
};

const GenoCard = ({
  classes,
  variant,
  data,
  switchTree,
  goBack,
  linkGenerate,
  position,
}) => {
  const triggerSwitch = () => {
    switchTree(data);
  };

  const generateLink = () => {
    linkGenerate(position, data);
  };
  return data ? (
    // <CustomTooltip title={<TooltipText data={data} />} placement="bottom-end">
    <Button onClick={triggerSwitch} style={{ textTransform: "unset" }}>
      {" "}
      <Grid
        container
        style={
          variant === "active"
            ? {
                background: "rgba(233, 197, 71, 0.15)",
                padding: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 250,
                marginBottom: 20,
                cursor: "pointer",
              }
            : variant === "pending"
            ? {
                background: " rgba(214, 154, 83, 0.2)",
                padding: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 250,
                marginBottom: 20,
                cursor: "pointer",
              }
            : variant === "free"
            ? {
                background: "rgba(197, 177, 255, 0.2)",
                padding: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 250,
                marginBottom: 20,
                cursor: "pointer",
              }
            : variant === "blocked"
            ? {
                background: "rgba(230, 90, 90, 0.2)",
                padding: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 250,
                marginBottom: 20,
                cursor: "pointer",
              }
            : { background: "unset" }
        }
      >
        <Grid item>
          <Typography style={{ color: "#FFF", fontSize: 16, marginRight: 20 }}>
            {data?.user_personal_data?.first_name
              ? data?.user_personal_data?.first_name +
                " " +
                data?.user_personal_data?.last_name
              : data?.name}
          </Typography>
          <Typography style={{ color: "#FFF", fontSize: 16 }}>
            {data?.user_personal_data?.username || data?.username}
          </Typography>
        </Grid>
        <Grid item>
          {variant === "active" ? (
            <div
              style={{
                background: "#E9C547",
                height: 57,
                width: 57,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <StarIcon style={{ fontSize: 30, color: "#282828" }} />
            </div>
          ) : variant === "pending" ? (
            <div
              style={{
                background: "rgba(214, 154, 83, 0.2)",
                height: 57,
                width: 57,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={pendingKyc} height={24} width={24} />
            </div>
          ) : variant === "free" ? (
            <div
              style={{
                background: " rgba(197, 177, 255, 0.2)",
                height: 57,
                width: 57,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={free} height={24} width={24} />
            </div>
          ) : variant === "blocked" ? (
            <div
              style={{
                background: "rgba(231, 90, 90, 0.2)",
                height: 57,
                width: 57,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={blocked} height={24} width={24} />
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </Button>
  ) : (
    // </CustomTooltip>
    // <CustomTooltip title={<TooltipText data={data} />} placement="bottom-end">
    <Grid
      container
      style={{
        background: "rgba(124, 124, 124, 0.2)",
        padding: "20px",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: 250,
        marginBottom: 20,
      }}
    >
      <Grid item>
        <Typography style={{ color: "#FFF", fontSize: 16, marginRight: 20 }}>
          VACANT
        </Typography>
      </Grid>
      <Grid item>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            height: 57,
            width: 57,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={generateLink}
        >
          {" "}
          <AddIcon style={{ fontSize: 35, color: "#E9C547" }} />
        </div>
      </Grid>
    </Grid>
  );
};
const Geneology = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [rootNode, setRootNode] = useState(null);
  const [leftNode, setLeftNode] = useState(null);
  const [rightNode, setRightNode] = useState(null);
  const [uplink, setUplinkId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [totalDetails, setTotalDetails] = useState(null);
  const [genTable, setGenTable] = useState(null);
  const [link, setLink] = useState(null);
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [searchUser, setSearchUser] = useState(null);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [activeTab, setActiveTab] = useState("alpha");
  const [alphaTable, setAlphaTable] = useState(null);
  const [betaTable, setBetaTable] = useState(null);

  const resetTree = () => {
    const rootUser = {
      name:
        JSON.parse(localStorage.getItem("loginData")).first_name +
        " " +
        JSON.parse(localStorage.getItem("loginData")).last_name,
      username: JSON.parse(localStorage.getItem("loginData")).username,
    };
    setRootNode(rootUser);
    getGeneology();
  };

  const switchTree = async (data) => {
    let username = data?.username
      ? data.username
      : data?.user_personal_data?.username;
    let othersGeneologyDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GENEOLOGY,
      requestData: { username: username },
    });
    setRootNode(data);
    setLeftNode(othersGeneologyDetails?.left_user);
    setRightNode(othersGeneologyDetails?.right_user);
    setUplinkId(othersGeneologyDetails?.uplink?.uplink_id);
  };

  const goBack = async (data) => {
    let backGeneologyDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GENEOLOGY,
      requestData: { username: uplink },
    });
    setRootNode(backGeneologyDetails?.uplink);
    setLeftNode(backGeneologyDetails?.left_user);
    setRightNode(backGeneologyDetails?.right_user);
    setUplinkId(backGeneologyDetails?.uplink?.uplink_id);
  };

  const searchTree = async () => {
    let searchGeneologyDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GENEOLOGY,
      requestData: { username: searchUser },
    });
    if (
      searchGeneologyDetails !== null &&
      searchGeneologyDetails?.data?.response === "Request user does not exist"
    ) {
      setUplinkId(null);
      setSeverity("error");
      setDisplayMsg("Request user does not exist");
      setHandleSnackbar(true);
    }
    if (
      searchGeneologyDetails !== null &&
      searchGeneologyDetails?.message === "This is end of genelogy"
    ) {
      setRootNode(searchGeneologyDetails?.uplink);
      setLeftNode(null);
      setRightNode(null);
      setUplinkId(null);
      setSeverity("error");
      setDisplayMsg(searchGeneologyDetails?.message);
      searchGeneologyDetails?.message && setHandleSnackbar(true);
    }
    if (
      searchGeneologyDetails &&
      searchGeneologyDetails?.message !== "This is end of genelogy" &&
      searchGeneologyDetails?.response !== "Request user does not exist"
    ) {
      setRootNode(searchGeneologyDetails?.uplink);
      setLeftNode(searchGeneologyDetails?.left_user);
      setRightNode(searchGeneologyDetails?.right_user);
      setUplinkId(searchGeneologyDetails?.uplink?.uplink_id);
    }
  };

  const generateLink = async (pos, data) => {
    let generateLink = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GENERATELINK,
      requestData: {
        sponsorid: JSON.parse(localStorage.getItem("loginData")).username,
        uplinkid: rootNode?.user_personal_data?.username
          ? rootNode?.user_personal_data?.username
          : JSON.parse(localStorage.getItem("loginData")).username,
        position: pos,
      },
    });
    if (generateLink?.response) {
      let str = generateLink?.response;
      let n = str.lastIndexOf("/");
      var result = str.substring(n + 1);
      setLink(result);
      setShowLinkModal(true);
    } else {
      setDisplayMsg(generateLink?.data?.response);
      setHandleSnackbar(true);
      setSeverity("error");
    }
  };

  const getGeneology = async () => {
    let geneologyDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.GENEOLOGY,
    });

    if (
      geneologyDetails?.status === "401" ||
      geneologyDetails?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);

    if (
      geneologyDetails?.left_user ||
      geneologyDetails?.right_user ||
      geneologyDetails
    ) {
      setLoading(false);
      setUplinkId(geneologyDetails?.uplink?.uplink_id);
      setLeftNode(geneologyDetails?.left_user);
      setRightNode(geneologyDetails?.right_user);
      setTotalDetails(geneologyDetails);
    } else {
      setLoading(false);
      setLeftNode(null);
      setRightNode(null);
      setTotalDetails(null);
    }
  };

  const getTabularGeneology = async () => {
    let geneologyDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TABULARGENEOLOGY,
    });
    if (geneologyDetails) {
      setAlphaTable(geneologyDetails?.left_users);
      setBetaTable(geneologyDetails?.right_users);
    }
  };

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
  };

  const getVariant = (data) => {
    if (
      data?.username === JSON.parse(localStorage.getItem("loginData")).username
    )
      return "active";

    if (data?.is_approved === true && data?.free_registration === false) {
      return "active";
    } else if (data?.is_blocked) {
      return "blocked";
    } else if (
      data?.user_personal_data?.is_approved === true &&
      data?.user_personal_data?.free_registration === false
    ) {
      return "active";
    } else if (data?.user_personal_data?.is_blocked) {
      return "blocked";
    } else if (data?.is_approved === true && data?.free_registration === true) {
      return "free";
    } else if (
      data?.user_personal_data?.is_approved === true &&
      data?.user_personal_data?.free_registration === true
    ) {
      return "free";
    }
    return "pending";
  };

  const genTableContents =
    activeTab === "alpha"
      ? alphaTable?.map((h, index) => {
          return {
            id: index + 1,
            join_date: moment(h[1]).format("DD/MM/YYYY") || "-",
            active_date: h[2]
              ? moment(h[2]).format("DD/MM/YYYY")
              : "Yet to be activated",
            user_id: h[3] || "-",
            firstname: h[4] || "-",
            lastname: h[5] || "-",
            email: h[6] || "-",
            mobile: h[7] || "-",
            city: h[8] || "-",
            state: h[9] || "-",
            country: h[10] || "-",
            status: h[13] ? "Active" : "On Hold",
            bv: h[14],
          };
        })
      : betaTable?.map((h, index) => {
          return {
            id: index + 1,
            join_date: moment(h[1]).format("DD/MM/YYYY") || "-",
            active_date: h[2]
              ? moment(h[2]).format("DD/MM/YYYY")
              : "Yet to be activated",
            user_id: h[3] || "-",
            firstname: h[4] || "-",
            lastname: h[5] || "-",
            email: h[6] || "-",
            mobile: h[7] || "-",
            city: h[8] || "-",
            state: h[9] || "-",
            country: h[10] || "-",
            status: h[13] ? "Active" : "On Hold",
            bv: h[14],
          };
        });

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

  useEffect(() => {
    resetTree();
    getTabularGeneology();
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
            open={showLinkModal}
            onClose={() => setShowLinkModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modalBox}>
              <Grid>
                <Button
                  onClick={() => setShowLinkModal(false)}
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
              <Typography
                style={{
                  color: "#fff",
                  margin: 20,
                }}
              >
                Copy the below link and share it with your downlink
              </Typography>
              <Grid
                container
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid
                  item
                  style={{
                    width: "80%",
                    overflow: "scroll",
                    background: "rgba(233, 197, 71, 0.15)",
                    padding: 10,
                    color: "#fff",
                    borderRadius: 10,
                    margin: "20px",
                  }}
                >
                  <Typography>
                    https://console.ripshipworldventures.com/register/{link}
                  </Typography>
                </Grid>
                <Grid item>
                  <CustomButton
                    text={"Copy"}
                    // onClick={resetTree}
                    style={{
                      width: "20%",
                      textAlign: "center",
                      padding: "18px 45px",
                      background: "#E9C547",
                      color: "#262626",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://console.ripshipworldventures.com/register/${link}`
                      );
                      setHandleSnackbar(true);
                      setDisplayMsg("Copied to clipboard!");
                      setSeverity("info");
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Modal>
          <Grid className={classes.outerContainer}>
            <Grid container className={classes.tabContainer}>
              <Tabs
                labels={["Visual Genealogy", "Tabular Genealogy"]}
                tabChange={tabChange}
                value={currentTab}
              />
            </Grid>
            {/* <Grid>
          <CustomSpinner />
        </Grid> */}
            {currentTab === 0 ? (
              <>
                {/* <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "center", alignItems: "center" }}
                  className={classes.searchBar}
                >
                  <Grid item>
                    <CustomTextfield
                      fullWidth={false}
                      height={50}
                      label=""
                      type="text"
                      autoComplete="off"
                      autoFocus
                      BoxHeight="38px"
                      value=""
                      endIcon={
                        <SearchRoundedIcon
                          style={{
                            color: "#787878",
                            fontSize: 26,
                            marginRight: 7,
                            marginLeft: 60,
                          }}
                        />
                      }
                      placeholder={"Search by Member ID: "}
                      handleChange={(e) => setSearchUser(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      text={"Search"}
                      style={{
                        padding: "22px",
                      }}
                      // onClick={}
                    />
                  </Grid>
                </Grid> */}
                <Grid
                  container
                  className={classes.legendContainer}
                  style={{ marginTop: 10 }}
                >
                  <Grid item class={classes.flexContainer}>
                    <div className={classes.activeUser}>
                      {" "}
                      <StarIcon style={{ fontSize: 30, color: "#282828" }} />
                    </div>
                    <Typography
                      className={classes.activeUserText}
                      style={{ color: "#E9C547" }}
                    >
                      ACTIVE USER
                    </Typography>
                  </Grid>
                  <Grid item class={classes.flexContainer}>
                    <div className={classes.pendingKycUser}>
                      {" "}
                      <img src={pendingKyc} height={24} width={24} alt="" />
                    </div>
                    <Typography className={classes.pendingKycText}>
                      PENDING KYC
                    </Typography>
                  </Grid>
                  <Grid item class={classes.flexContainer}>
                    <div className={classes.freeUser}>
                      {" "}
                      <img src={free} height={24} width={24} alt="" />
                    </div>
                    <Typography className={classes.freeUserText}>
                      FREE USER
                    </Typography>
                  </Grid>
                  <Grid item class={classes.flexContainer}>
                    <div className={classes.blockedUser}>
                      {" "}
                      <img src={blocked} height={24} width={24} alt="" />
                    </div>
                    <Typography className={classes.blockedUserText}>
                      BLOCKED USER
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "center", alignItems: "center" }}
                  className={classes.searchBar}
                >
                  <Grid item>
                    <CustomTextfield
                      fullWidth={false}
                      height={50}
                      type="text"
                      autoComplete="off"
                      autoFocus
                      BoxHeight="38px"
                      value=""
                      endIcon={
                        <SearchRoundedIcon
                          style={{
                            color: "#787878",
                            fontSize: 26,
                            marginRight: 7,
                            marginLeft: 60,
                          }}
                        />
                      }
                      placeholder={"Enter username"}
                      handleChange={(e) => setSearchUser(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      text={"Search"}
                      style={{
                        padding: "22px",
                      }}
                      onClick={searchTree}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={classes.geneologyContainer}
                  style={{ position: "relative" }}
                >
                  <CustomButton
                    text={"Reset"}
                    onClick={resetTree}
                    style={{
                      textAlign: "center",
                      padding: "18px 45px",
                      background: "#E9C547",
                      color: "#262626",
                      fontWeight: 700,
                      position: "absolute",
                      right: 30,
                      top: 30,
                    }}
                  />

                  <CustomButton
                    text={"Back"}
                    onClick={goBack}
                    style={
                      uplink ===
                        JSON.parse(localStorage.getItem("loginData"))
                          .username ||
                      uplink === null ||
                      uplink === undefined
                        ? {
                            textAlign: "center",
                            padding: "18px 30px",
                            background: "#787878",
                            color: "#BCBCBC",
                            fontWeight: 700,
                            pointerEvents: "none",
                            position: "absolute",
                            left: 30,
                            top: 30,
                          }
                        : {
                            textAlign: "center",
                            padding: "18px 30px",
                            background: "#E9C547",
                            color: "#262626",
                            fontWeight: 700,
                            position: "absolute",
                            left: 30,
                            top: 30,
                          }
                    }
                  />

                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: 50,
                    }}
                  >
                    <GenoCard
                      variant={getVariant(rootNode)}
                      data={rootNode}
                      position="root"
                      switchTree={switchTree}
                      goBack={goBack}
                      linkGenerate={generateLink}
                    />
                  </Grid>
                  <Grid>
                    <Typography
                      className={classes.activeUserText}
                      style={{ color: "#E9C547", fontSize: 24 }}
                    >
                      ALPHA
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.dttClass}>
                      Total Users :{" "}
                      <span style={{ color: "#E9C547" }}>
                        {leftNode?.user_count?.user_count}
                      </span>
                    </Grid>
                    <Grid item className={classes.dttClass}>
                      Total BV :{" "}
                      <span style={{ color: "#E9C547" }}>
                        {" "}
                        {leftNode?.user_count?.bv}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "20px 0px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <GenoCard
                      variant={getVariant(leftNode)}
                      data={leftNode}
                      switchTree={switchTree}
                      position="left"
                      goBack={goBack}
                      linkGenerate={generateLink}
                    />
                  </Grid>

                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      className={classes.activeUserText}
                      style={{ color: "#E9C547", fontSize: 24 }}
                    >
                      BETA
                    </Typography>
                  </Grid>

                  <Grid container>
                    <Grid item className={classes.dttClass}>
                      Total Users :{" "}
                      <span style={{ color: "#E9C547" }}>
                        {rightNode?.user_count?.user_count}
                      </span>
                    </Grid>
                    <Grid item className={classes.dttClass}>
                      Total BV :{" "}
                      <span style={{ color: "#E9C547" }}>
                        {" "}
                        {rightNode?.user_count?.bv}
                      </span>
                    </Grid>
                    {/* <Grid item className={classes.dttClass}>
              Total Users :{" "}
              <span style={{ color: "#E9C547" }}>
                {" "}
                {totalUsers ? totalUsers : ""}
              </span>
            </Grid> */}
                  </Grid>
                  <Grid style={{ margin: "20px 0px" }}>
                    <GenoCard
                      variant={getVariant(rightNode)}
                      data={rightNode}
                      switchTree={switchTree}
                      position="right"
                      goBack={goBack}
                      linkGenerate={generateLink}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  container
                  style={{ justifyContent: "center" }}
                  className={classes.tab}
                >
                  <Grid
                    item
                    className={classes.activeTab}
                    onClick={() => setActiveTab("alpha")}
                    style={
                      activeTab === "alpha"
                        ? {
                            background: "#E9C547",
                            color: "#282828",
                            border: "none",
                          }
                        : { background: "none" }
                    }
                  >
                    ALPHA
                  </Grid>
                  <Grid
                    item
                    className={classes.activeTab}
                    onClick={() => setActiveTab("beta")}
                    style={
                      activeTab === "beta"
                        ? {
                            background: "#E9C547",
                            color: "#282828",
                            border: "none",
                          }
                        : { background: "none" }
                    }
                  >
                    BETA
                  </Grid>
                </Grid>
                <Grid style={{ padding: "5%" }}>
                  <Table
                    header={[
                      "#",
                      "Joining Date",
                      "Activation Date",
                      "User ID",
                      "First Name",
                      "Last Name",
                      "Email",
                      "Mobile No",
                      "City",
                      "State",
                      "Country",
                      "Status",
                      "BV",
                    ]}
                    data={genTableContents}
                    title={"Tabular Geneology"}
                    showMenuOptions={false}
                    showPagination={true}
                    exportExcel={true}
                    exportToExcelClick={() =>
                      exportToExcel(genTableContents, "Tabular-geneology")
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(Geneology);
