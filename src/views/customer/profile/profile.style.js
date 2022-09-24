const styles = {
  outerContainer: {
    paddingTop: "3%",
    minHeight: "100vh",
    paddingBottom: "3%",
    height: "auto",
    "@media(max-width: 600px)": {
      padding: "15% 0%",
    },
  },

  tableContainer: {
    padding: "5%",
    borderRadius: 15,
    "@media(max-width: 600px)": {
      padding: "0%",
    },
  },
  tabContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflowX: "scroll",
    "@media(max-width: 600px)": {
      width: "100%",
      marginBottom: 20,
    },
  },
  personalDetailsContainer: {
    width: "90%",
    margin: "0 auto",
    padding: 10,
    borderRadius: 20,
    boxShadow: "4px 24px 60px rgba(0, 0, 0, 0.4)",
    border: "3px solid #474747",
    "@media(max-width: 600px)": {
      paddingTop: 10,
      width: "100%",
    },
  },
  passwordDetailsContainer: {
    background: "none",
    padding: 32,
    borderRadius: 20,
    boxShadow: "4px 24px 60px rgba(0, 0, 0, 0.4)",
    border: "3px solid #474747",
    "@media(max-width: 600px)": {
      padding: 15,
    },
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    marginBottom: 20,
    "@media(max-width: 600px)": {
      fontSize: 14,
    },
  },
};

export default styles;
