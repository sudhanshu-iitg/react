const styles = {
  outerContainer: {
    paddingTop: "3%",
    paddingBottom: "3%",
    height: "auto",
    minHeight: "100vh",
    "@media(max-width: 600px)": {
      padding: "15% 0%",
    },
  },

  tableContainer: {
    padding: "5%",
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
};

export default styles;
