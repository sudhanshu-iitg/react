const styles = {
  outerContainer: {
    height: "auto",
    minHeight: "100vh",
    padding: "2%",
    "@media(max-width: 600px)": {
      padding: "15% 0%",
    },
  },

  tableContainer: {
    padding: "2%",
    borderRadius: 15,
  },
  tabContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  labelHolder: {
    // width: "100%",
    height: "50px",
    margin: "0em 3em 1em 3em",
    maxWidth: 200,

    display: "grid",
    placeItems: "left",
    "@media(max-width: 600px)": {
      placeItems: "center !important",
      margin: "1em !important",
    },
  },
  result: {
    minHeight: "100%",
    maxHeight: "auto",
    width: "100%",
    marginTop: "1rem",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "left",
    overflowX: "scroll",
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
  tripImg: {
    width: 320,
    height: 180,

    objectFit: "cover",
    padding: "0.75rem",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    borderRadius: 10,
    background: "#282828",
    overflow: "scroll",
    maxHeight: "90vh",
    zIndex: 3000,
    "@media(max-width: 768px)": {
      width: "100%",
    },
  },
  labelMr: {
    marginTop: "-10px !important",
    "@media(max-width: 768px)": {
      marginTop: "120px !important",
    },
  },
  textFieldContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridGap: 30,
    height: "100%",
    overflow: "scroll",

    padding: 40,

    "@media(max-width: 768px)": {
      gridTemplateColumns: "repeat(1,1fr)",
      gridGap: 30,
      padding: 20,
    },
  },
  marginTp: {
    marginTop: 20,
    "@media(max-width: 768px)": {
      marginTop: 0,
    },
  },
};

export default styles;
