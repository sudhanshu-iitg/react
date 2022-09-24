import React, { useState } from "react";
import { withStyles, useTheme } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  TableSortLabel,
  Typography,
  Button,
  TablePagination,
  TableFooter,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import Checkbox from "@mui/material/Checkbox";
import MenuOptions from "./menuOptions";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CustomButton from "./primaryButton";
import CustomTooltip from "./tooltip";
import SearchBar from "./searchBar";
import Filters from "./filters";
import FilterListIcon from "@mui/icons-material/FilterList";
import NoData from "../assets/noData.svg";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ExcelIcon from "../assets/excelIcon.svg";
import { fontWeight } from "@mui/system";
import { URLS } from "../constants/index";
import { allRequestHandler } from "../api/index";
import ConfirmationModal from "./modal";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const styles = () => ({
  tableContainer: {
    borderRadius: 20,
    padding: 10,
    background: "rgba(197, 177, 255, 0.02)",
    boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
  },
  tableTitle: {
    fontSize: 20,
    textTransform: "uppercase",
    display: "flex",
    color: "#FFF",
    fontWeight: 700,
    marginBottom: 30,
    alignItems: "center",
    "@media(max-width: 600px)": {
      fontSize: 15,
    },
  },
  subtitle: {
    fontSize: 15,
    color: "#FFE660",
    textTransform: "capitalize",
  },
  tableHeader: {
    background: "#343434",
  },
  tableHeaderText: {
    color: "#FFE660",
    fontWeight: 700,
    fontSize: 16,
    padding: "15px !important",
    minWidth: 100,
    textAlign: "center",
    borderBottom: "1px solid  #ccc",
  },
  tableCell: {
    color: "#CCC",
    fontWeight: 500,
    padding: "15px !important",
    fontSize: 14,
    textAlign: "center !important",
  },
  closed: {
    background: "rgba(95, 231, 117, 0.3)",
    padding: "5px 20px",
    borderRadius: 5,
    textTransform: "uppercase",
  },
  open: {
    background: "rgba(229, 119, 119, 0.3)",
    padding: "5px 27px",
    borderRadius: 5,
    textTransform: "uppercase",
  },
  noData: {
    display: "flex !important",
    flexDirection: "column  !important",
    height: "40%",
    width: "60%",
    "@media(max-width: 600px)": {
      width: "80% !important",
    },
    background: "#343434",
    border: "1px solid #545454",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#FFE660",
    fontWeight: 700,
    fontSize: 16,
    padding: 25,
    margin: "20px auto",
  },
});

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const CustomTable = ({
  header,
  data,
  title,
  subtitle,
  onRowClick,
  showFilterButton,
  noExport,
  noBorder,
  createBtn,
  createMethod,
  searchMenu,
  searchBy,
  setSearchBy,
  classes,
  menuOptions,
  getUserDetails,
  showMenuOptions,
  showEye,
  count,
  currentPage,
  type,
  checkBoxes,
  payAll,
  paySelected,
  exportExcel,
  bulkPayClick,
  handleOpenModal,
  handleCloseModal,
  open,
  checkedState,
  handleChangeCheckbox,
  exportToExcelClick,
  selectedPayClick,
  typeURL,
  filterType,
  setData,
  dataURL,
  showPagination,
  getTds,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isPayBulkSelected, setPayBulk] = useState(false);
  const [isSelectedPaySelected, setSelectedPay] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  let rows =
    data?.length > 0 &&
    data &&
    data?.map((row) => {
      return [...Object.values(row)];
    });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTdsReport = async () => {
    const getTds = await allRequestHandler({
      requestType: "EXCEL",
      requestUrl: URLS.TDSREPORT,
      requestData: { type: "all" },
      responseType: "blob",
    });

    if (getTds?.data?.size === 44) {
      setDisplayMsg("No payouts to generate report");
      setSeverity("error");
      setHandleSnackbar(true);
    } else {
      const url = window.URL.createObjectURL(new Blob([getTds?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Tds Report - ${
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
    }
  };

  return (
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
      <Grid className={classes.tableContainer}>
        {showFilter && (
          <Filters
            open={showFilter}
            handleClose={(e) => setShowFilter(false)}
            filterType={filterType}
            setData={setData}
            dataURL={dataURL}
          />
        )}
        {!noExport && (
          <Grid
            container
            style={{
              justifyContent: "space-between",
              padding: "20px 20px 15px 20px",
            }}
          >
            <Grid item>
              <Typography className={classes.tableTitle}>
                {title}
                {subtitle && (
                  <span style={{ margin: "auto 10px" }}>
                    <svg
                      width="2"
                      height="43"
                      viewBox="0 0 2 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1"
                        y1="1"
                        x2="0.999998"
                        y2="42"
                        stroke="#FFE660"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                )}
                <span className={classes.subtitle}>{subtitle}</span>
              </Typography>
            </Grid>
            <Grid
              item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {createBtn && (
                <Grid item>
                  <CustomButton
                    text={createBtn}
                    variant="outlined"
                    style={{
                      color: "#E9C547",
                      marginRight: 10,
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                    onClick={createMethod}
                  />
                </Grid>
              )}
              {paySelected && (
                <Grid item>
                  {rows?.length > 0 && (
                    <CustomButton
                      text="Pay Selected"
                      hideText={true}
                      variant="contained"
                      onClick={() => {
                        setSelectedPay(true);
                        handleOpenModal();
                      }}
                      style={
                        checkedState.length === 0
                          ? {
                              background: "#787878",
                              color: "#BCBCBC",
                              pointerEvents: "none",
                              marginRight: 20,
                            }
                          : {
                              marginRight: 20,
                            }
                      }
                    />
                  )}
                </Grid>
              )}
              {payAll && (
                <Grid item>
                  {rows?.length > 0 && (
                    <CustomButton
                      text="Pay all"
                      hideText={true}
                      variant="contained"
                      onClick={() => {
                        setPayBulk(true);
                        handleOpenModal();
                      }}
                      style={{
                        marginRight: 30,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    />
                  )}
                </Grid>
              )}
              <Grid item>
                {rows?.length > 0 && exportExcel && (
                  <CustomButton
                    text="Export to excel"
                    hideText={true}
                    variant="contained"
                    style={{
                      background: "#C5B1FF",
                      padding: "8px 16px",
                      color: "#262626",
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                    btnIcon={ExcelIcon}
                    margin="16px"
                    onClick={exportToExcelClick}
                  />
                )}
              </Grid>
              <Grid item>
                {getTds && (
                  <CustomButton
                    text="Generate Tds"
                    variant="contained"
                    style={{
                      marginLeft: 20,
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                    onClick={getTdsReport}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            padding: "0px 20px 15px 20px",
          }}
        >
          {/* <Grid item>
            <SearchBar
              menuItems={searchMenu}
              setSearchBy={setSearchBy}
              searchBy={searchBy}
            />
          </Grid> */}
          {rows?.length > 0 && showFilterButton && (
            <Grid item>
              <CustomButton
                text="Add Filters"
                variant="outlined"
                style={{
                  color: "#9A9A9A",
                  borderRadius: 5,
                  padding: "10px 25px",
                  border: "2px solid rgba(255, 230, 99, 0.5)",
                }}
                onClick={(e) => {
                  setShowFilter(true);
                }}
                hideText={true}
                endIcon={<FilterListIcon />}
              />
            </Grid>
          )}
        </Grid>
        {rows?.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.tableHeader}>
                    {header.map((title) => {
                      return (
                        <>
                          <TableCell
                            class={classes.tableHeaderText}
                            style={{ padding: "15px !important" }}
                          >
                            {title}
                            {/* <TableSortLabel direction={"asc"}>{title}</TableSortLabel> */}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow className={classes.tableHeader} key={row[0]}>
                      {checkBoxes && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={handleChangeCheckbox}
                            checked={checkedState.includes(
                              type + "" + String(row[0])
                            )}
                            name={type + "" + String(row[0])}
                          />
                        </TableCell>
                      )}
                      {showMenuOptions && (
                        <TableCell style={{ padding: "15px !important" }}>
                          <MenuOptions
                            typeURL={typeURL}
                            userInfo={row}
                            menuOptions={menuOptions}
                            getUserDetails={getUserDetails}
                          />
                        </TableCell>
                      )}
                      {showEye && (
                        <TableCell
                          style={{ padding: "15px !important" }}
                          onClick={() => onRowClick(row[3])}
                        >
                          <Button>
                            <RemoveRedEyeRoundedIcon
                              style={{ fontSize: 22, color: "#808080" }}
                            />
                          </Button>
                        </TableCell>
                      )}
                      {row.map((cell) => (
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                          style={{ padding: "15px !important" }}
                        >
                          {cell === "open" ? (
                            <span className={classes.open}>{cell}</span>
                          ) : cell === "closed" ? (
                            <span className={classes.closed}>{cell}</span>
                          ) : cell === "Active" || cell === "Approved" ? (
                            <span style={{ color: "#1EC93A" }}>{cell}</span>
                          ) : cell === "On Hold" ? (
                            <span style={{ color: "#C5B1FF" }}>{cell}</span>
                          ) : (
                            cell
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {showPagination && (
              <TableFooter
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <TablePagination
                  style={{
                    background: "#343434",
                    border: "2px solid  #C5B1FF",
                    borderRadius: 10,
                    maxWidth: 500,
                    padding: "5px 10px",
                    margin: 10,
                    marginRight: 0,
                  }}
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableFooter>
            )}
            {/* <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Grid
              style={{
                background: "#343434",
                border: "2px solid  #C5B1FF",
                borderRadius: 10,
                maxWidth: 250,
                padding: "5px 10px",
                margin: 10,
                marginRight: 0,
              }}
            >
              <Grid
                container
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item>
                  {" "}
                  <span style={{ color: "#FFF", fontSize: 13 }}>
                    {" "}
                    25 of 200
                  </span>
                </Grid>
                <Button>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24"
                      height="24"
                      transform="translate(0 0.5)"
                      fill="#C5B1FF"
                    />
                    <path
                      d="M13.293 6.79303L7.58597 12.5L13.293 18.207L14.707 16.793L10.414 12.5L14.707 8.20703L13.293 6.79303Z"
                      fill="white"
                    />
                  </svg>
                </Button>
                <Button>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24"
                      height="24"
                      transform="translate(0 0.5)"
                      fill="#C5B1FF"
                    />
                    <path
                      d="M10.707 18.207L16.414 12.5L10.707 6.79297L9.29303 8.20697L13.586 12.5L9.29303 16.793L10.707 18.207Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </Grid>
            </Grid>
          </Grid> */}
          </>
        ) : (
          <>
            <div className={classes.noData}>
              <img src={NoData} height={300} width={"100%"} alt="" />
              <p
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  margin: 8,
                  marginTop: 18,
                }}
              >
                No Data
              </p>
            </div>
          </>
        )}
      </Grid>
      {isPayBulkSelected && (
        <ConfirmationModal
          confirmationHeading={"Bulk Pay"}
          confirmationMessage={
            "Are you sure you want to mark all users in current and previous cutoff as paid ?"
          }
          open={open}
          handleOnClickTitle={"Pay"}
          handleOnClick={bulkPayClick}
          handleClose={handleCloseModal}
        />
      )}
      {isSelectedPaySelected && (
        <ConfirmationModal
          confirmationHeading={"Selected Pay"}
          confirmationMessage={
            "Are you sure you want to mark selected users in current and previous cutoff as paid ?"
          }
          open={open}
          handleOnClickTitle={"Pay" + type}
          handleOnClick={selectedPayClick}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default withStyles(styles)(CustomTable);
