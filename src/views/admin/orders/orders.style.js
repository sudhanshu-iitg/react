const styles = {
  outerContainer: {
    paddingTop: "3%",
    paddingBottom: "3%",
    minHeight: "100vh",
    height: "auto",
    "@media(max-width: 600px)": {
      padding: "15% 0%",
    },
  },

  tableContainer: {
    padding: "3%",
    borderRadius: 15,
    position: "sticky",
    top: 200,
  },
  tabContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflowX: "scroll",
  },
  areaGraph: {
    background: "rgba(197, 177, 255, 0.02)",
    boxShadow: "4px 20px 50px rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    width: "90%",
    margin: "0 auto",
    marginTop: "5%",
  },
  chartTitle: {
    color: "#CCC",
    fontSize: 24,
    padding: "32px 32px 12px 32px",
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
