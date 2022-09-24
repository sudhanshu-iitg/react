import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./customer_register.style";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import welcomeIllustration from "../../../assets/Illustration 1.svg";
import emailVerifiedImg from "../../../assets/Illustration 2.svg";
import PersonalDetails from "./personalDetails";
import BankDetails from "./bankDetails";
import KycDetails from "./kycDetails";
import PackagePayment from "./packagePayment";
import TermsCondtions from "./termsConditions";
import ThankYouScreen from "./thankYouScreen";
import { motion } from "framer-motion";

const CustomerRegister = ({ classes }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [details, setDetails] = useState(null);
  const goToNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const goToPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      id: 0,
      component: (
        <PersonalDetails
          goToNext={goToNext}
          setDetails={setDetails}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: 1,
      component: (
        <BankDetails
          goToNext={goToNext}
          goToPrev={goToPrev}
          details={details}
          setDetails={setDetails}
        />
      ),
    },
    {
      id: 2,
      component: <KycDetails goToNext={goToNext} goToPrev={goToPrev} />,
    },
    // {
    //   id: 3,
    //   component: <PackagePayment goToNext={goToNext} goToPrev={goToPrev} />,
    // },
    {
      id: 3,
      component: <TermsCondtions goToNext={goToNext} goToPrev={goToPrev} />,
    },
    {
      id: 4,
      component: <ThankYouScreen goToPrev={goToPrev} />,
    },
  ];

  return (
    <>
      <Grid className={classes.outerLogin}>
        <Grid
          style={{
            width: "100%",
            height: "auto",
            background: "#292929",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {steps[currentStep].component}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CustomerRegister);
