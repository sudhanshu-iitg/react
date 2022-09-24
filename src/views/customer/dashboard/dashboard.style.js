const styles = {
  outerContainer: {
    padding: "3% 10%",
    overflowY: "scroll",
    height: "100vh",
    "@media(max-width: 600px)": {
      padding: "15% 5%",
    },
  },
  cardList: {
    display: "grid",

    gridGap: "40px",

    "@media(min-width: 768px)": {
      gridTemplateColumns: "repeat(2,1fr)",
    },
    "@media(min-width: 960px)": {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    "@media(min-width: 1200px)": {
      gridTemplateColumns: "repeat(3,1fr)",
    },
  },
  listContainer: {
    display: "grid",

    gridGap: "20px",
    "@media(min-width: 960px)": {
      gridTemplateColumns: "repeat(1,1fr)",
    },
    "@media(min-width: 1200px)": {
      gridTemplateColumns: "repeat(3,1fr)",
    },

    margin: "50px auto",
  },
  chartContainer: {
    padding: 10,
    border: "3px solid rgba(197, 177, 255, 0.5)",
    borderRadius: 15,
    width: "100%",
    overflowX: "scroll",
  },
  modalBox: {
    padding: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
    borderRadius: 10,
    width: "60%",
    background: "#282828",
    overflow: "auto",
    height: "50%",
    "@media(max-width: 780px)": {
      width: "85%",
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
  modalSubtitle: {
    color: "#fff",
    "@media(max-width : 690px)": {
      fontSize: 10,
      textAlign: "center",
    },
  },
};

export default styles;
