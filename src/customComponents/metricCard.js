import React from "react";
import { withStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid, Typography } from "@mui/material";

const styles = () => ({
  cardContainer: {
    padding: "20px 15px",
    paddingBottom: 5,
    height: "auto",
    borderRadius: 15,
    position: "relative",
    background:
      "linear-gradient(249.58deg, #FFE65E -45.16%, rgba(231, 195, 69, 0) 89.77%);",
  },

  amountTypography: {
    fontWeight: 700,
    color: "#fff",
    fontSize: 35,
    lineHeight: 2,
    fontStyle: "normal",
    letterSpacing: 1,
  },

  titleTypography: {
    fontWeight: 700,
    color: "#C1C1C1",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontStyle: "normal",
  },
  positionLeft: {
    position: "absolute",
    right: 0,
    bottom: -5,
  },
});

class MetricCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid className={classes.cardContainer} style={this.props.style}>
          <Typography className={classes.titleTypography}>
            {this.props.title}{" "}
            <Grid style={{ marginTop: 7, marginLeft: 4 }}>
              <ArrowForwardIcon sx={{ mr: 2 }} />
            </Grid>
          </Typography>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={classes.amountTypography}
              style={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 35,
                lineHeight: 2,
                fontStyle: "normal",
                letterSpacing: 1,
              }}
            >
              <span style={{ fontSize: 23 }}>{this.props.currency}</span>
              {this.props.amount}
            </Typography>
            <img src={this.props.icon} alt="icon" />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(MetricCard);
