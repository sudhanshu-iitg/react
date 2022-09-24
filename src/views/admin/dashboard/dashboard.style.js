const styles = {
  outerContainer: {
    padding: "3% 10%",
    overflowY: "scroll",
    minHeight: "100vh",
    "@media(max-width: 600px)": {
      padding: "15% 5%",
    },
  },
  spinnerContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
      gridTemplateColumns: "repeat(2,1fr)",
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
};

export default styles;
