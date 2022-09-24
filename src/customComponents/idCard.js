import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Modal, Box, Button } from "@mui/material";
import { allRequestHandler } from "../api/index";
import { URLS } from "../constants/index";
import Logo from "../assets/logo.png";
import moment from "moment";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { withStyles } from "@mui/styles";

const styles = () => ({
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#434343",
    overflow: "scroll",
    height: "auto",
    "@media(max-width: 780px)": {
      width: "95%",
    },
  },
});
const UserIdCardModal = ({ name, showIdCard, setShowIdCard, classes }) => {
  const [userDetails, setUserDetails] = useState();
  const componentRef = useRef();

  const getUserDetails = async () => {
    let userDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.USERPRF,
      requestData: {
        username: name,
      },
    });
    if (userDetails) {
      setUserDetails(userDetails);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Modal
      open={showIdCard}
      onClose={() => setShowIdCard(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalBox}>
        <Grid style={{ padding: 10, background: "#434343" }}>
          <ReactToPrint
            trigger={() => (
              <Button
                style={{
                  borderRadius: 2,
                  fontFamily: "Oxygen",
                  color: "#E9C547",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: "40px",
                  boxShadow: "unset",
                  height: 36,
                  margin: 0,
                  TextTransform: "uppercase",
                }}
              >
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Grid>

        <Grid style={{ display: "flex" }} ref={componentRef}>
          <Grid
            style={{
              width: "100%",
              height: "auto",
              border: "2px solid #E9C547",
            }}
          >
            <Grid
              style={{
                height: "70%",
                display: "flex",
                "align-items": "center",
                flexDirection: "column",
                background: "#292929",
              }}
            >
              <Grid>
                <img src={Logo} height={100} width={100} alt={"logo"} />
              </Grid>

              <Typography
                style={{
                  "font-family": "Times New Roman, Times, serif",
                  color: "White",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                RIPSHIP
              </Typography>

              <Typography
                style={{
                  "font-family": "Times New Roman, Times, serif",
                  color: "White",
                  fontWeight: 500,
                  fontSize: 20,
                  marginBottom: "10px",
                }}
              >
                WORLD VENTURES
              </Typography>

              <Grid
                style={{
                  display: "block",
                  margin: "0 auto",
                  position: "relative",
                  background: "#E9C547",
                  "box-sizing": "border-box",
                  width: "100px",
                  height: "110px",
                  "clip-path":
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <Grid
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "96px",
                    height: "106px",
                    "clip-path":
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <img
                    src={userDetails?.user?.profile_picture?.[0]?.img}
                    alt="profile"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      "object-fit": "cover",
                      "clip-path":
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "White",
                    fontWeight: 500,
                    fontSize: 30,
                  }}
                >
                  {userDetails?.user?.first_name +
                    " " +
                    userDetails?.user?.last_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "30%",
                "background-color": "white",
                padding: "10px 10px",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 60px",
                }}
              >
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  Username :
                </Typography>
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {userDetails?.user?.username}
                </Typography>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 60px",
                }}
              >
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  Join Date :
                </Typography>
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {moment(userDetails?.user?.date_joined).format("YYYY-MM-DD")}
                </Typography>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 60px",
                }}
              >
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  Mobile :
                </Typography>
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {userDetails?.user?.mobile_number}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            style={{
              width: "100%",
              height: "auto",
              border: "2px solid #E9C547",
            }}
          >
            <Grid
              style={{
                display: "flex",
                "align-items": "center",
                flexDirection: "column",
                background: "#292929",
              }}
            >
              <img src={Logo} height={200} width={200} alt={"logo"} />
            </Grid>

            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                "align-items": "center",
                height: "auto",
                backgroundColor: "white",
              }}
            >
              <Grid style={{ marginTop: 10 }}>
                <QRCode
                  value={
                    userDetails?.user?.username
                      ? userDetails?.user?.username
                      : "Hello"
                  }
                  size={100}
                />
              </Grid>

              <Grid style={{ fontSize: 12 }}>
                <ul>
                  <li>
                    If this Id Card doesnot belong to you.Please Give it back to
                    this address mentioned below.
                  </li>
                  <li>
                    This card owner is an Independent Business Owner and he or
                    she is not an employee or agent working for remuneration in
                    the company.
                  </li>
                </ul>
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 60px",
                }}
              >
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  Phone :
                </Typography>
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {` +${userDetails?.user?.mobile_number}`}
                </Typography>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 60px",
                }}
              >
                <Typography
                  style={{
                    "font-family": "Times New Roman, Times, serif",
                    color: "black",
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {`${userDetails?.user?.address} ${userDetails?.user?.city} ${userDetails?.user?.state} ${userDetails?.user?.country}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(UserIdCardModal);
