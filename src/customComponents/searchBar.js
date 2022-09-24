import React, { useEffect } from "react";
import {
  IconButton,
  Grid,
  InputBase,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  outerSearch: {
    width: "300px",
    height: "35px",
    margin: "0 12px",
    background: "#FFFFFF",
    border: "1px solid #DDE5EC",
    borderRadius: "8px",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    marginRight: 5,
    marginLeft: "10px",
    width: "10px",
    height: "16px",
    color: "#A8B9C6",
    alignSelf: "center",
    marginTop: 5,
  },
  inputBase: {
    background: "#000",
    color: "#fff",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    border: "none",
    padding: "8px",
    width: "83%",
    paddingBottom: "3px",
  },
  searchByInput: {
    fontStyle: "normal",
    fontWeight: 500,
    color: "#CCC",
    fontSize: "16px",
    width: 200,
    background: "#434343",
  },
  formControlClass: {
    width: 200,
    marginTop: -15,
    marginRight: 15,
  },
});

const searchBar = (props) => {
  const { classes } = props;
  return (
    <Grid container>
      <Grid item>
        <FormControl variant="standard" fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            classes={{
              root: classes.searchByInput,
            }}
          >
            Search By
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.searchBy}
            label="Search By"
            classes={{
              root: classes.searchByInput,
            }}
            onChange={(e) => props.setSearchBy(e.target.value)}
          >
            {props.menuItems &&
              props.menuItems.map((item) => (
                <MenuItem
                  value={item}
                  classes={{
                    root: classes.searchByInput,
                  }}
                >
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      {props.searchBy && (
        <Grid item className={classes.outerSearch}>
          <IconButton
            disabled
            type="submit"
            aria-label="search"
            size="small"
            variant="text"
            className={classes.iconBtn}
          >
            <span>
              <SearchRoundedIcon />
            </span>
          </IconButton>
          <InputBase
            value={props.keyword}
            classes={{
              root: classes.inputBase,
            }}
            name="input"
            onChange={(e) => props.setKeyword(e.target.value)}
            placeholder={`Search ${props.searchBy}`}
          />
          {props.keyword !== null && props.keyword !== "" && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                props.setKeyword("");
              }}
              style={{ padding: 8, outline: "none" }}
            >
              <CloseRoundedIcon />
            </IconButton>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles)(searchBar);
