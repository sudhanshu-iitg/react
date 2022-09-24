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
    width: "100%",
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
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#434343",
    padding: 20,
    overflow: "scroll",
    height: "55vh",
    "@media(max-width: 780px)": {
      width: "75%",
    },
  },
};

export default styles;
