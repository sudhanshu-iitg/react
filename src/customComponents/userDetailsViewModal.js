import React, { useEffect, useState } from "react";
import { Grid, Typography, Modal, Box } from "@mui/material";
import { Divider } from "@material-ui/core";
import { allRequestHandler } from "../api/index";
import { URLS } from "../constants/index";
import Logo from "../assets/logo.png";

const UserDetailsViewModal = ({ name, showPreview, setShowPreview }) => {
  const [userDetails, setUserDetails] = useState();

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

  const personalDetails = [
    {
      title: "First Name",
      value: userDetails?.user?.first_name,
    },
    {
      title: "Last Name",
      value: userDetails?.user?.last_name,
    },
    {
      title: "Email ID",
      value: userDetails?.user?.email,
    },
    {
      title: "Phone Number",
      value: userDetails?.user?.mobile_number,
    },
    {
      title: "Address",
      value: userDetails?.user?.address,
      view: false,
    },
    {
      title: "City",
      value: userDetails?.user?.city,
      view: false,
    },
    {
      title: "Pin Code",
      value: userDetails?.user?.pin_code,
    },
    {
      title: "State",
      value: userDetails?.user?.state,
    },
    {
      title: "Country",
      value: userDetails?.user?.country,
    },
    {
      title: "Nominee Name",
      value: userDetails?.user?.nominee_name,
    },
    {
      title: "Nominee Age",
      value: userDetails?.user?.nominee_age,
    },
    {
      title: "Aadhar Number",
      value: userDetails?.user?.aadhar_number,
    },

    {
      title: "PAN Details ",
      value: userDetails?.user?.pan_number,
    },
    {
      title: "Bank Name",
      value: userDetails?.bank_details?.bankname,
    },
    {
      title: "Bank Account Number",
      value: userDetails?.bank_details?.account_number,
    },
    {
      title: "Bank IFSC Code",
      value: userDetails?.bank_details?.ifsc,
    },
    {
      title: "Bank Branch",
      value: userDetails?.bank_details?.branch_name,
    },
  ];

  const agreement = [
    {
      p: `Every distributor registered in Ripship World Ventures Private Limited should compulsorily
carry ID card while presenting the business concept to the public. No distributor is entitled to
make fake promises and create f.`,
    },
    {
      p: `As an active distributor of Ripship World Ventures Private Limited I am aware that I am not
supposed to promote or involve my other business/professional activities in the events
conducted by and which are irrelevant to Ripship World Ventures Private Limited`,
    },

    {
      p: `Rispship World Ventures Distributors or Independent Distributors operating their own business
and or not employees/agents of Ripship World Ventures or its affiliated Companies`,
    },

    {
      p: `I agree that I am of age 18 years or above and hold a PAN Card with an assigned PAN number
according to the Government of India`,
    },
    {
      p: `The commissions/bonus/income to the distributor will be released by the company after
deduction of TDS (Tax Deducted at Source). The TDS will be deducted at the rate applicable from
time to time. In case if the PAN Number is not updated during registration the income will be held
until the PAN Card is uploaded`,
    },
    {
      p: `In case of any permanent disability or death of the registered active distributor, the future income
will be directed to the Assigned Nominee.`,
    },
    {
      p: `I am aware that as a distributor once I complete the video consent and accept the terms and
conditions on the website during registration process, I am not entitled to claim any refund and I
am also informed that I am permitted to hold my video consent and acceptance of terms and
conditions as long as I want to claiming for the refund.`,
    },
    {
      p: `As a distributor of Ripship World Ventures Private Limited I am liable to follow the code of
conduct framed by the Company and in case I failed to do so, which includes unethical activities
like misuse of the Company’s Sale Amount or handling financial dealings with the fellow
members of Ripship World Ventures Private Limited, sexual harassment of fellow members,
promoting irrelevant information regarding the business concept of Ripship World Ventures
Private Limited.`,
    },
    {
      p: `The terms and conditions that are mentioned above is in accordance of Ministry of Consumer
Affairs, any dispute arising out of these terms will be subject to exclusive jurisdiction of the courts
of Mangaluru, Karnataka.`,
    },
    {
      p: `These terms and conditions are subject to change from time to time, failure to comply with the
rules of conduct and these conditions may result in action against your independent business.`,
    },
  ];
  return (
    <Modal
      open={showPreview}
      onClose={() => setShowPreview(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "0 auto",
          borderRadius: 10,
          background: "#434343",
          overflow: "scroll",
          height: "80vh",
          width: "70%",
          "@media(max-width: 780px)": {
            width: "85%",
          },
        }}
      >
        <Grid
          container
          style={{
            position: "relative",
            background: "#282828",
            AlignItems: "center",
          }}
        >
          <Typography
            style={{
              color: "#fff",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <b> CIN: U63030KA2022PTC157267</b>
          </Typography>
          <Grid item>
            <img
              src={Logo}
              height={200}
              width={200}
              style={{ marginTop: 20 }}
              alt={"logo"}
            />
          </Grid>
          <Grid item style={{ marginTop: 50 }}>
            <Typography
              style={{
                color: "#E9C547",
                fontWeight: 700,
                fontSize: 25,
                paddingLeft: "20px",
                "@media(max-width : 690px)": {
                  fontSize: 15,
                  textAlign: "center",
                  marginTop: 20,
                },
              }}
            >
              RIPSHIP WORLD VENURES PVT LTD
            </Typography>
            <Typography
              style={{
                fontSize: 12,
                color: "#fff",
                paddingLeft: "20px",
                "@media(max-width : 690px)": {
                  fontSize: 10,
                  textAlign: "center",
                },
              }}
            >
              Ground Floor, No 1-5-378/2, SHREYAS, TANTRI LANE KOTTARA MANGALORE
              - 575006 <br />
              <span style={{ color: "#E9C547" }}> Ph:</span> 9066641583 <br />{" "}
              <span style={{ color: "#E9C547" }}>E-mail:</span>
              management@ripshipworldventures.com
              <br /> <span style={{ color: "#E9C547" }}>Website:</span>{" "}
              www.ripshipworldventures.com
              <br />
            </Typography>
          </Grid>
        </Grid>
        <Typography
          style={{
            textAlign: "center",
            color: "#E9C547",
            fontWeight: 700,
            fontSize: 25,
            margin: 10,
          }}
        >
          Application Details
        </Typography>

        {personalDetails?.map((per, index) => {
          return (
            <Grid
              container
              style={
                index % 2 === 0
                  ? {
                      background: "#282828",
                      padding: 20,
                      borderRadius: 10,
                    }
                  : { background: "none", padding: 10 }
              }
            >
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                  width: "40%",
                }}
              >
                {per.title}
              </Typography>
              <Typography
                style={{
                  color: "#FFF",
                  fontSize: 15,
                }}
              >
                {per?.value}
              </Typography>
            </Grid>
          );
        })}
        <Divider
          style={{
            color: "#fff",
            margin: "20px auto",
            background: "#fff",
          }}
        />
        <Typography
          style={{
            textAlign: "center",
            color: "#E9C547",
            fontWeight: 700,
            fontSize: 25,
            margin: 10,
          }}
        >
          Franchise Agreement
        </Typography>
        <ol>
          {agreement.map((a) => {
            return (
              <li
                style={{
                  color: "#fff",
                  marginTop: "10px",
                  paddingRight: "15px",
                }}
              >
                {a.p}
              </li>
            );
          })}
        </ol>
        <Grid
          container
          style={{
            display: "grid",
            justifyContent: "flex-end",
            paddingRight: "20px",
          }}
        >
          <div>
            <img
              src={userDetails?.user?.user_signature}
              height={100}
              width={100}
              alt={"Signature"}
            />
          </div>
          <Typography
            style={{
              color: "#FFF",
              fontSize: 20,
            }}
          >
            Signature
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UserDetailsViewModal;
