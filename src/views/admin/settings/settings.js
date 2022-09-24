import React, { useState, useEffect } from "react";
import { Grid, Button, Modal, Box, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import styles from "./settings.style";
import { Redirect } from "react-router-dom";
import { URLS, requestUrl } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import DetailsTable from "../../../customComponents/detailsTable";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import CustomSpinner from "../../../customComponents/spinner";
import CustomDropdown from "../../../customComponents/dropdown";
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

  const [addCareerSeeting, setAddCareerSetting] = useState(false);
  const [addRankSeeting, setAddRankSetting] = useState(false);
  const [addTds, setAddTds] = useState(false);

  const [careerBV, setCareerBV] = useState();
  const [careerMinimumUsers, setCareerMinimumUsers] = useState();
  const [careerReward, setCareerReward] = useState();

  const [rankBV, setRankBV] = useState();
  const [rankName, setRankName] = useState();
  const [rankOtherReward, setRankOtherReward] = useState();
  const [rankReward, setRankReward] = useState();

  const [tds, setTds] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setUserSelection] = useState(null);
  const [tdsFile, setTdsFile] = useState(null);

  const [redeemRequests, setRedeemRequests] = useState(null);
  const [rewardAwarded, setRewardAwarded] = useState(null);

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
      const content = careers?.map((p, index) => {
        return {
          id: index + 1,
          minimun_users: p?.minimum_users,
          reward: p?.reward,
          bv: p?.bv,
        };
      });
      setCareers(content);
      setLoading(false);
    }
  };

  const getRanksAndRewards = async () => {
    let ranks = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SETTINGRANKSANDREWARDS,
    });
    if (
      ranks?.status === "401" ||
      ranks?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (ranks.status !== 404) {
      const content = ranks?.map((p, index) => {
        return {
          id: index + 1,
          name: p?.name,
          reward: p?.reward,
          mbv: p?.mbv,
          other_reward: p?.other_reward,
        };
      });
      setRanks(content);
      setLoading(false);
    }
  };

  const getRedeemRequests = async () => {
    let redeemRequests = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.REDEEMREWARD}?redeemed=true&approve=false`,
    });
    if (
      redeemRequests?.status === "401" ||
      redeemRequests?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (redeemRequests.status !== 404) {
      setLoading(false);
      const content = redeemRequests?.map((p) => {
        return {
          id: p?.id,
          userName: p?.user?.username,
          rankAchieved: p?.reward_for_rank?.current_rank?.name,
          reward: p?.reward_for_rank?.current_rank?.reward,
          approved: p?.approve ? "Approved" : "On Hold",
          redeemed: p?.redeemed ? "Redeemed" : "On Hold",
        };
      });
      setRedeemRequests(content);
    }
  };

  const getRewardAwarded = async () => {
    let rewardAwarded = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${URLS.REDEEMREWARD}?redeemed=true&approve=true`,
    });
    if (
      rewardAwarded?.status === "401" ||
      rewardAwarded?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (rewardAwarded.status !== 404) {
      setLoading(false);
      const content = rewardAwarded?.map((p) => {
        return {
          id: p?.id,
          userName: p?.user?.username,
          rankAchieved: p?.reward_for_rank?.current_rank?.name,
          reward: p?.reward_for_rank?.current_rank?.reward,
          approved: p?.approve ? "Approved" : "On Hold",
          redeemed: p?.redeemed ? "Redeemed" : "On Hold",
        };
      });
      setRewardAwarded(content);
    }
  };

  const getAllUsers = async () => {
    let allUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.ALLUSERS,
    });
    if (
      allUsers?.status === "401" ||
      allUsers?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (allUsers.status !== 404) {
      setAllUsers(
        allUsers?.response?.map((user, index) => {
          return {
            id: user,
            name: user,
          };
        })
      );
    }
  };

  const getTds = async () => {
    let tds = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.TDS,
    });
    if (
      tds?.status === "401" ||
      tds?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (tds.status !== 404) {
      setTdsData(tds);
      setLoading(false);
    }
  };

  const setTdsData = (data) => {
    const content = data?.map((p) => {
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
  };

  const openCareerSelectedRow = (id) => {
    setLoading(true);
    setCareerSelectedBV(id);
    getSelectedCareerDetails(id);
  };

  const openRankSelectedRow = (id) => {
    setRankSelectedBV(id);
    getSelectedRankDetails(id);
  };

  const openTdsModal = () => {
    setAddTds(true);
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

  const openCareerModal = () => {
    setAddCareerSetting(true);
  };
  const openRankModal = () => {
    setAddRankSetting(true);
  };

  const submitCareerSetting = async () => {
    setAddCareerSetting(false);
    const Career = {
      bv: careerBV,
      minimum_users: careerMinimumUsers,
      reward: careerReward,
    };
    const submitCareerSetting = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.SETTINGCAREER,
      requestData: Career,
    });
    if (submitCareerSetting) {
      getCareers();
      setDisplayMsg("Details Updated");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const submitRankSetting = async () => {
    setAddRankSetting(false);
    const Rank = {
      mbv: rankBV,
      reward: rankReward,
      name: rankName,
      other_reward: rankOtherReward,
    };

    const submitRankSetting = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.SETTINGRANKSANDREWARDS,
      requestData: Rank,
    });

    if (submitRankSetting) {
      console.log(submitRankSetting);
      getRanksAndRewards();
      setDisplayMsg("Rank and Reward Added");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const submitTds = async () => {
    setAddTds(false);
    if (selectedUser !== null && tdsFile !== null) {
      const formData = new FormData();

      formData.append("username", selectedUser);
      formData.append("tax_pdf", tdsFile);

      let tds = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.TDS,
        requestData: formData,
      });
      if (tds.response) {
        getTds();
        setSeverity("success");
        setDisplayMsg("Tds added!");
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Oops something went wrong!");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all your details to continue");
      setHandleSnackbar(true);
    }
  };

  useEffect(() => {
    // getCareers();
    getRanksAndRewards();
    getTds();
    getAllUsers();
    getRedeemRequests();
    getRewardAwarded();
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
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
            labels={[
              "Rank and Reward",
              "Tds",
              "Redeem Request",
              "Redeem Rewarded",
            ]}
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
                createBtn={"Add Career Setting"}
                createMethod={openCareerModal}
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
                  "Reward Benefit",
                  "APLHA BETA BV",
                  "Other Reward",
                ]}
                data={ranks}
                title={"RANKS AND REWARS CURRENT STATS"}
                onRowClick={openRankSelectedRow}
                showEye={true}
                showPagination={true}
                createBtn={"Add Rank Setting"}
                createMethod={openRankModal}
                exportExcel={true}
                exportToExcelClick={() =>
                  exportToExcel(ranks, "ranks-settings")
                }
              />
            )
          ) : currentTab === 1 ? (
            <Table
              header={["", "Username", "Tds", "Uploadde On", "Id"]}
              data={tds}
              title={"TDS"}
              createBtn={"Add Tds"}
              createMethod={openTdsModal}
              showMenuOptions={true}
              showPagination={true}
              menuOptions={["Delete Tds"]}
              showFilterButton={true}
              filterType={"Admin Tds"}
              dataURL={URLS.TDS}
              setData={setTdsData}
              getUserDetails={getTds}
              getTds={true}
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
              data={redeemRequests}
              title={"REDEEM REQUESTS"}
              showMenuOptions={true}
              showPagination={true}
              menuOptions={["Approve Redeem Request"]}
              getUserDetails={getRedeemRequests}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(redeemRequests, "redeem-requests")
              }
            />
          ) : currentTab === 3 ? (
            <Table
              header={[
                "Id",
                "Username",
                "Rank",
                "Reward",
                "Approved",
                "Redeemed",
              ]}
              data={rewardAwarded}
              title={"REWARD AWARDED"}
              showPagination={true}
              getUserDetails={getRewardAwarded}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(rewardAwarded, "reward-awarded")
              }
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
      <Modal
        open={addCareerSeeting}
        onClose={() => setAddCareerSetting(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Grid
            container
            style={{
              borderBottom: "2px solid #D0D0D0",
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
              Add a new Career Setting
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridGap: 30,
              height: "auto",
            }}
          >
            <CustomTextField
              fullWidth={true}
              label={"APLA BETA BV"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter Alpha Beta BV"}
              handleChange={(e) => setCareerBV(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Minimum Users"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter minimum users"}
              handleChange={(e) => setCareerMinimumUsers(e.target.value)}
            />

            <CustomTextField
              fullWidth={true}
              label={"Name of the package"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter reward"}
              handleChange={(e) => setCareerReward(e.target.value)}
            />
            <Grid container className={classes.stickyButton}>
              <CustomButton
                text="Create Career Setting"
                style={{
                  color: "#000",
                  padding: "26px 45px",
                  fontWeight: 700,
                  marginTop: "20px",
                }}
                onClick={submitCareerSetting}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={addRankSeeting}
        onClose={() => setAddRankSetting(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Grid
            container
            style={{
              borderBottom: "2px solid #D0D0D0",
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
              Add a new Rank Setting
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridGap: 30,
              height: "auto",
            }}
          >
            <CustomTextField
              fullWidth={true}
              label={"Rank Name"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              placeholder={"Enter rank name"}
              handleChange={(e) => setRankName(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"APLA BETA MBV"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              placeholder={"Enter Alpha Beta MBV"}
              handleChange={(e) => setRankBV(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Reward"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              placeholder={"Enter reward"}
              handleChange={(e) => setRankReward(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Other Reward"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              placeholder={"Enter other reward"}
              handleChange={(e) => setRankOtherReward(e.target.value)}
            />
            <Grid container>
              <CustomButton
                text="Create Rank Setting"
                style={{
                  color: "#000",
                  padding: "26px 45px",
                  fontWeight: 700,
                  marginTop: "20px",
                }}
                onClick={submitRankSetting}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={addTds}
        onClose={() => setAddTds(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Grid
            container
            style={{
              borderBottom: "2px solid #D0D0D0",
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
              Add Tds
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridGap: 15,
              height: "auto",
            }}
          >
            <Grid style={{ marginTop: 25 }}>
              <CustomDropdown
                fullWidth={true}
                label={"Select User"}
                defaultValue={"Select User"}
                handleSelectChange={(e) => {
                  setUserSelection(e.target.value);
                }}
                menuItems={allUsers}
              />
            </Grid>
            <Grid style={{ marginBottom: 10 }}>
              <Typography
                style={{
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: 15,
                  margin: 8,
                }}
              >
                Upload Tds
              </Typography>
              <div style={{ display: "flex", marginTop: 10 }}>
                <label
                  htmlFor="my-file"
                  style={{
                    background: "#E9C547",
                    color: "#000",
                    padding: "0.5em 3em",
                    textTransform: "uppercase",
                    borderRadius: 4,
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  Select File
                  <input
                    id="my-file"
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                    onChange={(e) => setTdsFile(e.target.files[0])}
                    required
                  />
                </label>
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 500,
                    fontSize: 15,
                    margin: 8,
                  }}
                >
                  {tdsFile?.name}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <CustomButton
                text="Add Tds"
                style={{
                  color: "#000",
                  padding: "26px 45px",
                  fontWeight: 700,
                  marginTop: "20px",
                }}
                onClick={submitTds}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(Settings);
