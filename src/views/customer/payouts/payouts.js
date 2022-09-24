import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import AreaGraph from "../../../customComponents/areaGraph";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import CustomSpinner from "../../../customComponents/spinner";
import { requestUrl, URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import styles from "../../admin/payouts/payouts.style";
import moment from "moment";
import * as XLSX from "xlsx";
const tableHeader = [
  "",
  "#",
  "Date",
  "Name",
  "User ID",
  "Email",
  "Mobile Number",
  "Amount",
  "Bank",
];

const Payouts = ({ classes }) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchBy, setSearchBy] = useState("");

  const [daily, setDaily] = useState(null);
  const [onHold, setOnHold] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [repurchase, setRepurchase] = useState(null);
  const [pairMatch, setPairMatch] = useState(null);
  // const [beginners, setBeginners] = useState(null);
  const [career, setCareer] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [rank, setRank] = useState(null);

  const [pairMatchGraphData, setPairMatchGraphData] = useState(null);
  const [beginnersGraphData, setBeginnersGraphData] = useState(null);
  const [careerGraphData, setCareerGraphData] = useState(null);
  const [performanceGraphData, setPerformanceGraphData] = useState(null);
  const [rankGraphData, setRankGraphData] = useState(null);
  const [repurchaseGraphData, setRepurchaseGraphData] = useState(null);

  const getPayouts = async () => {
    const username = JSON.parse(localStorage.getItem("loginData"))?.username;

    let date = moment(new Date()).format("YYYY-MM-DD");
    let lastWeek = moment(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).format("YYYY/MM/DD");

    let daily = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=True&paid_on=${date}&portal=user&description=today`,
    });
    if (
      daily?.status === "401" ||
      daily?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (daily) {
      setLoading(false);
      setDailyData(daily);
    }

    let onhold = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=False&portal=user`,
    });
    if (onhold) {
      setonHoldData(onhold);
    }

    let weekly = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&&paid_on_gte=${lastWeek}&paid_on_lte=${date}&portal=user&description=weekly`,
    });
    if (weekly) {
      setWeeklyData(weekly);
    }

    let repurchase = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&description=repurchase&portal=user`,
    });

    if (repurchase) {
      setRepurchaseData(repurchase);
    }

    let pairMatch = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&description=pair match&portal=user`,
    });

    if (pairMatch) {
      setPairMatchData(pairMatch);
    }

    let career = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&description=career&portal=user`,
    });

    if (career) {
      setCareerData(career);
    }

    let perf = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&description=performance&portal=user`,
    });

    if (perf) {
      setPerformanceData(perf);
    }

    let rank = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?user__username=${username}&paid=true&description=rank&portal=user`,
    });

    if (rank) {
      setRankData(rank);
    }
  };

  const setDailyData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setDaily(content);
  };

  const setonHoldData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setOnHold(content);
  };

  const setWeeklyData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        //  alpha :
        //  beta :
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,

        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setWeekly(content);
  };

  const setRepurchaseData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,

        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setRepurchase(content);
  };

  const setPerformanceData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setPerformance(content);
  };

  const setCareerData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setCareer(content);
  };

  const setRankData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setRank(content);
  };

  const setPairMatchData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        payableAmount: parseFloat(p?.payable_amount).toFixed(2),
        tax: parseFloat(p?.tax).toFixed(2),
        net: parseFloat(p?.payable_amount).toFixed(2),
        total: parseFloat(p?.payable_amount + p?.tax).toFixed(2),
        pan: p?.user?.pan_number,
        status: p?.paid ? "Approved" : "On Hold",
      };
    });
    setPairMatch(content);
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
      graph_for: "users",
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
      if (subType === "franchise income") {
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
    getPayouts();
    getGraphData("payouts", "franchise income");
    getGraphData("payouts", "rank");
    getGraphData("payouts", "performance");
    getGraphData("payouts", "repurchase");
    getGraphData("payouts", "career");
    //getGraphData("payouts", "beginners contest");
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
        <Grid className={classes.outerContainer}>
          <Grid className={classes.tabContainer}>
            <Tabs
              labels={[
                "Today's Income Report",
                "On Hold Report",
                "Weekly Income Report",
                "Repurchase Income",
                // "Beginners Contest",
                // "Career Income",
                "Performance Bonus",
                "Rank & Rewards",
                "Franchise Income",
              ]}
              tabChange={tabChange}
              value={currentTab}
            />
          </Grid>
          {/* <Grid className={classes.areaGraph}>
          <Grid>
            <Typography className={classes.chartTitle}>
              Average SMB Payout Amount
            </Typography>
            <Typography className={classes.chartSubtitle}>15,000.00</Typography>
          </Grid>

          <AreaGraph />
        </Grid> */}
          <Grid className={classes.tableContainer}>
            {currentTab === 0 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={daily}
                  title={"Today's Income Payout"}
                  searchMenu={tableHeader}
                  showMenuOptions={false}
                  showPagination={true}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(daily, "daily-payout-report")
                  }
                />
              </>
            ) : currentTab === 1 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={onHold}
                  title={"On HOLD PAYOUT AMOUNT"}
                  showMenuOptions={false}
                  showPagination={true}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(onHold, "onHold-payout-amount")
                  }
                />
              </>
            ) : currentTab === 2 ? (
              <Table
                header={[
                  "#",
                  "Date",
                  "Payable Amt",
                  "Tax",
                  "Net Amt",
                  "Total Amt",
                  "PAN Number",
                  "Status",
                ]}
                data={weekly}
                title={"Weekly payout report"}
                showMenuOptions={false}
                showPagination={true}
                exportExcel={true}
                exportToExcelClick={() =>
                  exportToExcel(weekly, "weekly-payout-report")
                }
              />
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
                    "#",
                    "Paid Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={repurchase}
                  title={"REPURCHASE INCOME REPORT"}
                  subtitle={"Reports on repurchase income"}
                  showMenuOptions={false}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"Payouts User"}
                  dataURL={`${requestUrl}history/payments?description=repurchase`}
                  setData={setRepurchaseData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(repurchase, "repurchase-payout-history")
                  }
                />
              </>
            ) : currentTab === 14 ? (
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
                  <AreaGraph data={careerGraphData} />
                </Grid>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={career}
                  subtitle={"Reports on career income"}
                  title={"CAREER INCOME REPORT"}
                  showMenuOptions={false}
                  showPagination={true}
                  exportExcel={true}
                  showFilterButton={true}
                  filterType={"Payouts User"}
                  dataURL={`${requestUrl}history/payments?description=career`}
                  setData={setCareerData}
                  exportToExcelClick={() =>
                    exportToExcel(career, "career-payout-history")
                  }
                />
              </>
            ) : currentTab === 4 ? (
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
                    "#",
                    "Paid Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={performance}
                  title={"PERFORMANCE BONUS REPORT"}
                  subtitle={"Reports on Performance Bonus income"}
                  showMenuOptions={false}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"Payouts User"}
                  dataURL={`${requestUrl}history/payments?description=performance`}
                  setData={setPerformanceData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(performance, "performance-payout-history")
                  }
                />
              </>
            ) : currentTab === 5 ? (
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
                    "#",
                    "Paid Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={rank}
                  title={"RANK AND REWARDS REPORT"}
                  subtitle={"Reports on Rank and Rewards"}
                  showMenuOptions={false}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"Payouts User"}
                  dataURL={`${requestUrl}history/payments?description=rank`}
                  setData={setRankData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(rank, "rank-payout-history")
                  }
                />
              </>
            ) : currentTab === 6 ? (
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
                    "#",
                    "Paid Date",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={pairMatch}
                  title={"SALES MATCHING BONUS"}
                  subtitle={"Reports on franchaise income"}
                  showMenuOptions={false}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"Payouts User"}
                  dataURL={`${requestUrl}history/payments?description=franchaise income`}
                  setData={setRankData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(pairMatch, "pair-match-payout-history")
                  }
                />
              </>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withStyles(styles)(Payouts);
