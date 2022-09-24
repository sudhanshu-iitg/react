import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Modal,
  FormControlLabel,
  Button,
  Checkbox,
  Snackbar,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "../../../customComponents/table";
import CustomTextField from "../../../customComponents/textfield";
import MultilineInput from "../../../customComponents/multilineInput";
import CustomButton from "../../../customComponents/primaryButton";
import CustomDropdown from "../../../customComponents/dropdown";
import DetailsTable from "../../../customComponents/detailsTable";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CreatePackage from "./createPackage";
import styles from "../supportTickets/supportTickets.style";
import moment from "moment";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import createPackage from "./createPackage";
import { useHistory, Link, Redirect, location } from "react-router-dom";
import CustomSpinner from "../../../customComponents/spinner";
import * as XLSX from "xlsx";

const tableHeader = [
  "",
  "",
  "Date",
  "Name",
  "Amount",
  "Id",
  "Capping",
  "Package %age",
  "BV",
  "Status",
];

const StaffUsers = ({ classes }) => {
  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [loading, setLoading] = useState(true);

  const [packages, setPackages] = useState(null);
  const [createPackage, setCreatePackage] = useState(false);

  const [packageName, setPackageName] = useState(null);
  const [packageId, setPackageId] = useState(null);
  const [price, setPrice] = useState(null);
  const [miniDesc, setMiniDesc] = useState(null);
  const [longDesc, setLongDesc] = useState(null);
  const [bv, setBv] = useState(null);
  const [category, setCategory] = useState(null);
  const [custType, setCustType] = useState(false);
  const [distType, setDistType] = useState(false);
  const [repurchaseInc, setRepurchaseInc] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [capping, setCapping] = useState(null);
  const [pkgPercent, setpkgPercent] = useState(null);

  const [redirect, setRedirect] = useState(false);

  const [categoryValue, setCategoryValue] = useState("approve");

  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState(null);

  const packageDetails = [
    {
      title: "Package Id",
      value: selectedPackageDetails?.package_id,
    },
    {
      title: "Package Name",
      value: selectedPackageDetails?.name,
      edit: true,
      type: "text",
    },
    {
      title: "Package Price",
      value: selectedPackageDetails?.price,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Package Repurchase Commission",
      value: selectedPackageDetails?.repurchase_commission,
      view: false,
      edit: true,
      type: "text",
    },
    {
      title: "Package BV",
      value: selectedPackageDetails?.bv,
      edit: true,
      type: "text",
    },
    {
      title: "Package Type",
      value: selectedPackageDetails?.type,
      edit: true,
      type: "text",
    },
    {
      title: "Package Category",
      value: selectedPackageDetails?.category,
      edit: true,
      type: "text",
    },
    {
      title: "Package Short Description",
      value: selectedPackageDetails?.short_description,
      edit: true,
      type: "text",
    },
    {
      title: "Package Long Description",
      value: selectedPackageDetails?.long_description,
      edit: true,
      type: "text",
    },
    {
      title: "Package Capping",
      value: selectedPackageDetails?.capping,
      edit: true,
      type: "text",
    },
    {
      title: "Package Percentage",
      value: selectedPackageDetails?.package_percentage,
      edit: true,
      type: "text",
    },
  ];

  const getTripPackages = async () => {
    let packages = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PACKAGES + "/all",
    });
    if (
      packages?.status === "401" ||
      packages?.data?.detail === "Authentication credentials were not provided."
    )
      setRedirect(true);
    setTripPackagesData(packages);
    setLoading(false);
  };

  const setTripPackagesData = (data) => {
    const content = data?.response?.map((item) => {
      return {
        date: moment(item.created_at).format("MMM Do YY"),
        name: item?.name,
        amt: item?.price,
        id: item?.id,
        capping: item?.capping,
        pkgPercent: item?.package_percentage,
        bv: item?.bv,
        statu: "true",
      };
    });
    setPackages(content);
  };

  const openSelectedPackageRow = (id) => {
    setLoading(true);
    getSelectedPackageDetails(id);
    setSelectedPackageId(id);
  };

  const getSelectedPackageDetails = async (id) => {
    let selectedPackage = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PACKAGES + "?id=" + id,
    });
    if (
      selectedPackage?.status === "401" ||
      selectedPackage?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedPackage?.status !== 404) {
      setSelectedPackageDetails(selectedPackage?.response[0]);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setPhoto([...photo, e.target.files[0]]);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const deletePhoto = (key) => {
    let p = selectedFiles;
    let filtered = p.filter((k) => k !== key);
    setSelectedFiles(filtered);
  };

  const createPackageApi = async () => {
    let img = photo.map((p, index) => {
      const element = photo[index];
      const formData = new FormData();
      return formData.append("images", element, element.name);
    });

    if (
      packageId !== null &&
      packageId !== "" &&
      packageName !== null &&
      packageName !== "" &&
      price !== null &&
      price !== "" &&
      categoryValue !== null &&
      categoryValue !== "" &&
      category !== null &&
      category !== "" &&
      img !== null &&
      img !== "" &&
      miniDesc !== null &&
      miniDesc !== "" &&
      longDesc !== null &&
      longDesc !== ""
    ) {
      const formData = new FormData();
      formData.append("package_id", packageId);
      formData.append("name", packageName);
      formData.append("price", price);
      formData.append("repurchase_commission", repurchaseInc);
      formData.append("bv", bv === null ? 0 : bv);
      formData.append("type", categoryValue);
      formData.append("category", category);
      formData.append("images", img);
      formData.append("short_description", miniDesc);
      formData.append("long_description", longDesc);
      formData.append("capping", capping === null ? 0 : capping);
      formData.append(
        "package_percentage",
        pkgPercent === null ? 0 : pkgPercent
      );

      let packages = await allRequestHandler({
        requestType: "IMAGE",
        requestUrl: URLS.CREATEPACKAGE,
        requestData: formData,
      });
      if (packages.response) {
        setDisplayMsg("Package Created!");
        setSeverity("success");
        setHandleSnackbar(true);
        getTripPackages();
        setCreatePackage(false);
      } else {
        setDisplayMsg("Make sure all inputs are valid");
        setHandleSnackbar(true);
        setSeverity("error");
      }
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value);
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
    getTripPackages();
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
  }
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <>
          <Grid style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              {" "}
              <CloseRoundedIcon
                style={{
                  fontSize: 20,
                  color: "#282828",
                  background: "#E9C547",
                  borderRadius: "20px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
                onClick={() => {
                  deletePhoto(photo);
                }}
              />
            </div>
            <img src={photo} alt="" key={photo} className={classes.tripImg} />
          </Grid>
        </>
      );
    });
  };

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
      <Modal
        open={createPackage}
        onClose={() => setCreatePackage(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              borderBottom: "2px solid #D0D0D0",
              alignItems: "center",
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
              Create A New Package
            </Typography>
            <Button
              onClick={() => setCreatePackage(false)}
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
          <Grid className={classes.textFieldContainer}>
            <CustomTextField
              fullWidth={true}
              label={"Package ID"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter Package ID"}
              handleChange={(e) => setPackageId(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Category"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter the Category"}
              handleChange={(e) => setCategory(e.target.value)}
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
              placeholder={"Enter the name"}
              handleChange={(e) => setPackageName(e.target.value)}
            />

            <CustomTextField
              fullWidth={true}
              label={"Package Price"}
              type={"number"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter the price"}
              handleChange={(e) => setPrice(e.target.value)}
            />
            <MultilineInput
              multiline={true}
              minRows={4}
              maxRows={5}
              fullWidth={true}
              label={"Mini Description"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={140}
              value={null}
              placeholder={"Enter the short description"}
              handleChange={(e) => setMiniDesc(e.target.value)}
            />
            <CustomTextField
              fullWidth={true}
              label={"Repurchase Income"}
              type={"number"}
              isRequired={false}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              value={null}
              placeholder={"Enter the repurchase income"}
              handleChange={(e) => setRepurchaseInc(e.target.value)}
            />
            <MultilineInput
              multiline={true}
              minRows={8}
              maxRows={8}
              fullWidth={true}
              label={"Long Description"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={120}
              value={null}
              placeholder={"Enter the long description"}
              handleChange={(e) => setLongDesc(e.target.value)}
            />
            <Grid>
              <Typography
                style={{
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 3,
                }}
                className={classes.labelMr}
              >
                Type of Package
              </Typography>
              <Grid>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={categoryValue}
                    onChange={handleCategoryChange}
                  >
                    <FormControlLabel
                      style={{ padding: 10, paddingLeft: 20, color: "white" }}
                      value="customer"
                      control={<Radio />}
                      label="Customer"
                    />
                    <FormControlLabel
                      style={{ padding: 10, paddingLeft: 20, color: "white" }}
                      value="distributor"
                      control={<Radio />}
                      label="Distributor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {categoryValue === "distributor" && (
                <CustomTextField
                  fullWidth={true}
                  label={"BV"}
                  type={"number"}
                  isRequired={false}
                  autoComplete="off"
                  autoFocus
                  BoxHeight="68px"
                  height={70}
                  value={null}
                  placeholder={"Enter the BV"}
                  handleChange={(e) => setBv(e.target.value)}
                />
              )}
            </Grid>
            {categoryValue === "distributor" && (
              <>
                <CustomTextField
                  fullWidth={true}
                  label={"Capping"}
                  type={"number"}
                  isRequired={false}
                  autoComplete="off"
                  autoFocus
                  BoxHeight="68px"
                  height={70}
                  value={null}
                  placeholder={"Enter the capping limit"}
                  handleChange={(e) => setCapping(e.target.value)}
                />
                <CustomTextField
                  fullWidth={true}
                  label={"Package Percentage"}
                  type={"number"}
                  isRequired={false}
                  autoComplete="off"
                  autoFocus
                  BoxHeight="68px"
                  height={70}
                  value={null}
                  placeholder={"Enter the Package Percentage"}
                  handleChange={(e) => setpkgPercent(e.target.value)}
                />
              </>
            )}
          </Grid>
          <Grid>
            <div>
              <input
                type="file"
                id="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div className={classes.result}>
                {renderPhotos(selectedFiles)}
              </div>
              <div className={classes.labelHolder}>
                <label htmlFor="file" className="label">
                  <p
                    style={{
                      color: "#C5B1FF",
                      border: "1px solid #c5b1ff",
                      padding: 10,
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    Upload Package Images
                  </p>
                </label>
              </div>
            </div>
          </Grid>
          <Grid container className={classes.stickyButton}>
            <CustomButton
              text="Create Package"
              style={{
                color: "#000",
                padding: "26px 45px",
                fontWeight: 700,
              }}
              onClick={createPackageApi}
            />
          </Grid>
        </Box>
      </Modal>
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tableContainer}>
          {selectedPackageId !== null && selectedPackageId !== undefined ? (
            !loading ? (
              <>
                <Button
                  onClick={() => {
                    setSelectedPackageId(null);
                    getTripPackages();
                  }}
                >
                  <KeyboardBackspaceRoundedIcon style={{ fontSize: 35 }} />
                </Button>
                <DetailsTable
                  type={"PACKAGE DETAILS"}
                  details={packageDetails}
                  title={"PACKAGE DETAILS"}
                  showEdit={true}
                  getUserDetails={getSelectedPackageDetails}
                  rowSelectedUserName={selectedPackageDetails?.package_id}
                />
              </>
            ) : (
              <CustomSpinner />
            )
          ) : (
            <Table
              header={tableHeader}
              data={packages}
              title={"Cretated trip packages"}
              createBtn={"CREATE A NEW TRIP PACKAGE"}
              showMenuOptions={true}
              menuOptions={["Delete Package"]}
              showEye={true}
              onRowClick={openSelectedPackageRow}
              showPagination={true}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(packages, "trip-packages")
              }
              createMethod={() => setCreatePackage(true)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(StaffUsers);
