const styles = {
  outerLogin: {
    height: "100vh",
    width: "100%",
    display: "flex",
  },
  tab: {
    width: "100%",
    margin: "10px auto",
  },
  activeTab: {
    color: "#ccc",
    padding: "10px 30px",
    border: "1px solid #ccc",
    borderRadius: 4,
    margin: "10px !important",
    cursor: "pointer",
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    textAlign: "center",
    color: "#fff",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#282828",
    overflow: "scroll",
    height: "auto",
    "@media(max-width: 780px)": {
      width: "85%",
    },
  },
  desktopRegister: {
    display: "flex",
    overflow: "hidden",
    "@media(max-width : 780px)": {
      display: "none",
    },
  },
  containerClass: {
    width: "100vw",
    height: "auto",
    background: "#292929",
    paddingBottom: 30,
    "@media(min-width : 780px)": {
      display: "none",
    },
  },
  modalHeader: {
    position: "relative",
    background: "#282828",
    alignItems: "center",
    "@media(max-width : 1000px)": {
      justifyContent: "center",
      padding: 10,
    },
  },
  modalHeading: {
    color: "#E9C547",
    fontWeight: 700,
    fontSize: 25,
    "@media(max-width : 690px)": {
      fontSize: 15,
      textAlign: "center",
    },
  },
  // lastPage: {
  //   "@media(max-width : 690px)": {
  //     flexDirection: "column",
  //   },
  // },
  modalSubtitle: {
    color: "#fff",
    "@media(max-width : 690px)": {
      fontSize: 10,
      textAlign: "center",
    },
  },

  uploadBtn: {
    background: "#E9C547",
    color: "#000",
    padding: "0.5em 3em",
    textTransform: "uppercase",
    borderRadius: 4,
    fontSize: 15,
    cursor: "pointer",
  },
  logoContainer: {
    position: "absolute",
    top: "50px",
    display: "block",
    margin: "0 auto",
    width: "100%",
  },
  welcomeMsg: {
    padding: 24,
    height: "auto",
    with: "90%",
    background:
      " linear-gradient(248.23deg, #E9C547 -33.17%, rgba(233, 197, 71, 0) 110.19%)",
    color: "#fff",
    margin: 30,
    borderRadius: 15,
    textAlign: "center",
    lineHeight: "24.2px",
  },
  arrow: {
    display: "block",

    textAlign: "center",
  },
  sponsorDetailsButton: {
    padding: "1rem 3rem",
    color: "#E9C547",
    background: "rgba(233, 197, 71, 0.1)",
    fontSize: 16,
    borderRadius: 4,
    fontWeight: 700,
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#434343",
    padding: 20,
    overflow: "scroll",
    height: "80vh",
    "@media(max-width: 780px)": {
      width: "85%",
    },
  },
  personalFormBox: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    width: "100%",
    gridGap: 50,
  },
  personalDetailsButton: {
    padding: "1rem 3rem",
    color: "#C5B1FF",
    background: "rgba(197, 177, 255, 0.1)",
    fontSize: 16,
    borderRadius: 4,
    fontWeight: 700,
  },
  leftSection: {
    height: "100vh",
    width: "35%",
    background: "#E9C547",
    overflowY: "hidden",
    "@media(max-width : 780px)": {
      display: "none",
    },
  },
  subMobileSection: {
    "@media(min-width : 780px)": {
      display: "none",
    },
  },
  welcomeSection: {
    padding: "15% 10% 0px 10%",
  },
  welcome: {
    color: "#FFF",
  },
  welcomeTxt: {
    color: "#fff",
    lineHeight: "24px",
    marginBottom: 100,
  },
  sponsorDetails: {
    border: "2px solid #E9C547",
    borderRadius: 8,
    color: "#E9C547",
    padding: "20px 15px",
    "@media(max-width : 1000px)": {
      display: "none",
    },
  },
  sponsorTxt: {
    marginBottom: 20,
  },
  mobileSection: {
    "@media(min-width : 1000px)": {
      display: "none",
    },
  },

  mobileWelcomeSec: {
    padding: "15px",
    margin: 15,
  },
  formBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  emailVerified: {
    position: "absolute",
    top: "65%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    width: "45%",
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
