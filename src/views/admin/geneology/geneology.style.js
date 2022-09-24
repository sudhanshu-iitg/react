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
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#282828",
    overflow: "scroll",
    maxHeight: "30vh",
    height: "auto",
    "@media(max-width: 780px)": {
      width: "85%",
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
    },
  },
  searchBar: {
    margin: "3% auto !important",
    "@media(max-width: 600px)": {
      width: "90%",
    },
  },
  legendContainer: {
    background: "rgba(146, 146, 146, 0.1)",
    padding: "24px 60px",
    borderRadius: 15,
    width: "70%  !important",
    margin: "0 auto",
    boxShadow: "4px 24px 60px rgba(0, 0, 0, 0.25)",
    justifyContent: "space-evenly",
    "@media(max-width: 600px)": {
      width: "90% !important",
      padding: "14px 50px",
    },
  },
  activeUser: {
    background: "#E9C547",
    height: 57,
    width: 57,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeUserText: {
    fontSize: 16,
    color: "#1EC93A",
    margin: 5,
  },

  pendingKycUser: {
    background: "rgba(214, 154, 83, 0.2)",
    height: 57,
    width: 57,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  pendingKycText: {
    fontSize: 16,
    color: "#D69A53",

    margin: 5,
  },
  freeUser: {
    background: " rgba(197, 177, 255, 0.2)",
    height: 57,
    width: 57,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  freeUserText: {
    fontSize: 16,
    color: "#C5B1FF",
    margin: 5,
  },

  blockedUser: {
    background: "rgba(231, 90, 90, 0.2)",
    height: 57,
    width: 57,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blockedUserText: {
    fontSize: 16,
    color: "#E75A5A",
    margin: 5,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width: 600px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 15,
    },
  },
  geneologyContainer: {
    background: "rgba(146, 146, 146, 0.1)",
    padding: "24px 40px  !important",
    borderRadius: 15,
    width: "96% !important",
    margin: "5% auto !important",
    boxShadow: "4px 24px 60px rgba(0, 0, 0, 0.25)",
  },
  dttClass: {
    color: "#fff",
    padding: "6px 10px",
    borderRight: "2px solid #fff",
    "@media(max-width: 600px)": {
      borderRight: "none",
      flexDirection: "column",
    },
  },
  treeContainer: {
    display: "flex !important",
    alignItems: "center  !important",
    margin: "20px auto  !important",
    justifyContent: "left  !important",
    width: "100%  !important",
  },
  subtree: {
    display: "flex  !important",
    flexDirection: "column  !important",
  },
  baselineAnimation: {
    height: 0,
    width: 1,
    borderBottom: "2px solid #C5C5C5",

    WebkitAnimation: "$increaseW 3s  !important",
    MozAnimation: "$increaseW 3s  !important",
    OAnimation: "$increaseW 3s  !important",
    animation: "$increaseW 3s  !important",
    animationFillMode: "forwards  !important",
  },
  toplineAnimation: {
    height: 84,
    width: 0,
    borderLeft: "2px solid #C5C5C5",

    // WebkitAnimation: "$increaseHeight 3s",
    // MozAnimation: "$increaseHeight 3s",
    // OAnimation: "$increaseHeight 3s",
    // animation: "$increaseHeight 3s",
    // animationFillMode: "forwards",
  },
  arrowUp: {
    height: 0,
    width: 1,
    borderBottom: "2px solid #C5C5C5",
    marginBottom: "40px  !important",
    WebkitAnimation: "$increase 3s",
    MozAnimation: "$increase 3s",
    OAnimation: "$increase 3s",
    animation: "$increase 3s",
    animationFillMode: "forwards",
  },
  arrowBottom: {
    height: 0,
    width: 1,
    borderBottom: "2px solid #C5C5C5",
    marginTop: "40px  !important",
    WebkitAnimation: "$increase 3s",
    MozAnimation: "$increase 3s",
    OAnimation: "$increase 3s",
    animation: "$increase 3s",
    animationFillMode: "forwards",
  },

  "@keyframes increase": {
    "100%": {
      width: "100%",
    },
  },
  "@keyframes increaseW": {
    "100%": {
      width: "50%",
    },
  },
  "@keyframes increaseHeight": {
    "100%": {
      height: 80,
    },
  },
};

export default styles;
