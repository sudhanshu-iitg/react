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

  stickyButton: {
    position: "sticky",
    bottom: 0,
    background: "#494949",
    borderTop: "1px solid #D0D0D0",
    padding: 20,
    justifyContent: "right",
    "@media(max-width: 600px)": {
      justifyContent: "center",
    },
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    borderRadius: 10,
    background: "#494949",
    overflow: "scroll",
    maxHeight: "90vh",
    zIndex: 3000,
    "@media(max-width: 768px)": {
      width: "100%",
    },
  },
  textFieldContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridGap: 30,
    height: "auto",
    padding: 20,

    "@media(max-width: 768px)": {
      gridTemplateColumns: "repeat(1,1fr)",
      gridGap: 30,
    },
  },
  marginTp: {
    marginTop: 20,
    "@media(max-width: 768px)": {
      marginTop: 0,
    },
  },

  personaDetails: {
    margin: "40px 5px",
    border: "3px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    width: "70%",
    padding: 15,
    margin: "50px auto",
    "@media(max-width: 600px)": {
      marginTop: "25px",
      width: "100%",
      padding: 5,
    },
  },

  detailValue: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    width: "40%",
    "@media(max-width: 600px)": {
      padding: 8,
      paddingLeft: 10,
      width: "80%",
    },
  },
  detailsRow: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    width: "95%",
    margin: "0 auto",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      marginBottom: 10,
      padding: 10,
    },
  },
  dropdownContainer: {
    width: "94%",
    margin: "20px auto",
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
    alignItems: "center",
    width: "100%",
    overflowX: "scroll",
    "@media(max-width: 600px)": {
      width: "100%",
      marginBottom: 20,
    },
  },
  personalDetailsContainer: {
    background: "#343434",
    padding: 32,
    borderRadius: 15,
    boxShadow: "4px 24px 60px rgba(0, 0, 0, 0.4)",
    border: "3px solid #474747",
    "@media(max-width: 600px)": {
      padding: 10,
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
  selectedPackageCard: {
    background: " linear-gradient(258.51deg, #E9C547 -62.73%, #664FA7 109.29%)",
    padding: 16,
    maxWidth: 250,
    borderRadius: 10,
    color: "#fff",
    position: "relative",

    margin: "60px 0px 20px 0px",
  },

  packageCard: {
    padding: 16,
    borderRadius: 10,
    minWidth: 250,
    color: "#fff",
    position: "relative",
    border: "2px solid #C5B1FF",
    margin: "60px 30px 20px 0px",
  },
  cardSlider: {
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
  },
  starIcon: {
    padding: 8,
    height: 16,
    width: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "150%",
    position: "absolute",
    top: 16,
    right: 16,
  },
  upgradeBtn: {
    background: "#C5B1FF  !important",
    padding: "8px 20px  !important",
    borderRadius: "28px  !important",
    color: "#434343  !important",
    "&:hover": {
      background: "#C5B1FF  !important",
    },
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    paddingRight: "10px",
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    "@media(max-width: 600px)": {
      fontSize: 14,
    },
  },
  paymentBox: {
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
    height: "auto",
    "@media(max-width: 780px)": {
      width: "85%",
    },
  },
};

export default styles;
