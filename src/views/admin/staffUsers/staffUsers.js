import React, { useState, useEffect } from "react";
import { Grid, Modal, Box, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import styles from "../supportTickets/supportTickets.style";
import CustomTextField from "../../../customComponents/textfield";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CustomButton from "../../../customComponents/primaryButton";
import CustomDropdown from "../../../customComponents/dropdown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import CustomSpinner from "../../../customComponents/spinner";
import * as XLSX from "xlsx";
import moment from "moment";

const tableHeader = [
  "",
  "#",
  "First Name",
  "Last Name",
  "Username",
  "Email",
  "Mobile",
  "Department",
  "Address",
  "Pan Number",
  "Aadhar Number",
  "Joinning Date",
];

const departments = [
  {
    id: "Trips",
    name: "Trips",
  },
  {
    id: "Payouts",
    name: "Payouts",
  },
  {
    id: "Support - Ticket",
    name: "Support - Ticket",
  },
  {
    id: "Activation",
    name: "Activation",
  },
];

const StaffUsers = ({ classes }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [department, setDepartment] = useState(null);
  const [address, setAddress] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [aadharNo, setAadharNo] = useState(null);
  const [panNo, setPanNo] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [staffUserModal, setStaffUserModal] = useState(false);

  const [staffUsers, setStaffUsers] = useState(null);
  const [blockedStaffUsers, setBlockedStaffUsers] = useState(null);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [loading, setLoading] = useState(true);

  const openAddStaffUserModal = () => {
    setStaffUserModal(true);
  };

  const addStaffUser = async () => {
    if (
      firstName !== null &&
      lastName !== null &&
      emailId !== null &&
      department !== null &&
      address !== null &&
      mobileNo !== null &&
      aadharNo !== null &&
      panNo !== null &&
      username !== null &&
      password !== null
    ) {
      const staffUserDetails = {
        first_name: firstName,
        last_name: lastName,
        email: emailId,
        department: department,
        address: address,
        mobile_number: mobileNo,
        aadhar_number: aadharNo,
        pan_number: panNo,
        username: username,
        password: password,
      };

      const submitStaffData = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.REGISTERSTAFF,
        requestData: staffUserDetails,
      });

      if (submitStaffData?.response) {
        getStaffUsers();
        setStaffUserModal(false);
        setDisplayMsg("Staff User Added");
        setSeverity("success");
        setHandleSnackbar(true);
      } else {
        setDisplayMsg("Please ensure all fields have valid values");
        setSeverity("error");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all your details to continue");
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

  const getStaffUsers = async () => {
    let staffUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.STAFFUSERS,
    });

    if (staffUsers) {
      setLoading(false);
      setStaffUsersData(staffUsers);
    }
  };

  const setStaffUsersData = (data) => {
    const content = data?.map((p, index) => {
      return {
        id: index + 1,
        firstName: p?.first_name,
        lastName: p?.last_name,
        username: p?.username,
        email: p?.email,
        mobile: p?.mobile_number,
        department: p?.department,
        address: p?.address,
        panNo: p?.pan_number,
        aadharNo: p?.aadhar_number,
        date: moment(p?.date_joined).format("DD/MM/YYYY"),
      };
    });
    setStaffUsers(content);
  };

  const getBlockedStaffUsers = async () => {
    let staffUsers = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.BLOCKEDSTAFFUSERS,
    });

    if (staffUsers) {
      const content = staffUsers?.map((p, index) => {
        return {
          id: index + 1,
          firstName: p?.first_name,
          lastName: p?.last_name,
          username: p?.username,
          email: p?.email,
          mobile: p?.mobile_number,
          department: p?.department,
          address: p?.address,
          panNo: p?.pan_number,
          aadharNo: p?.aadhar_number,
          date: moment(p?.date_joined).format("DD/MM/YYYY"),
        };
      });
      setBlockedStaffUsers(content);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffUsers();
    getBlockedStaffUsers();
  }, []);

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
        <Grid className={classes.tableContainer}>
          <Table
            header={tableHeader}
            data={staffUsers}
            title={"STAFF USERS"}
            createBtn={"Create staff user"}
            createMethod={openAddStaffUserModal}
            showPagination={true}
            noFilter={true}
            menuOptions={["Block User"]}
            showMenuOptions={true}
            showFilterButton={true}
            filterType={"Staff Users"}
            dataURL={URLS.STAFFUSERS}
            setData={setStaffUsersData}
            exportExcel={true}
            getUserDetails={() => {
              getStaffUsers();
              getBlockedStaffUsers();
            }}
            exportToExcelClick={() => exportToExcel(staffUsers, "staff-users")}
          />
        </Grid>
        <Grid className={classes.tableContainer}>
          <Table
            header={tableHeader}
            data={blockedStaffUsers}
            title={"BLOCKED STAFF USERS"}
            menuOptions={["Unblock User"]}
            showMenuOptions={true}
            showPagination={true}
            exportExcel={true}
            getUserDetails={() => {
              getStaffUsers();
              getBlockedStaffUsers();
            }}
            exportToExcelClick={() =>
              exportToExcel(blockedStaffUsers, "staff-users")
            }
          />
        </Grid>
      </Grid>

      <Modal
        open={staffUserModal}
        onClose={() => setStaffUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Grid className={classes.textFieldContainer}>
            <CustomTextField
              fullWidth={true}
              label={"First Name"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the First Name"}
              handleChange={(e) => setFirstName(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Last Name"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Last Name"}
              handleChange={(e) => setLastName(e.target.value)}
            />

            <CustomTextField
              fullWidth={true}
              label={"Email"}
              type={"email"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the email"}
              handleChange={(e) => setEmailId(e.target.value)}
            />

            <CustomTextField
              fullWidth={true}
              label={"Address"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Address"}
              handleChange={(e) => setAddress(e.target.value)}
            />

            <CustomTextField
              fullWidth={true}
              label={"Phone Number"}
              type={"tel"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 10);
              }}
              placeholder={"Enter the mobile number"}
              handleChange={(e) => setMobileNo(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Aadhar Number"}
              type={"number"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Aadhar Number"}
              handleChange={(e) => setAadharNo(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Pan Number"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Pan Number"}
              handleChange={(e) => setPanNo(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Username"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Username"}
              handleChange={(e) => setUsername(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Password"}
              type={"password"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={60}
              value={null}
              placeholder={"Enter the Password"}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <Grid style={{ paddingTop: 25 }}>
              <CustomDropdown
                fullWidth={false}
                label={"Select Department"}
                defaultValue={"Select Department"}
                handleSelectChange={(e) => {
                  setDepartment(e.target.value);
                }}
                menuItems={departments}
              />
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <CustomButton
              text="Add"
              style={{
                color: "#000",
                padding: "26px 45px",
                fontWeight: 700,
              }}
              onClick={addStaffUser}
            />
            <CustomButton
              text="Cancel"
              style={{
                color: "#000",
                padding: "26px 45px",
                fontWeight: 700,
              }}
              onClick={() => setStaffUserModal(false)}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(StaffUsers);
