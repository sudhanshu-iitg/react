import React from "react";
import { withStyles } from "@mui/styles";
import { Button, Typography, CircularProgress } from "@mui/material";

const styles = (theme) => ({
  btnCss: {
    borderRadius: 2,
    fontFamily: "Oxygen",
    color: "#000",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "40px",
    boxShadow: "unset",
    height: 36,
    margin: 0,
    TextTransform: "uppercase",
  },
  mobileBtn: {
    "@media(max-width: 600px)": {
      display: "none",
    },
  },
  cancel: {
    background: "#FFFFFF",
    border: "1px solid #DDE5EC",
    boxSizing: "border-box",
    borderRadius: 8,
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "20px",
    color: "#536471",
    marginLeft: 8,
    marginRight: 16,
  },
  bgNone: {
    background: "none",
    color: "#536471",
    padding: "0px 0px",
    lineHeight: "auto",
    borderRadius: 2,
  },
  deleteBtn: {
    height: "36px",
    width: "36px",
    minWidth: "36px",
    background: "#F0F4FA",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  redDelete: {
    background: "#F84343",
    borderRadius: 8,
  },
  btnLabel: {
    pointerEvents: "none",
  },
});

class CustomButton extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Button
        disabled={this.props.loading}
        variant={this.props.variant}
        className={[classes.btnCss, classes[this.props.type]].join(" ")}
        classes={{
          label: classes.btnLabel,
        }}
        onClick={this.props.onClick}
        style={this.props.style}
        startIcon={this.props.startIcon}
        endIcon={this.props.endIcon}
        id={this.props.id}
      >
        {this.props.btnIcon && (
          <img
            src={this.props.btnIcon}
            alt="filter"
            style={{ marginRight: this.props.margin ? this.props.margin : 0 }}
          />
        )}
        {this.props.hideText ? (
          <Typography className={classes.mobileBtn}>
            {this.props.text}
          </Typography>
        ) : (
          <Typography>{this.props.text}</Typography>
        )}
        <span style={{ marginLeft: 10, marginTop: 5 }}>
          {" "}
          {this.props.loading && (
            <CircularProgress
              size={15}
              style={{
                color: "#FFF",
              }}
            />
          )}
        </span>
      </Button>
    );
  }
}

CustomButton.defaultProps = {
  variant: "contained",
  type: "action",
  disabled: false,
  btnIcon: false,
  marginRight: 8,
};

export default withStyles(styles)(CustomButton);
