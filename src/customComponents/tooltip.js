import React from "react";
import { Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = {
  tooltip: {
    maxWidth: "320px",
    boxShadow: "12px 24px 60px rgba(0, 0, 0, 0.4)",
    background: "#282828",
    borderRadius: "10px",
    fontStyle: "normal",
    lineHeight: "20px",
    textAlign: "left",
    padding: "24px 28px",
    border: "2px solid #E9C547",
  },
};

const CustomTooltip = withStyles(styles)(Tooltip);
CustomTooltip.defaultProps = {
  placement: "bottom-end",
  enterTouchDelay: "50",
};

export default CustomTooltip;
