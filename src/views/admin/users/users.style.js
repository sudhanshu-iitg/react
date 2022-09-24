const styles = {
  outerContainer: {
    paddingTop: "3%",
    paddingBottom: "3%",
    minHeight: "100vh",
    overflowY: "scroll",
    height: "auto",
    "@media(max-width: 600px)": {
      padding: "16% 0%",
    },
  },
  spinnerContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  tableContainer: {
    padding: "5%",
    "@media(max-width: 600px)": {
      padding: "0.5%",
    },
    borderRadius: 15,
  },
  tabContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "50%",
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },
  areaGraph: {
    background: "rgba(197, 177, 255, 0.02)",
    boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    width: "90%",
    margin: "0 auto",
    marginTop: "5%",
    padding: 20,
  },
  chartTitle: {
    color: "#CCC",
    fontSize: 24,
    paddingBottom: 32,
    "@media(max-width: 600px)": {
      fontSize: 14,
      padding: 15,
    },
  },
  chartSubtitle: {
    color: "#C5B1FF",
    fontSize: 24,
    paddingLeft: 32,
    "@media(max-width: 600px)": {
      fontSize: 14,
      paddingLeft: 15,
    },
  },
};

export default styles;
