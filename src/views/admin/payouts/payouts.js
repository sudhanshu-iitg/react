import React, { useState, useEffect } from "react";
import { Grid, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import AreaGraph from "../../../customComponents/areaGraph";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import moment from "moment";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import styles from "./payouts.style";
import { useHistory, Link, Redirect, location } from "react-router-dom";
import CustomButton from "../../../customComponents/primaryButton";
import * as XLSX from "xlsx";

const Payouts = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchBy, setSearchBy] = useState("");
  const [currentCycle, setCurrentCycle] = useState("");

  const [salesMatching, setSalesMatching] = useState(null);
  const [salesMatchingMissedCutoff, setSalesMatchingMissedCutoff] =
    useState(null);
  const [beginners, setBeginners] = useState(null);
  const [beginnerCutoff, setBeginnerCutoff] = useState(null);
  const [career, setCareer] = useState(null);
  const [careerCutoff, setCareerCutoff] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [performanceCutoff, setPerformanceCutoff] = useState(null);
  const [rank, setRank] = useState(null);
  const [rankCutoff, setRankCutoff] = useState(null);
  const [repurchase, setRepurchase] = useState(null);
  const [repurchaseCutOff, setRepurchaseCutOff] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [severity, setSeverity] = useState("");
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [checkedState, setChekcedState] = useState([]);

  const [pairMatchGraphData, setPairMatchGraphData] = useState(null);
  const [beginnersGraphData, setBeginnersGraphData] = useState(null);
  const [careerGraphData, setCareerGraphData] = useState(null);
  const [performanceGraphData, setPerformanceGraphData] = useState(null);
  const [rankGraphData, setRankGraphData] = useState(null);
  const [repurchaseGraphData, setRepurchaseGraphData] = useState(null);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleChangeCheckBoxes = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setChekcedState((oldState) => [...oldState, name]);
    } else {
      setChekcedState((oldState) => oldState.filter((item) => item !== name));
    }
  };

  const getPayoutPairs = async () => {
    let payoutPairs = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTSPAIRS,
    });

    if (
      payoutPairs?.status === "401" ||
      payoutPairs?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    //pairs
    if (payoutPairs) {
      setPairsData(payoutPairs);
      setMissedPairsData(payoutPairs);
      setCurrentCycle(payoutPairs?.current_cycle.replace("-", "  to  "));
    }
  };

  const setPairsData = (data) => {
    const content = data?.current_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.date).format("DD/MM/YYYY"),
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number,
        totalAmount: p?.bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setSalesMatching(content);
  };

  const setMissedPairsData = (data) => {
    const cutoffcontent = data?.missed_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.date).format("DD/MM/YYYY"),
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number,
        totalAmount: p?.payable_bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setSalesMatchingMissedCutoff(cutoffcontent);
  };

  const getBeginners = async () => {
    //beginners
    let payoutBeginners = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTSBEGINNERS,
    });
    if (payoutBeginners) {
      setBeginnersData(payoutBeginners);
      setMissedBeginnersData(payoutBeginners);
    }
  };

  const setBeginnersData = (data) => {
    const content = data?.data?.current_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.date).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        uplinkid: p?.user?.username,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalAmount: p?.bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setBeginners(content);
  };

  const setMissedBeginnersData = (data) => {
    const cutoffcontent = data?.data?.missed_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.date).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        uplinkid: p?.user?.username,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalAmount: p?.bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setBeginnerCutoff(cutoffcontent);
  };

  //repurchase
  // let payouRepurchase = await allRequestHandler({
  //   requestType: "GET",
  //   requestUrl: URLS.PAYOUTSREPURCHASE,
  // });

  // careers

  const getPayoutCareers = async () => {
    let payoutCareers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTSCAREER,
    });

    if (payoutCareers) {
      setCareersData(payoutCareers);
      setMissingCareersData(payoutCareers);
    }
  };

  const setCareersData = (data) => {
    const content = data?.current_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.paid_on).format("DD/MM/YYYY"),
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number,
        amt: p?.current_career?.reward,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setCareer(content);
  };

  const setMissingCareersData = (data) => {
    const cutoffcontent = data?.missed_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.paid_on).format("DD/MM/YYYY"),
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number,
        amt: p?.current_career?.reward,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setCareerCutoff(cutoffcontent);
  };

  const getPayoutPerformance = async () => {
    //performance
    let payoutPerformance = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTPERFORMANCE,
    });
    if (payoutPerformance) {
      setPerformanceData(payoutPerformance);
      setMissingPerformanceData(payoutPerformance);
    }
  };

  const setPerformanceData = (data) => {
    const content = data?.current_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.paid_on).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        userid: p?.user?.username,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalAmount: p?.bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setPerformance(content);
  };

  const setMissingPerformanceData = (data) => {
    const cutoffcontent = data?.missed_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.paid_on).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        userid: p?.user?.username,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalamount: p?.bonus,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setPerformanceCutoff(cutoffcontent);
  };

  const getPayoutRanks = async () => {
    let payoutRanks = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTSRANKS,
    });
    if (payoutRanks) {
      setRanksData(payoutRanks);
      setMissingRanksData(payoutRanks);
    }
  };

  const setRanksData = (data) => {
    const content = data?.current_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.approved_on).format("DD/MM/YYYY") || "-",
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number || "-",
        totalAmount: p?.current_rank?.reward,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setRank(content);
  };

  const setMissingRanksData = (data) => {
    const contentcutoff = data?.missed_cut_off?.map((p, index) => {
      return {
        id: p?.id,
        date: moment(p?.approved_on).format("DD/MM/YYYY") || "-",
        name: p?.uplink?.first_name + " " + p?.uplink?.last_name,
        uplinkid: p?.uplink?.username,
        email: p?.uplink?.email,
        mob: p?.uplink?.mobile_number,
        city: p?.uplink?.city,
        state: p?.uplink?.state,
        country: p?.uplink?.country,
        pan: p?.uplink?.pan_number || "-",
        totalAmount: p?.current_rank?.reward,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });

    setRankCutoff(contentcutoff);
  };

  const getRepurchaseIncome = async () => {
    let payoutRepurchase = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PAYOUTSREPURCHASE,
    });
    if (payoutRepurchase) {
      setRepurchaseData(payoutRepurchase);
      setMissingRepurchaseData(payoutRepurchase);
    }
  };

  const setRepurchaseData = (data) => {
    const content = data?.current_cut_off?.map((p, index) => {
      return {
        id: index + 1,
        date: moment(p?.approved_on).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        userid: p?.user?.uplink_id,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalAmount: p?.amount,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.repurchase_paid ? "Approved" : "On Hold",
      };
    });
    setRepurchase(content);
  };

  const setMissingRepurchaseData = (data) => {
    const contentcutoff = data?.missed_cut_off?.map((p, index) => {
      return {
        id: index + 1,
        date: moment(p?.approved_on).format("DD/MM/YYYY"),
        name: p?.user?.first_name + " " + p?.user?.last_name,
        userid: p?.user?.uplink_id,
        email: p?.user?.email,
        mob: p?.user?.mobile_number,
        city: p?.user?.city,
        state: p?.user?.state,
        country: p?.user?.country,
        pan: p?.user?.pan_number,
        totalAmount: p?.amount,
        tax: p?.tax,
        pay_amt: p?.payable_amount,
        status: p?.repurchase_paid ? "Approved" : "On Hold",
      };
    });
    setRepurchaseCutOff(contentcutoff);
  };

  const selectedPay = async (typeURL, type) => {
    setOpen(false);
    let selectedRows = checkedState?.map((item) => item?.replace(type, ""));
    let selectedRowIds = selectedRows
      ?.map((item) => Number(item))
      ?.filter((value) => !Number?.isNaN(value));
    const selectedPayDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: typeURL,
      requestData: { username: selectedRowIds },
    });
    if (selectedPayDetails.response) {
      setDisplayMsg("Paid Successfully");
      setSeverity("success");
      setHandleSnackbar(true);
      setChekcedState([]);
    } else {
      setDisplayMsg("Some Error occured");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const bulkPay = async (typeURL, type) => {
    setOpen(false);
    const bulkPayDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: typeURL,
      requestData: { mode: "bulk" },
    });
    if (bulkPayDetails.response) {
      setDisplayMsg("Paid Successfully");
      setSeverity("success");
      setHandleSnackbar(true);
      if (type === "pairs") {
        setSalesMatching([]);
        setSalesMatchingMissedCutoff([]);
      } else if (type === "beginners") {
        setBeginners([]);
        setBeginnerCutoff([]);
      } else if (type === "career") {
        setCareer([]);
        setCareerCutoff([]);
      } else if (type === "performance") {
        setPerformance([]);
        setPerformanceCutoff([]);
      } else if (type === "rank") {
        setRank([]);
        setRankCutoff([]);
      } else if (type === "repurchase") {
        setRepurchase([]);
        setRepurchaseCutOff([]);
      }
    } else {
      setDisplayMsg("Some Error occured");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const exportToExcelPayouts = async (type) => {
    const exportExcel = await allRequestHandler({
      requestType: "EXCEL",
      requestUrl: URLS.EXPORTTOEXCEL,
      requestData: { type: type },
      responseType: "blob",
    });
    if (exportExcel) {
      setSeverity("success");
      setDisplayMsg("It will export both tables data into excel sheet");
      setHandleSnackbar(true);
      const url = window.URL.createObjectURL(new Blob([exportExcel.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${type} - ${
          new Date().getFullYear() +
          " - " +
          (new Date().getMonth() + 1) +
          " - " +
          new Date().getDate()
        } .xls`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      setSeverity("Some error occurred");
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

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
  };

  const getGraphData = async (type, subType) => {
    const graph = {
      graph_for: "admin",
      type: type,
      sub_type: subType,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    const graphData = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.GRAPH,
      requestData: graph,
    });
    if (graphData) {
      if (subType === "franchaise income") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setPairMatchGraphData(content);
      } else if (subType === "beginners contest") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setBeginnersGraphData(content);
      } else if (subType === "performance") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setPerformanceGraphData(content);
      } else if (subType === "rank") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setRankGraphData(content);
      } else if (subType === "repurchase") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setRepurchaseGraphData(content);
      } else if (subType === "career") {
        const content = graphData?.map((p, index) => {
          return {
            sum: p?.sum,
            date: moment(
              `${new Date().getMonth() + 1}-${
                p?.day
              }-${new Date().getFullYear()}`
            ).format("DD-MMM"),
          };
        });
        setCareerGraphData(content);
      }
    }
  };

  useEffect(() => {
    // getPayoutCareers();
    getPayoutPairs();
    getPayoutPerformance();
    getBeginners();
    getPayoutRanks();
    getRepurchaseIncome();
    getGraphData("payouts", "pair match");
    getGraphData("payouts", "rank");
    getGraphData("payouts", "performance");
    getGraphData("payouts", "repurchase");
    // getGraphData("payouts", "career");
    getGraphData("payouts", "beginners contest");
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        open={handleSnackbar}
        onClose={() => setHandleSnackbar(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {displayMsg}
        </MuiAlert>
      </Snackbar>
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tabContainer}>
          <Tabs
            labels={[
              "Franchise Income",
              // "Beginners Contest",
              // "Career Income",
              "Performance Bonus",
              "Rewards and ranks",
              "Repurchase Income",
            ]}
            tabChange={tabChange}
            value={currentTab}
          />
        </Grid>
        <Grid className={classes.tableContainer}>
          {currentTab === 0 ? (
            <>
              <Grid
                style={{
                  margin: "0 auto",
                  background: "rgba(197, 177, 255, 0.02)",
                  "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
                  "margin-top": "5%",
                  "border-radius": "20px",
                  "margin-bottom": "5%",
                }}
              >
                <AreaGraph data={pairMatchGraphData} />
              </Grid>
              <Table
                header={[
                  "",
                  "",
                  "#",
                  "Date",
                  "Name",
                  "User ID",
                  "Email",
                  "Mobile No",
                  "City",
                  "State",
                  "Country",
                  "PAN",
                  "Total Amount",
                  "Tax",
                  "Payable Amount",
                  "Status",
                ]}
                data={salesMatching}
                title={`Payouts - ${currentCycle}`}
                menuOptions={["Mark as paid"]}
                getUserDetails={getPayoutPairs}
                showMenuOptions={true}
                showPagination={true}
                typeURL={URLS.PAYOUTSPAIRS}
                type={"pairs"}
                payAll={true}
                paySelected={true}
                checkBoxes={true}
                exportExcel={true}
                setOpen={setOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                open={open}
                checkedState={checkedState}
                handleChangeCheckbox={handleChangeCheckBoxes}
                bulkPayClick={() => {
                  bulkPay(URLS.PAYOUTSPAIRS, "pairs");
                  getPayoutPairs();
                }}
                selectedPayClick={() => {
                  selectedPay(URLS.PAYOUTSPAIRS, "pairs");
                  getPayoutPairs();
                }}
                exportToExcelClick={() => exportToExcelPayouts("pairs")}
              />
              <Grid style={{ marginTop: 24 }}>
                <Table
                  header={[
                    "",
                    "#",
                    "Date",
                    "Name",
                    "User ID",
                    "Email",
                    "Mobile No",
                    "City",
                    "State",
                    "Country",
                    "PAN",
                    "Total Amount",
                    "Tax",
                    "Payable Amount",
                    "Status",
                  ]}
                  data={salesMatchingMissedCutoff}
                  title={"Missed Cutoff payout report"}
                  showMenuOptions={false}
                  showPagination={true}
                  type={"pairs-missed"}
                  payAll={false}
                  paySelected={true}
                  checkBoxes={true}
                  exportExcel={false}
                  setOpen={setOpen}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  open={open}
                  checkedState={checkedState}
                  handleChangeCheckbox={handleChangeCheckBoxes}
                  selectedPayClick={() => {
                    selectedPay(URLS.PAYOUTSPAIRS, "pairs-missed");
                    getPayoutPairs();
                  }}
                />
              </Grid>
            </>
          ) : // ) : currentTab === 1 ? (
          //   <>
          //     <Grid
          //       style={{
          //         margin: "0 auto",
          //         background: "rgba(197, 177, 255, 0.02)",
          //         "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
          //         "margin-top": "5%",
          //         "border-radius": "20px",
          //         "margin-bottom": "5%",
          //       }}
          //     >
          //       <AreaGraph data={beginnersGraphData} />
          //     </Grid>
          //     <Table
          //       header={[
          //         "",
          //         "",
          //         "#",
          //         "Date",
          //         "Name",
          //         "User ID",
          //         "Email",
          //         "Mobile No",
          //         "City",
          //         "State",
          //         "Country",
          //         "PAN",
          //         "Payout Amt",
          //         "Tax",
          //         "Payable Amt",
          //         "Status",
          //       ]}
          //       data={beginners}
          //       title={"PAYOUTS - Monthly"}
          //       menuOptions={["Mark as paid"]}
          //       showMenuOptions={true}
          //       showPagination={true}
          //       type={"beginners"}
          //       typeURL={URLS.PAYOUTSBEGINNERS}
          //       payAll={true}
          //       paySelected={true}
          //       checkBoxes={true}
          //       exportExcel={true}
          //       setOpen={setOpen}
          //       handleOpenModal={handleOpenModal}
          //       handleCloseModal={handleCloseModal}
          //       open={open}
          //       checkedState={checkedState}
          //       handleChangeCheckbox={handleChangeCheckBoxes}
          //       bulkPayClick={() => bulkPay(URLS.PAYOUTSBEGINNERS, "beginners")}
          //       selectedPayClick={() =>
          //         selectedPay(URLS.PAYOUTSBEGINNERS, "beginners")
          //       }
          //       exportToExcelClick={() => exportToExcel("beginners")}
          //     />
          //     <Grid style={{ marginTop: 24 }}>
          //       <Table
          //         header={[
          //           "",
          //           "#",
          //           "Date",
          //           "Name",
          //           "User ID",
          //           "Email",
          //           "Mobile No",
          //           "City",
          //           "State",
          //           "Country",
          //           "PAN",
          //           "Payout Amt",
          //           "Tax",
          //           "Payable Amt",
          //           "Status",
          //         ]}
          //         data={beginnerCutoff}
          //         title={"Missed Cut off Payouts Report - Monthly"}
          //         showMenuOptions={false}
          //         showPagination={true}
          //         type={"beginners-missed"}
          //         payAll={false}
          //         paySelected={true}
          //         checkBoxes={true}
          //         setOpen={setOpen}
          //         handleOpenModal={handleOpenModal}
          //         handleCloseModal={handleCloseModal}
          //         open={open}
          //         checkedState={checkedState}
          //         handleChangeCheckbox={handleChangeCheckBoxes}
          //         selectedPayClick={() =>
          //           selectedPay(URLS.PAYOUTSBEGINNERS, "beginners-missed")
          //         }
          //       />
          //     </Grid>
          //   </>
          // ) : currentTab === 12 ? (
          //   <>
          //     <Grid
          //       style={{
          //         margin: "0 auto",
          //         background: "rgba(197, 177, 255, 0.02)",
          //         "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
          //         "margin-top": "5%",
          //         "border-radius": "20px",
          //         "margin-bottom": "5%",
          //       }}
          //     >
          //       <AreaGraph data={careerGraphData} />
          //     </Grid>
          //     <Table
          //       header={[
          //         "",
          //         "",
          //         "#",
          //         "Date",
          //         "Name",
          //         "User ID",
          //         "Email",
          //         "Mobile No",
          //         "City",
          //         "State",
          //         "Country",
          //         "PAN",
          //         "Payout Amt",
          //         "Tax",
          //         "Payable Amt",
          //         "Status",
          //       ]}
          //       data={career}
          //       title={"Payout Reports"}
          //       menuOptions={["Mark as paid", "Keep on hold"]}
          //       showMenuOptions={true}
          //       showPagination={true}
          //       type={"career"}
          //       typeURL={URLS.PAYOUTSCAREER}
          //       payAll={true}
          //       paySelected={true}
          //       checkBoxes={true}
          //       exportExcel={true}
          //       setOpen={setOpen}
          //       handleOpenModal={handleOpenModal}
          //       handleCloseModal={handleCloseModal}
          //       open={open}
          //       checkedState={checkedState}
          //       handleChangeCheckbox={handleChangeCheckBoxes}
          //       bulkPayClick={() => bulkPay(URLS.PAYOUTSCAREER, "career")}
          //       selectedPayClick={() =>
          //         selectedPay(URLS.PAYOUTSCAREER, "career")
          //       }
          //       exportToExcelClick={() => exportToExcel(career, "career")}
          //     />
          //     <Grid style={{ marginTop: 24 }}>
          //       <Table
          //         header={[
          //           "",
          //           "#",
          //           "Date",
          //           "Name",
          //           "User ID",
          //           "Email",
          //           "Mobile No",
          //           "City",
          //           "State",
          //           "Country",
          //           "PAN",
          //           "Payout Amt",
          //           "Tax",
          //           "Payable Amt",
          //           "Status",
          //         ]}
          //         data={careerCutoff}
          //         title={"Missed Cutoff Payouts Report - Monthly"}
          //         showMenuOptions={false}
          //         showPagination={true}
          //         type={"career-missed"}
          //         payAll={false}
          //         paySelected={true}
          //         checkBoxes={true}
          //         setOpen={setOpen}
          //         handleOpenModal={handleOpenModal}
          //         handleCloseModal={handleCloseModal}
          //         open={open}
          //         checkedState={checkedState}
          //         handleChangeCheckbox={handleChangeCheckBoxes}
          //         selectedPayClick={() =>
          //           selectedPay(URLS.PAYOUTSCAREER, "career-missed")
          //         }
          //       />
          //     </Grid>
          //   </>
          currentTab === 1 ? (
            <>
              <Grid
                style={{
                  margin: "0 auto",
                  background: "rgba(197, 177, 255, 0.02)",
                  "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
                  "margin-top": "5%",
                  "border-radius": "20px",
                  "margin-bottom": "5%",
                }}
              >
                <AreaGraph data={performanceGraphData} />
              </Grid>
              <Table
                header={[
                  "",
                  "",
                  "#",
                  "Date",
                  "Name",
                  "User ID",
                  "Email",
                  "Mobile No",
                  "City",
                  "State",
                  "Country",
                  "PAN",
                  "Total Amount",
                  "Tax",
                  "Payable Amt",
                  "Status",
                ]}
                data={performance}
                title={"PAYOUTS - Monthly"}
                menuOptions={["Mark as paid", "Keep on hold"]}
                getUserDetails={getPayoutPerformance}
                showMenuOptions={true}
                showPagination={true}
                type={"performance"}
                typeURL={URLS.PAYOUTPERFORMANCE}
                payAll={true}
                paySelected={true}
                checkBoxes={true}
                exportExcel={true}
                setOpen={setOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                open={open}
                checkedState={checkedState}
                handleChangeCheckbox={handleChangeCheckBoxes}
                bulkPayClick={() => {
                  bulkPay(URLS.PAYOUTPERFORMANCE, "performance");
                  getPayoutPerformance();
                }}
                selectedPayClick={() => {
                  selectedPay(URLS.PAYOUTPERFORMANCE, "performance");
                  getPayoutPerformance();
                }}
                exportToExcelClick={() => exportToExcel("performance")}
              />
              <Grid style={{ marginTop: 24 }}>
                <Table
                  header={[
                    "",
                    "#",
                    "Date",
                    "Name",
                    "User ID",
                    "Email",
                    "Mobile No",
                    "City",
                    "State",
                    "Country",
                    "PAN",
                    "Payout Amount",
                    "Tax",
                    "Payable Amount",
                    "Status",
                  ]}
                  data={performanceCutoff}
                  title={"Missed Cutoff Payouts Report - Monthly"}
                  showMenuOptions={false}
                  showPagination={true}
                  type={"performance-missed"}
                  payAll={false}
                  paySelected={true}
                  checkBoxes={true}
                  setOpen={setOpen}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  open={open}
                  checkedState={checkedState}
                  handleChangeCheckbox={handleChangeCheckBoxes}
                  selectedPayClick={() => {
                    selectedPay(URLS.PAYOUTPERFORMANCE, "performance-missed");
                    getPayoutPerformance();
                  }}
                />
              </Grid>
            </>
          ) : currentTab === 2 ? (
            <>
              <Grid
                style={{
                  margin: "0 auto",
                  background: "rgba(197, 177, 255, 0.02)",
                  "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
                  "margin-top": "5%",
                  "border-radius": "20px",
                  "margin-bottom": "5%",
                }}
              >
                <AreaGraph data={rankGraphData} />
              </Grid>
              <Table
                header={[
                  "",
                  "",
                  "#",
                  "Date",
                  "Name",
                  "User ID",
                  "Email",
                  "Mobile No",
                  "City",
                  "State",
                  "Country",
                  "PAN",
                  "Total Amount",
                  "Tax",
                  "Payable Amount",
                  "Status",
                ]}
                data={rank}
                title={"PAYOUTS - Monthly"}
                menuOptions={["Mark as paid"]}
                getUserDetails={getPayoutRanks}
                showMenuOptions={true}
                showPagination={true}
                type={"rank"}
                typeURL={URLS.PAYOUTSRANKS}
                checkBoxes={true}
                payAll={true}
                paySelected={true}
                exportExcel={true}
                setOpen={setOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                open={open}
                checkedState={checkedState}
                handleChangeCheckbox={handleChangeCheckBoxes}
                bulkPayClick={() => {
                  bulkPay(URLS.PAYOUTSRANKS, "rank");
                  getPayoutRanks();
                }}
                selectedPayClick={() => {
                  selectedPay(URLS.PAYOUTSRANKS, "rank");
                  getPayoutRanks();
                }}
                exportToExcelClick={() => exportToExcel("rank")}
              />
              <Grid style={{ marginTop: 24 }}>
                <Table
                  header={[
                    "",
                    "#",
                    "Date",
                    "Name",
                    "User ID",
                    "Email",
                    "Mobile No",
                    "City",
                    "State",
                    "Country",
                    "PAN",
                    "Total Amount",
                    "Tax",
                    "Payable Amount",
                    "Status",
                  ]}
                  data={rankCutoff}
                  title={"Missed Cutoff Payouts Report"}
                  showMenuOptions={false}
                  showPagination={true}
                  type={"rank-missed"}
                  checkBoxes={true}
                  payAll={false}
                  paySelected={true}
                  setOpen={setOpen}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  open={open}
                  checkedState={checkedState}
                  handleChangeCheckbox={handleChangeCheckBoxes}
                  selectedPayClick={() => {
                    selectedPay(URLS.PAYOUTSRANKS, "rank-missed");
                    getPayoutRanks();
                  }}
                />
              </Grid>
            </>
          ) : currentTab === 3 ? (
            <>
              <Grid
                style={{
                  margin: "0 auto",
                  background: "rgba(197, 177, 255, 0.02)",
                  "box-shadow": "4px 20px 50px rgb(0 0 0 / 40%)",
                  "margin-top": "5%",
                  "border-radius": "20px",
                  "margin-bottom": "5%",
                }}
              >
                <AreaGraph data={repurchaseGraphData} />
              </Grid>
              <Table
                header={[
                  "",
                  "",
                  "#",
                  "Date",
                  "Name",
                  "User ID",
                  "Email",
                  "Mobile No",
                  "City",
                  "State",
                  "Country",
                  "PAN",
                  "Total Amount",
                  "Tax",
                  "Payable Amount",
                  "Status",
                ]}
                data={repurchase}
                title={"PAYOUTS - Monthly"}
                menuOptions={["Mark as paid"]}
                getUserDetails={getRepurchaseIncome}
                showMenuOptions={true}
                showPagination={true}
                type={"repurchase"}
                typeURL={URLS.PAYOUTSREPURCHASE}
                payAll={true}
                paySelected={true}
                checkBoxes={true}
                exportExcel={true}
                setOpen={setOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                open={open}
                checkedState={checkedState}
                handleChangeCheckbox={handleChangeCheckBoxes}
                bulkPayClick={() => {
                  bulkPay(URLS.PAYOUTSREPURCHASE, "repurchase");
                  getRepurchaseIncome();
                }}
                selectedPayClick={() => {
                  selectedPay(URLS.PAYOUTSREPURCHASE, "repurchase");
                  getRepurchaseIncome();
                }}
                exportToExcelClick={() => {
                  exportToExcel("repurchase");
                }}
              />
              <Grid style={{ marginTop: 24 }}>
                <Table
                  header={[
                    "",
                    "#",
                    "Date",
                    "Name",
                    "User ID",
                    "Email",
                    "Mobile No",
                    "City",
                    "State",
                    "Country",
                    "PAN",
                    "Total Amount",
                    "Tax",
                    "Payable Amount",
                    "Status",
                  ]}
                  data={repurchaseCutOff}
                  title={"Missed Cutoff Payouts Report"}
                  showMenuOptions={false}
                  showPagination={true}
                  type={"repurchase-missed"}
                  payAll={false}
                  paySelected={true}
                  checkBoxes={true}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  open={open}
                  checkedState={checkedState}
                  handleChangeCheckbox={handleChangeCheckBoxes}
                  selectedPayClick={() => {
                    selectedPay(URLS.PAYOUTSREPURCHASE, "repurchase-missed");
                    getRepurchaseIncome();
                  }}
                />
              </Grid>
            </>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Payouts);
