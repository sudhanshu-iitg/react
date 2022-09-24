import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const styles = () => ({
  "MuiList-root-MuiMenu-list": {
    background: "#343434",
  },
  menuPaper: {
    background: "#343434",
    border: "2px solid #C5B1FF",
    color: "#FFF",
    margin: 0,
    borderRadius: 10,
  },
  menuItem: {
    width: "100%",
    fontWeight: 500,
    color: "#fff",
    fontSize: 14,

    "&:hover": {
      background: "rgba(197, 177, 255, 0.4)",
    },
    modalClass: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      borderRadius: 10,
      background: "#fff",
    },

    lists: {
      background: "#434343",
    },
    selectedList: {
      background: "yellow",
    },
  },
});
const BasicSelect = ({ classes, label, menuItems, handleSelectChange }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Typography
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#FFF",
          marginBottom: 3,
        }}
      >
        {label}
      </Typography>
      <FormControl
        sx={{ m: 1, width: "100%", height: 45 }}
        margin="dense"
        style={{
          border: "1px solid #787878",
          borderRadius: 4,
          margin: 0,
          color: "#787878",
        }}
      >
        <Select
          // value={item.id ? item.id : item}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={{
            getContentAnchorEl: null,
          }}
          IconComponent={KeyboardArrowDownIcon}
          classes={{ root: classes.menuPaper }}
          style={{
            color: "#787878",
            fontSize: 15,
            margin: 0,
            padding: 0,
            height: 45,
          }}
        >
          {menuItems.map((item) => {
            return (
              <MenuItem
                value={item.id ? item.id : item}
                className={classes.menuItem}
                key={item.id ? item.id : item}
              >
                <span style={{ color: "#fff" }}>
                  {item.name ? item.name : item}
                  {""} {item.item_id && `(${item.item_id})`}
                </span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default withStyles(styles)(BasicSelect);
