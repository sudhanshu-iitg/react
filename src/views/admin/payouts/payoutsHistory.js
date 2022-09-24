import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import CustomSpinner from "../../../customComponents/spinner";
import { requestUrl } from "../../../constants/index";
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

const PayoutsHistory = ({ classes }) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchBy, setSearchBy] = useState("");

  const [daily, setDaily] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [repurchase, setRepurchase] = useState(null);
  const [pairMatch, setPairMatch] = useState(null);
  // const [beginners, setBeginners] = useState(null);
  const [career, setCareer] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [rank, setRank] = useState(null);

  const getDailyPaouts = async () => {
    setLoading(true);
    let daily = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?paid=True&paid_on=${moment(
        new Date()
      ).format("YYYY-MM-DD")}&portal=admin&description=today`,
    });
    if (
      daily?.status === "401" ||
      daily?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (daily) {
      setDailyData(daily);
      setLoading(false);
    }
  };

  const setDailyData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getWeeklyPayouts = async () => {
    setLoading(true);
    let weekly = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?paid=True&&paid_on_gte=${moment(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).format("YYYY/MM/DD")}&paid_on_lte=${moment(new Date()).format(
        "YYYY-MM-DD"
      )}&portal=admin&description=weekly`,
    });
    if (weekly) {
      setWeeklyData(weekly);
      setLoading(false);
    }
  };

  const setWeeklyData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getRepurchasePayouts = async () => {
    setLoading(true);
    let repurchase = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?description=repurchase&paid=true&portal=admin`,
    });

    if (repurchase) {
      setRepurchaseData(repurchase);
      setLoading(false);
    }
  };

  const setRepurchaseData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getCareerPayouts = async () => {
    setLoading(true);
    let career = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?description=career&paid=true&portal=admin`,
    });

    if (career) {
      setCareerData(career);
      setLoading(false);
    }
  };

  const setCareerData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getPerformancePayouts = async () => {
    setLoading(true);
    let perf = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?description=performance&paid=true&portal=admin`,
    });

    if (perf) {
      setPerformanceData(perf);
      setLoading(false);
    }
  };

  const setPerformanceData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getRankPayouts = async () => {
    setLoading(true);
    let rank = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?description=rank&paid=true&portal=admin`,
    });

    if (rank) {
      setRankData(rank);
      setLoading(false);
    }
  };

  const setRankData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const getPairMatchPayouts = async () => {
    setLoading(true);
    let pairMatch = await allRequestHandler({
      requestType: "GET",
      requestUrl: `${requestUrl}history/payments?description=pair match&paid=true&portal=admin`,
    });

    if (pairMatch) {
      setPairMatchData(pairMatch);
      setLoading(false);
    }
  };

  const setPairMatchData = (data) => {
    const content = data?.map((p) => {
      return {
        id: p?.id,
        date: p?.paid_on,
        username: p?.user?.username,
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

  const tabChange = (e, newVal) => {
    setCurrentTab(newVal);
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
    getDailyPaouts();
    getWeeklyPayouts();
    getRepurchasePayouts();
    // getCareerPayouts();
    getPerformancePayouts();
    getRankPayouts();
    getPairMatchPayouts();
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
                    "Paid Date",
                    "Username",
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
                  showFilterButton={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?paid=True&paid_on=${moment(
                    new Date()
                  ).format("YYYY-MM-DD")}`}
                  setData={setDailyData}
                />
              </>
            ) : currentTab === 1 ? (
              <Table
                header={[
                  "#",
                  "Paid Date",
                  "Username",
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
                showFilterButton={true}
                showPagination={true}
                filterType={"Payouts Admin"}
                dataURL={`${requestUrl}history/payments?paid=True&&paid_on_gte=${moment(
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).format("YYYY/MM/DD")}&paid_on_lte=${moment(new Date()).format(
                  "YYYY-MM-DD"
                )}`}
                setData={setWeeklyData}
              />
            ) : currentTab === 2 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Username",
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
                  showFilterButton={true}
                  showPagination={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?description=repurchase`}
                  setData={setRepurchaseData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(repurchase, "repurchase-payout-history")
                  }
                />
              </>
            ) : currentTab === 11 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Username",
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
                  showFilterButton={true}
                  showPagination={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?description=career`}
                  setData={setCareerData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(career, "career-payout-history")
                  }
                />
              </>
            ) : currentTab === 3 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Username",
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
                  showFilterButton={true}
                  showPagination={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?description=performance`}
                  setData={setPerformanceData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(performance, "performance-payout-history")
                  }
                />
              </>
            ) : currentTab === 4 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Username",
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
                  showFilterButton={true}
                  showPagination={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?description=rank`}
                  setData={setRankData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(rank, "rank-payout-history")
                  }
                />
              </>
            ) : currentTab === 5 ? (
              <>
                <Table
                  header={[
                    "#",
                    "Paid Date",
                    "Username",
                    "Payable Amt",
                    "Tax",
                    "Net Amt",
                    "Total Amt",
                    "PAN Number",
                    "Status",
                  ]}
                  data={pairMatch}
                  title={"FRANCHISE INCOME"}
                  subtitle={"Reports on Franchaise Income"}
                  showMenuOptions={false}
                  showPagination={true}
                  showFilterButton={true}
                  filterType={"Payouts Admin"}
                  dataURL={`${requestUrl}history/payments?description=franchaise income`}
                  setData={setPairMatchData}
                  exportExcel={true}
                  exportToExcelClick={() =>
                    exportToExcel(pairMatch, "franchaise-income-payout-history")
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

export default withStyles(styles)(PayoutsHistory);
