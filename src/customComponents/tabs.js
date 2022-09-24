import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = () => ({
  tabLabel: {
    color: "#CCC",
    fontSize: 16,
    margin: "auto 0px",
    padding: "auto 10px",
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: "capitalize",
    borderBottom: "2px solid #787878",
  },
  indicator: {
    color: "#FFE660",
    fontWeight: 700,
  },
  root: {
    justifyContent: "center !important",
  },
  scroller: {
    flexGrow: "0",
  },
});

const BasicTabs = ({ labels, tabChange, value, classes }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          value={value}
          onChange={(e, newVal) => tabChange(e, newVal)}
          aria-label="basic tabs example"
          indicatorColor={"#FFE660"}
          sx={{ justifyContent: "center !important" }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FFE660",
              color: "#FFE660",
              fontWeight: 700,
            },
          }}
        >
          {labels.map((label) => (
            <Tab label={label} className={classes.tabLabel} key={label} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(BasicTabs);
