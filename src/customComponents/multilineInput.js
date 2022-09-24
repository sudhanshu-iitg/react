import React from "react";
import { withStyles } from "@mui/styles";
import {
  FormLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Grid,
} from "@mui/material";

const styles = () => ({
  formLabel: {
    fontSize: 12,
    color: "#787878",
    display: "block",
    marginBottom: 4,
  },
  outlineInput: {
    paddingRight: 8,
    width: "100%",
    zIndex: 0,
    fontSize: 16,

    fontWeight: 400,
    backgroundColor: "transperant",
    color: "#787878",
  },
});

class MultilinedInput extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid style={{ height: this.props.height }}>
          {this.props.label && (
            <FormLabel
              className={classes.formLabel}
              style={{
                color: "#FFF",
                fontWeight: 700,
                fontSize: 15,
                marginBottom: 3,
                marginTop: 25,
              }}
            >
              {this.props.label}
              {this.props.isRequired && <span> {""}*</span>}
            </FormLabel>
          )}

          <FormControl fullWidth={this.props.fullWidth} variant="outlined">
            <OutlinedInput
              multiline={this.props.multiline}
              minRows={this.props.minRows}
              maxRows={this.props.maxRows}
              endAdornment={
                <InputAdornment
                  position="end"
                  onClick={(e) => this.props.clickIcon(e)}
                >
                  {this.props.endIcon}
                </InputAdornment>
              }
              // defauvalue={this.props.value}
              disabled={this.props.disabled}
              onFocus={(e) => this.props.onFocus(e)}
              type={this.props.type}
              defaultValue={this.props.value}
              placeholder={this.props.placeholder}
              onChange={(e) => this.props.handleChange(e)}
              onBlur={this.props.onBlur}
              className={classes.outlineInput}
              style={
                this.props.noPointerEvents
                  ? {
                      color: "#fff",
                      border: "1px solid #787878",
                      fontSize: 15,
                      pointerEvents: "none",
                    }
                  : {
                      color: "#fff",
                      border: "1px solid #787878",
                      fontSize: 14,
                    }
              }
            />{" "}
          </FormControl>
          <p style={{ color: "#E75A5A", marginLeft: 4, marginTop: 5 }}>
            {this.props.error ? this.props.error : ""}
          </p>
        </Grid>
      </>
    );
  }
}

MultilinedInput.defaultProps = {
  type: "string",
  onFocus: () => {},
  clickIcon: () => {},
  BoxHeight: 16,
  fullWidth: true,
  error: "",
  height: 140,
};

export default withStyles(styles)(MultilinedInput);
