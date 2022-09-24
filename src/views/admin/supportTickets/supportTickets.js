import React, { useState } from "react";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import Tabs from "../../../customComponents/tabs";
import styles from "./supportTickets.style";
import * as XLSX from "xlsx";

const tableHeader = [
  "",
  "#",
  "Date",
  "User ID",
  "User Name",
  "Subject",
  "Status",
];

const tableContent = [
  {
    number: 1,
    date: "22/10/2022",
    userid: 1242213,
    email: "shiva",
    subject: "late reply",
    status: "open",
  },
  {
    number: 2,
    date: "22/10/2022",
    userid: 1242213,
    email: "shiva",
    subject: "late reply",
    status: "closed",
  },
  {
    number: 3,
    date: "22/10/2022",
    userid: 1242213,
    email: "shiva",
    subject: "late reply",
    status: "open",
  },
  {
    number: 4,
    date: "22/10/2022",
    userid: 1242213,
    email: "shiva",
    subject: "late reply",
    status: "open",
  },
  {
    number: 5,
    date: "22/10/2022",
    userid: 1242213,
    email: "shiva",
    subject: "late reply",
    status: "closed",
  },
];
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

const SupportTickets = ({ classes }) => {
  return (
    <>
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tableContainer}>
          <Table
            header={tableHeader}
            data={tableContent}
            title={"Tickets raised by users"}
            noFilter={true}
            menuOptions={["Approve / complete Trip", "Keep on hold"]}
            showMenuOptions={true}
            exportExcel={true}
            exportToExcelClick={() =>
              exportToExcel(tableContent, "users-tickets")
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(SupportTickets);
