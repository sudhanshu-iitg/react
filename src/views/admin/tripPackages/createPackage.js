import React from "react";
import { withStyles } from "@mui/styles";
import { Grid, Typography, Divider } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DetailsTable from "../../../customComponents/detailsTable";
const styles = () => ({
  cardContainer: {
    padding: "20px 15px",
    height: "auto",
    borderRadius: 15,
    position: "relative",
    border: "2px solid rgba(255, 230, 99, 0.5)",
    width: "100%",
  },

  titleTypography: {
    fontWeight: 700,
    color: "#FFF",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontStyle: "normal",
    padding: 10,
    borderBottom: "1px solid #DBDBDB",
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    marginBottom: 20,
  },
  personaDetails: {
    margin: "40px 5px",
  },
  rankContainer: {
    background: "#ffe660",
    borderRadius: 10,
    margin: "5px",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  rankTypography: {
    fontWeight: 700,
    fontSize: 20,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #DBDBDB",
  },

  detailValue: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
  },
});

const UserDetails = ({ classes, goBack }) => {
  const personalDetails = [
    {
      title: "Name",
      value: "Shiva K",
    },
    {
      title: "Email ID",
      value: "shivak@gmail.com",
    },
    {
      title: "Phone Number",
      value: "+(91)3523324234",
    },
    {
      title: "Address",
      value: "204, Some test Appt, Chandralyout, Nagarbhavi",
    },
    {
      title: "City",
      value: "Bengaluru",
    },
    {
      title: "Pin Code",
      value: "560072",
    },
    {
      title: "State",
      value: "Karnataka",
    },
    {
      title: "Country",
      value: "India",
    },
    {
      title: "Nominee Name",
      value: "Ronold Anthony",
    },
    {
      title: "Nominee Age",
      value: "78",
    },
    {
      title: "Relationship with Nominee",
      value: "Sibling",
    },
    {
      title: "Date of Joining",
      value: "22/04/2021",
    },
    {
      title: "Date of Activation",
      value: "22/06/2021",
    },
  ];

  const kycDetails = [
    {
      title: "Aadhar Number",
      value: "787845452121",
    },
    {
      title: "PAN Details ",
      value: "AB78GF980976",
    },
    {
      title: "Application Details",
      value: "",
    },
    {
      title: "Selfie Picture",
      value: "",
    },
    {
      title: "Bank Name",
      value: "HDFC Bank",
    },
    {
      title: "Bank Account Number",
      value: "45786932142",
    },
    {
      title: "Bank IFSC Code",
      value: "HDFC2121457",
    },
    {
      title: "Bank Branch",
      value: "Chandralayout branch",
    },
  ];

  const tableHeader1 = ["Date", "Matched BV", "Amount"];
  const tableContent1 = [
    {
      date: "30-12-2021 12:59 PM",
      bv: "6000",
      amt: "1800.00",
    },
    {
      date: "27-12-2021 6:30 PM",
      bv: "6000",
      amt: "1800.00",
    },
    {
      date: "15-11-2021 9:45 PM",
      bv: "3000",
      amt: "3800.00",
    },
  ];
  return (
    <>
      <Grid className={classes.cardContainer}>
        <Typography className={classes.titleTypography}>
          <span style={{ marginTop: 5, marginRight: 15 }}>
            <KeyboardBackspaceRoundedIcon
              style={{ fontSize: 35 }}
              className={classes.backIcon}
              onClick={() => goBack()}
            />
          </span>
          Shiva K
        </Typography>

        <Grid className={classes.personaDetails}>
          <Typography className={classes.title}>INCOME DETAILS</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(UserDetails);
