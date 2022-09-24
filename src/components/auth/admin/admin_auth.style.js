const styles = {
  outerLogin: {
    height: "100vh",
    width: "100%",
    display: "flex",
    background: "#292929",
    minHeight: "100vh",
  },
  leftSection: {
    height: "100vh",
    width: "50%",
    padding: 10,
    display: "flex",
    alignItems: "center",
    background: "rgba(222, 159, 76, 0.1)",
    "@media(max-width : 1000px)": {
      display: "none",
    },
  },
  formBox: {
    width: "100%",
    padding: 35,
    justifyContent: "center",
    position: "relative",
  },
  heading: {
    color: "#E9C547",
    fontSize: 50,
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
  },
  emailVerified: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    width: "90%",
  },
  forgotPassword: {
    background: "rgba(222, 159, 76, 0.1)",
    borderRadius: "20px",
    padding: "10px 40px",
    color: "#FFF",
  },
};

export default styles;
