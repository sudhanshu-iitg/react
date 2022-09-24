import React from "react";
import { withStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const styles = () => ({
  cardContainer: {
    padding: "20px 0px",
    height: "auto",
    borderRadius: 15,
    position: "relative",
    border: "2px solid rgba(255, 230, 99, 0.5)",
    width: "100%",
  },

  titleTypography: {
    fontWeight: 700,
    color: "#E9C547",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontStyle: "normal",
    padding: "10px 25px",
    borderBottom: "1px solid #DBDBDB",
  },

  contentContainer: {
    padding: "10px 25px",
    borderBottom: "1px solid #DBDBDB",
  },
});

class List extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid className={classes.cardContainer} style={this.props.style}>
          <Typography className={classes.titleTypography}>
            {this.props.title}
          </Typography>
          <Grid>
            {this.props.listItems.map((item) => {
              return (
                <>
                  <Grid className={classes.contentContainer}>
                    <Typography>
                      <Grid style={{ color: "#DCDCDC", fontWeight: 700 }}>
                        {item.name} {":"}{" "}
                        <span style={{ color: this.props.color }}>
                          {item.value}
                        </span>
                      </Grid>
                    </Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(List);
