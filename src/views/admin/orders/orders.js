import React, { useState, useEffect } from "react";
import { Grid, Snackbar, Button } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import moment from "moment";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import styles from "./orders.style";
import { Redirect } from "react-router-dom";
import CustomSpinner from "../../../customComponents/spinner";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

import * as XLSX from "xlsx";

const AdminOrders = ({ classes }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [penUpgPkgReqs, setPenUpgPkgReqs] = useState(null);
  const [appUpgPkgs, setAppUpgPkgs] = useState(null);
  const [penRepPkgReqs, setPenRepPkgReqs] = useState(null);
  const [appRepPkgs, setAppRepPkgs] = useState(null);

  const [loading, setLoading] = useState(true);

  const [redirect, setRedirect] = useState(false);
  const [severity, setSeverity] = useState("");
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);

  const getpendingUpgradePackageRequests = async () => {
    let pendingUpgradePackageRequests = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PENDINGUPGRADEPKGREQ,
    });

    if (
      pendingUpgradePackageRequests?.status === "401" ||
      pendingUpgradePackageRequests?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);

    if (pendingUpgradePackageRequests) {
      setPenUpgPkgReqsData(pendingUpgradePackageRequests);
      setLoading(false);
    }
  };

  const setPenUpgPkgReqsData = (data) => {
    const content = data?.map((p) => {
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
        requestedOn: moment(p?.requested_on).format("DD/MM/YYYY"),
        status: p?.approved ? "Approved" : "On Hold",
      };
    });
    setPenUpgPkgReqs(content);
  };

  const getApprovedUpgradePackages = async () => {
    let appvoedUpgradePackages = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.APPROVEDUPGRADEPKG,
    });
    if (appvoedUpgradePackages) {
      setAppUpgPkgsData(appvoedUpgradePackages);
      setLoading(false);
    }
  };

  const setAppUpgPkgsData = (data) => {
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
    setAppUpgPkgs(content);
  };

  const getPendingRepurchasePackageRequests = async () => {
    let penRepurchasePckgReqs = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PENDINGREPURPKGREQ,
    });

    if (penRepurchasePckgReqs) {
      setPenRepPkgReqsData(penRepurchasePckgReqs);
      setLoading(false);
    }
  };

  const setPenRepPkgReqsData = (data) => {
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
      };
    });
    setPenRepPkgReqs(content);
  };

  const getApprovedRepurchasePackages = async () => {
    let approvedRepurchasePkg = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.APPROVEDREPURPKG,
    });
    if (approvedRepurchasePkg) {
      setAppRepPkgsData(approvedRepurchasePkg);
      setLoading(false);
    }
  };

  const setAppRepPkgsData = (data) => {
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
    setAppRepPkgs(content);
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

  useEffect(() => {
    getPendingRepurchasePackageRequests();
    getpendingUpgradePackageRequests();
    getApprovedRepurchasePackages();
    getApprovedUpgradePackages();
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
          {displayMsg}
        </MuiAlert>
      </Snackbar>
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tabContainer}>
          <Tabs
            labels={[
              "Pending Upgrade Package Requests",
              "Approved Upgrade Packages",
              "Repurchase Package Requests",
              "Approved Repurchase Packages",
            ]}
            tabChange={tabChange}
            value={currentTab}
          />
        </Grid>
        <Grid className={classes.tableContainer}>
          {currentTab === 0 ? (
            <Table
              header={[
                "",
                "Id",
                "Username",
                "Firstname",
                "Lastname",
                "Package Id",
                "Package Name",
                "Package Price",
                "Payment Type",
                "Transaction Id",
                "Requested On",
                "Status",
              ]}
              data={penUpgPkgReqs}
              title={"Pending Upgrade Package Requests"}
              menuOptions={[
                "Approve Upgrade pending package request",
                "Delete Upgrade pending package request",
              ]}
              showMenuOptions={true}
              getUserDetails={() => {
                getpendingUpgradePackageRequests();
                getApprovedUpgradePackages();
              }}
              showPagination={true}
              showFilterButton={true}
              filterType={"Orders"}
              dataURL={URLS.PENDINGUPGRADEPKGREQ}
              setData={setPenUpgPkgReqsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(penUpgPkgReqs, "Pending-Upgrade-Package")
              }
            />
          ) : currentTab === 1 ? (
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
              data={appUpgPkgs}
              title={"Approved Upgrade Packages"}
              showPagination={true}
              exportExcel={true}
              showFilterButton={true}
              filterType={"Orders"}
              dataURL={URLS.APPROVEDUPGRADEPKG}
              setData={setAppUpgPkgsData}
              exportToExcelClick={() =>
                exportToExcel(appUpgPkgs, "Approved-Upgrade-Packages")
              }
            />
          ) : currentTab === 2 ? (
            <Table
              header={[
                "",
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
                "Invoice",
              ]}
              data={penRepPkgReqs}
              title={"Repurchase Package Requests"}
              menuOptions={[
                "Approve Repurchase Package Requests",
                "Delete Repurchase Package Requests",
              ]}
              showPagination={true}
              showMenuOptions={true}
              getUserDetails={() => {
                getPendingRepurchasePackageRequests();
                getApprovedRepurchasePackages();
              }}
              showFilterButton={true}
              filterType={"Orders"}
              dataURL={URLS.PENDINGREPURPKGREQ}
              setData={setPenRepPkgReqsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(penRepPkgReqs, "Pending-Repurchase-Package")
              }
            />
          ) : currentTab === 3 ? (
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
              data={appRepPkgs}
              title={"Approved Repurchase Packages"}
              showPagination={true}
              showFilterButton={true}
              filterType={"Orders"}
              dataURL={URLS.APPROVEDREPURPKG}
              setData={setAppRepPkgsData}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(appRepPkgs, "Approved-Repurchase-Packages")
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

export default withStyles(styles)(AdminOrders);
