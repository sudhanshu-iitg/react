import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import styles from "./customer_register.style";
import CustomTextField from "../../../customComponents/textfield";
import { withStyles } from "@mui/styles";

import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";

const SponsorDetails = ({ classes, goToNext }) => {
  const [sponsorId, setSponsorId] = useState(null);
  const [sponsorName, setSponsorName] = useState(null);

  const getSponsorDetails = async () => {
    let str = window.location.href;
    let n = str.lastIndexOf("/");
    var result = str.substring(n + 1);

    let sponsorDetails = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.SPONSORDETAILS + result,
    });
    setSponsorId(sponsorDetails?.response?.sponsor_id);
    setSponsorName(sponsorDetails?.response?.sponsor_name);
  };

  useEffect(() => {
    getSponsorDetails();
  }, []);

  return (
    <Grid className={classes.containerClass} style={{ paddingBottom: 0 }}>
      <Grid className={classes.arrow} style={{ marginBottom: 0 }}>
        {" "}
      </Grid>
      <div
        style={{
          margin: "30px auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          className={classes.personalDetailsButton}
          style={{
            background: "rgba(233, 197, 71, 0.1)",
            color: "#E9C547",
          }}
        >
          SPONSOR DETAILS
        </span>
      </div>
      <Grid style={{ width: "90%", margin: "20px auto" }}>
        <Grid>
          <CustomTextField
            fullWidth={true}
            label="Sponsor ID"
            type="text"
            autoComplete="off"
            autoFocus
            BoxHeight="18px"
            value={sponsorId}
            placeholder={sponsorId}
            noPointerEvents={true}
          />
        </Grid>
      </Grid>

      <Grid style={{ width: "90%", margin: "20px auto" }}>
        <Grid>
          <CustomTextField
            fullWidth={true}
            label="Sponsor Name"
            type="text"
            autoComplete="off"
            autoFocus
            BoxHeight="18px"
            value={sponsorName}
            placeholder={sponsorName}
            noPointerEvents={true}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SponsorDetails);
