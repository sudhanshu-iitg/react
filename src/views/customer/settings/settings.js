import React, { useState, useEffect } from "react";
import { Grid, Button, Modal, Box, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import styles from "./settings.style";
import { Redirect } from "react-router-dom";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import DetailsTable from "../../../customComponents/detailsTable";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CustomSpinner from "../../../customComponents/spinner";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import moment from "moment";
import * as XLSX from "xlsx";

const Settings = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [careers, setCareers] = useState(null);
  const [careerSelectedRowBV, setCareerSelectedBV] = useState();
  const [selectedCareerData, setSelectedCareer] = useState();

  const [ranks, setRanks] = useState();
  const [rankSelectedRowBV, setRankSelectedBV] = useState();
  const [selectedRankData, setSelectedRank] = useState(null);

  const [tds, setTds] = useState(null);

  const [redeemReward, setRedeemReward] = useState();

  const [loading, setLoading] = useState(true);

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
    setCareerSelectedBV(null);
    setRankSelectedBV(null);
  };

  const careerDetails = [
    {
      title: "Career Alpha Beta BV",
      value: selectedCareerData?.bv,
    },
    {
      title: "Career Minimum Users",
      value: selectedCareerData?.minimum_users,
      edit: true,
      type: "text",
    },
    {
      title: "Career Reward",
      value: selectedCareerData?.reward,
      edit: true,
      type: "text",
    },
  ];

  const rankDetails = [
    {
      title: "Rank Alpha Beta BV",
      value: selectedRankData?.mbv,
    },
    {
      title: "Rank Reward Name",
      value: selectedRankData?.name,
      edit: true,
      type: "text",
    },
    {
      title: "Rank Minimum Users",
      value: selectedRankData?.minimum_users,
      edit: true,
      type: "text",
    },

    {
      title: "Rank Reward",
      value: selectedRankData?.reward,
      edit: true,
      type: "text",
    },
    {
      title: "Rank Other Reward",
      value: selectedRankData?.other_reward,
      edit: true,
      type: "text",
    },
  ];

  const getCareers = async () => {
    let careers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SETTINGCAREER,
    });
    if (
      careers?.status === "401" ||
      careers?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (careers.status !== 404) {
      setLoading(false);
      const content = careers?.map((p, index) => {
        return {
          id: index + 1,
          minimun_users: p?.minimum_users,
          reward: p?.reward,
          bv: p?.bv,
        };
      });
      setCareers(content);
    }
  };

  const getRanksAndRewards = async () => {
    let ranks = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.USERRANKSETTING,
    });
    if (
      ranks?.status === "401" ||
      ranks?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (ranks.status !== 404) {
      setLoading(false);
      const content = ranks?.response?.map((p, index) => {
        return {
          id: index + 1,
          name: p?.name,
          minimun_users: p?.minimum_users,
          mbv: p?.mbv,
          reward: p?.other_reward,
          achieved_ranks: p?.achieved_ranks ? "Yes" : "No",
        };
      });
      setRanks(content);
    }
  };

  const getRedeemRewards = async () => {
    const username = JSON.parse(localStorage.getItem("loginData"))?.username;
    let redeemReward = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.REDEEMREWARD}?user__username=${username}`,
    });
    if (
      redeemReward?.status === "401" ||
      redeemReward?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (redeemReward.status !== 404) {
      setLoading(false);
      const content = redeemReward?.map((p) => {
        return {
          id: p?.id,
          userName: p?.user?.username,
          rankAchieved: p?.reward_for_rank?.current_rank?.name,
          reward: p?.reward_for_rank?.current_rank?.reward,
          approved: p?.approve ? "Approved" : "On Hold",
          redeemed: p?.redeemed ? "Redeemed" : "On Hold",
        };
      });
      setRedeemReward(content);
    }
  };

  const getTds = async () => {
    let tds = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.TDS}?username__username=${
        JSON.parse(localStorage.getItem("loginData")).username
      }`,
    });
    if (
      tds?.status === "401" ||
      tds?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (tds.status !== 404) {
      setLoading(false);
      const content = tds?.map((p) => {
        return {
          username: p?.username?.username,
          tds: (
            <Button onClick={() => window.open(p?.tax_pdf, "_blank").focus()}>
              <RemoveRedEyeRoundedIcon
                style={{ fontSize: 22, color: "#808080" }}
              />
            </Button>
          ),
          uploadedDate: moment(p?.uploaded_on).format("DD/MM/YYYY"),
          id: p?.id,
        };
      });
      setTds(content);
    }
  };

  const openCareerSelectedRow = (id) => {
    setCareerSelectedBV(id);
    getSelectedCareerDetails(id);
  };

  const openRankSelectedRow = (id) => {
    setRankSelectedBV(id);
    getSelectedRankDetails(id);
  };

  const getSelectedCareerDetails = async (id) => {
    let selectedCareer = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SETTINGCAREER + "" + id,
    });
    if (
      selectedCareer?.status === "401" ||
      selectedCareer?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedCareer.status !== 404) {
      setSelectedCareer(selectedCareer);
      setLoading(false);
    }
  };

  const getSelectedRankDetails = async (id) => {
    let selectedRank = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SETTINGRANKSANDREWARDS + "" + id,
    });
    if (
      selectedRank?.status === "401" ||
      selectedRank?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedRank.status !== 404) {
      setSelectedRank(selectedRank);
      setLoading(false);
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

  useEffect(() => {
    getRanksAndRewards();
    getTds();
    getRedeemRewards();
  }, []);

  if (redirect) {
    return <Redirect push to="/login" />;
  }
  return loading ? (
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
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tabContainer}>
          <Tabs
            labels={["Rank and Reward", "tds", "Redeem Reward"]}
            tabChange={tabChange}
            value={currentTab}
          />
        </Grid>
        <Grid className={classes.tableContainer}>
          {currentTab === 100 ? (
            careerSelectedRowBV !== null &&
            careerSelectedRowBV !== undefined ? (
              !loading ? (
                <div
                  style={{
                    border: "3px solid #474747",
                    boxShadow: "4px 24px 60px rgb(0 0 0 / 40%)",
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <Button
                    onClick={() => {
                      setCareerSelectedBV(null);
                      getCareers();
                    }}
                  >
                    <KeyboardBackspaceRoundedIcon style={{ fontSize: 35 }} />
                  </Button>
                  <DetailsTable
                    type={"CAREER SETTING"}
                    selectedSettingCareerId={careerSelectedRowBV}
                    details={careerDetails}
                    title={"CAREER SETTING DETAILS"}
                    getUserDetails={getSelectedCareerDetails}
                    showEdit={true}
                    showApproval={false}
                  />
                </div>
              ) : (
                <CustomSpinner />
              )
            ) : (
              <Table
                header={[
                  "",
                  "#",
                  "Minimun Users",
                  "Career Income Amount",
                  "ALPHA BETA BV",
                ]}
                data={careers}
                title={"CAREERS INCOME CURRENT STATS"}
                onRowClick={openCareerSelectedRow}
                showEye={true}
                showPagination={true}
                exportExcel={true}
                exportToExcelClick={() =>
                  exportToExcel(careers, "careers-settings")
                }
              />
            )
          ) : currentTab === 0 ? (
            rankSelectedRowBV !== null && rankSelectedRowBV !== undefined ? (
              !loading ? (
                <div
                  style={{
                    border: "3px solid #474747",
                    boxShadow: "4px 24px 60px rgb(0 0 0 / 40%)",
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <Button
                    onClick={() => {
                      setRankSelectedBV(null);
                      getRanksAndRewards();
                    }}
                  >
                    <KeyboardBackspaceRoundedIcon style={{ fontSize: 35 }} />
                  </Button>
                  <DetailsTable
                    type={"RANK SETTING"}
                    selecteSettingdRankId={rankSelectedRowBV}
                    details={rankDetails}
                    title={"RANK SETTING DETAILS"}
                    getUserDetails={getSelectedRankDetails}
                    showEdit={true}
                    showApproval={false}
                  />
                </div>
              ) : (
                <CustomSpinner />
              )
            ) : (
              <Table
                header={[
                  "",
                  "#",
                  "Rank Name",
                  "Minimun Users",
                  "APLHA BETA BV",
                  "Reward",
                  "Achieved",
                ]}
                data={ranks}
                title={"RANKS AND REWARS CURRENT STATS"}
                onRowClick={openRankSelectedRow}
                showEye={true}
                showPagination={true}
                exportExcel={true}
                exportToExcelClick={() =>
                  exportToExcel(ranks, "ranks-settings")
                }
              />
            )
          ) : currentTab === 1 ? (
            <Table
              header={["Username", "Tds", "Uploadde On", "Id"]}
              data={tds}
              title={"TDS"}
              showPagination={true}
              getUserDetails={getTds}
              exportExcel={true}
              exportToExcelClick={() => exportToExcel(tds, "tds")}
            />
          ) : currentTab === 2 ? (
            <Table
              header={[
                "",
                "Id",
                "Username",
                "Rank",
                "Reward",
                "Approved",
                "Redeemed",
              ]}
              data={redeemReward}
              title={"Redeem Reward"}
              showMenuOptions={true}
              menuOptions={["Redeem Reward"]}
              showPagination={true}
              getUserDetails={getRedeemRewards}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(redeemReward, "redeem-reward")
              }
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Settings);
