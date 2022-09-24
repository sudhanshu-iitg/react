import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  Button,
  Modal,
  Box,
  Snackbar,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import CustomTextfield from "./textfield";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomButton from "./primaryButton";
import { URLS } from "../constants/index";
import { allRequestHandler } from "../api/index";
import UserDetailsViewModal from "./userDetailsViewModal";
import UserIdCardModal from "./idCard";
import ProfileImg from "./Profile";
import moment from "moment";

const styles = () => ({
  title: {
    color: "#FFF",
    fontSize: 20,
    marginBottom: 20,
    width: "75%",
    "@media(max-width: 600px)": {
      width: "50%",
    },
  },
  personaDetails: {
    margin: "20px 5px",
    "@media(max-width: 600px)": {
      margin: "5px",
    },
  },

  detailValue: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    width: "40%",
    "@media(max-width: 600px)": {
      padding: 8,
      paddingLeft: 10,
      width: "80%",
    },
  },
  detailsRow: {
    display: "flex",
    padding: "1.75%",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      marginBottom: 10,
      padding: "5%",
    },
  },
  Btn: {
    padding: "18px 45px !important",
    "@media(max-width: 600px)": {
      padding: "18px !important",
    },
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    margin: "0 auto",
    borderRadius: 10,
    background: "#282828",
    overflow: "scroll",
    height: "50vh",
    "@media(max-width: 780px)": {
      width: "95%",
    },
  },
});

const DetailsTable = ({
  type,
  title,
  details,
  classes,
  rowStyle,
  getUserDetails,
  showEdit,
  showApproval,
  rowSelectedUserName,
  profileComponent,
  profilePicture,
  selectedSettingCareerId,
  selectedSettingRankId,
  selectedPromotionRowId,
}) => {
  const [editing, setEditing] = useState(false);
  const [seePhoto, setSeePhoto] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState(details[0]?.value);
  const [lastName, setLastName] = useState(details[1]?.value);
  const [email, setEmail] = useState(details[3]?.value);
  const [address, setAddress] = useState(details[5]?.value);
  const [city, setCity] = useState(details[6]?.value);
  const [pinCode, setPinCode] = useState(details[7]?.value);
  const [state, setState] = useState(details[8]?.value);
  const [country, setCountry] = useState(details[9]?.value);
  const [nomName, setNomName] = useState(details[10]?.value);
  const [nomAge, setNomAge] = useState(details[11]?.value);
  const [nomRelation, setNomRelation] = useState(details[12]?.value);

  const [aadharNumber, setAadharNumber] = useState(details[0]?.value);
  const [panDetails, setPanDetails] = useState(details[2]?.value);
  const [aadharFile, setSelectedAadharFile] = useState(details[1]?.value);
  const [panFile, setSelectedPANFile] = useState(details[3]?.value);

  const [bankName, setBankName] = useState(details[0]?.value);
  const [bankAccountNo, setAccountNo] = useState(details[1]?.value);
  const [bankIFSCCode, setIfscCode] = useState(details[2]?.value);
  const [bankBranch, setBankBranch] = useState(details[3]?.value);
  const [bankPassBook, setBankPassBook] = useState(details[4]?.value);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");
  const [isDevailsViewClicked, setDetailView] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewApproval, setShowPreviewApproval] = useState(false);
  const [value, setValue] = useState("approve");
  const [reason, setReason] = useState("");
  const [profilePic, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [editProfilePic, setProfilePictureEdit] = useState(false);

  const [careerMinimumUsers, setCareerMinimumUsers] = useState(
    details[0]?.value
  );
  const [careerReward, setCareerReward] = useState(details[2]?.value);

  const [rankRewardName, setRankRewardName] = useState(details[0]?.value);
  const [rankMinimumUsers, setRankMinimumUsers] = useState(details[1]?.value);
  const [rankBV, setRankBV] = useState(details[2]?.value);
  const [rankReward, setRankReward] = useState(details[3]?.value);
  const [rankOtherReward, setRankOtherReward] = useState(details[4]?.value);

  const [promotionName, setPromotionName] = useState(details[3]?.value);
  const [promotionBanner, setPromotionBanner] = useState(details[4]?.value);

  const [showIdCard, setShowIdCard] = useState(false);
  const [isIdCardViewClicked, setIdCardView] = useState(false);

  const [packageId, setPackageId] = useState(details[0]?.value);
  const [packageName, setPackageName] = useState(details[1]?.value);
  const [packagePrice, setPackagePrice] = useState(details[2]?.value);
  const [packageRepurchaseCommission, setPackageRepurchaseCommission] =
    useState(details[3]?.value);
  const [packageBv, setPackageBv] = useState(details[4]?.value);
  const [packageType, setPackageType] = useState(details[5]?.value);
  const [packageCategory, setPackageCategory] = useState(details[5]?.value);
  const [packageShortDesc, setPackageShortDesc] = useState(details[7]?.value);
  const [packageLongDesc, setPackageLongDesc] = useState(details[8]?.value);
  const [packageCapping, setPackageCapping] = useState(details[9]?.value);
  const [packagePercentage, setPackagePercentage] = useState(
    details[10]?.value
  );

  const [freeUserTransDetails, setFreeUserTransDetails] = useState();
  const [viewTransactions, setViewTransactions] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setReason("");
  };

  const onReasonChange = (event) => {
    setReason(event.target.value);
  };

  const onChange = (e, name) => {
    if (name === "First Name") {
      setFirstName(e.target.value);
    } else if (name === "Last Name") {
      setLastName(e.target.value);
    } else if (name === "Email ID") {
      setEmail(e.target.value);
    } else if (name === "Address") {
      setAddress(e.target.value);
    } else if (name === "City") {
      setCity(e.target.value);
    } else if (name === "Pin Code") {
      setPinCode(e.target.value);
    } else if (name === "State") {
      setState(e.target.value);
    } else if (name === "Country") {
      setCountry(e.target.value);
    } else if (name === "Nominee Name") {
      setNomName(e.target.value);
    } else if (name === "Nominee Age") {
      setNomAge(e.target.value);
    } else if (name === "Relationship with Nominee") {
      setNomRelation(e.target.value);
    } else if (name === "Bank Name") {
      setBankName(e.target.value);
    } else if (name === "Bank Account Number") {
      setAccountNo(e.target.value);
    } else if (name === "Bank IFSC Code") {
      setIfscCode(e.target.value);
    } else if (name === "Bank Branch") {
      setBankBranch(e.target.value);
    } else if (name === "Passbook Image") {
      setBankPassBook(e.target.files[0]);
    } else if (name === "Aadhar Number") {
      setAadharNumber(e.target.value);
    } else if (name === "PAN Details") {
      setPanDetails(e.target.value);
    } else if (name === "Aadhar Card Document") {
      setSelectedAadharFile(e.target.files[0]);
    } else if (name === "PAN Card Document") {
      setSelectedPANFile(e.target.files[0]);
    } else if (name === "Career Minimum Users") {
      setCareerMinimumUsers(e.target.value);
    } else if (name === "Career Reward") {
      setCareerReward(e.target.value);
    } else if (name === "Rank Minimum Users") {
      setRankMinimumUsers(e.target.value);
    } else if (name === "Rank Alpha Beta BV") {
      setRankBV(e.target.value);
    } else if (name === "Rank Reward") {
      setRankReward(e.target.value);
    } else if (name === "Rank Other Reward") {
      setRankOtherReward(e.target.value);
    } else if (name === "Rank Reward Name") {
      setRankRewardName(e.target.value);
    } else if (name === "Promotion Title") {
      setPromotionName(e.target.value);
    } else if (name === "Promotion Banner") {
      setPromotionBanner(e.target.files[0]);
    } else if (name === "Package Id") {
      setPackageId(e.target.value);
    } else if (name === "Package Name") {
      setPackageName(e.target.value);
    } else if (name === "Package Price") {
      setPackagePrice(e.target.value);
    } else if (name === "Package Repurchase Income") {
      setPackageRepurchaseCommission(e.target.value);
    } else if (name === "Package BV") {
      setPackageBv(e.target.value);
    } else if (name === "Package Type") {
      setPackageType(e.target.value);
    } else if (name === "Package Category") {
      setPackageCategory(e.target.value);
    } else if (name === "Package Short Description") {
      setPackageShortDesc(e.target.value);
    } else if (name === "Package Long Description") {
      setPackageLongDesc(e.target.value);
    } else if (name === "Package Capping") {
      setPackageCapping(e.target.value);
    } else if (name === "Package Percentage") {
      setPackagePercentage(e.target.value);
    } else console.log("no val");
  };

  const updatePromotionDetails = async () => {
    if (promotionName !== null && promotionBanner !== null) {
      const formData = new FormData();

      formData.append("name", promotionName);
      formData.append("banner", promotionBanner);

      let promotionDetails = await allRequestHandler({
        requestType: "PATCH",
        requestUrl: URLS.PROMOTIONMATERIAL + "" + selectedPromotionRowId + "/",
        requestData: formData,
      });
      if (promotionDetails) {
        getUserDetails(selectedPromotionRowId);
        setEditing(false);
        setSeverity("success");
        setDisplayMsg("Details Updated");
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Files should be less than 2MB");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please enter all to continue");
      setHandleSnackbar(true);
    }
  };

  const updateCareerSettingDetails = async () => {
    const Career = {
      bv: selectedSettingCareerId,
      minimum_users: careerMinimumUsers,
      reward: careerReward,
    };
    const sendCareerSettingDetails = await allRequestHandler({
      requestType: "PUT",
      requestUrl: URLS.SETTINGCAREER + "" + selectedSettingCareerId + "/",
      requestData: Career,
    });

    if (sendCareerSettingDetails) {
      getUserDetails(selectedSettingCareerId);
      setEditing(false);
      setDisplayMsg("Details Updated");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const updateRankSettingDetails = async () => {
    const Rank = {
      mbv: selectedSettingRankId,
      minimum_users: rankMinimumUsers,
      reward: rankReward,
      name: rankRewardName,
      other_reward: rankOtherReward,
    };

    const sendRankSettingDetails = await allRequestHandler({
      requestType: "PUT",
      requestUrl:
        URLS.SETTINGRANKSANDREWARDS + "" + selectedSettingRankId + "/",
      requestData: Rank,
    });
    if (sendRankSettingDetails) {
      getUserDetails(selectedSettingRankId);
      setEditing(false);
      setDisplayMsg("Details Updated");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const updatePersonalDetails = async () => {
    const personal = {
      username: rowSelectedUserName,
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
      city: city,
      pin_code: pinCode,
      state: state,
      country: country,
      nominee_name: nomName,
      nominee_age: nomAge,
      nominee_relation: nomRelation,
    };

    const sendPersonalDetails = await allRequestHandler({
      requestType: "PUT",
      requestUrl: URLS.UPDATEUSERDETAILS,
      requestData: personal,
    });
    if (sendPersonalDetails.response) {
      getUserDetails();
      setEditing(false);
      setDisplayMsg("Details Updated");
      setSeverity("success");
      setHandleSnackbar(true);
    } else {
      setDisplayMsg("Please ensure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
    getUserDetails();
  };

  const fileSizeChecker = (file) => {
    const FileSize = file.size;
    const TotalFileSize = Math.round(FileSize / 1024);
    return TotalFileSize;
  };

  const updateKYCDetails = async () => {
    if (fileSizeChecker(aadharFile) > 2048) {
      setSeverity("error");
      setDisplayMsg("Adar File is too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
      setSelectedAadharFile(null);
      return;
    } else if (fileSizeChecker(panFile) > 2048) {
      setSeverity("error");
      setDisplayMsg("Pan File is too Big, please select a file less than 2MB");
      setHandleSnackbar(true);
      setSelectedPANFile(null);
      return;
    }
    if (
      panFile !== null &&
      panFile !== "" &&
      panFile !== undefined &&
      aadharFile !== null &&
      aadharFile !== "" &&
      aadharFile !== undefined &&
      panDetails !== null &&
      aadharNumber !== null
    ) {
      const formData = new FormData();

      formData.append("aadhar", aadharFile);
      formData.append("pan", panFile);
      formData.append("username", rowSelectedUserName);
      formData.append(
        "pan_number",
        panDetails ? panDetails : details[2]?.value
      );
      formData.append(
        "aadhar_number",
        aadharNumber ? aadharNumber : details[0]?.value
      );

      let uploadPDF1 = await allRequestHandler({
        requestType: "IMAGE",
        requestUrl: URLS.UPDATEKYCDETAILS,
        requestData: formData,
      });
      if (uploadPDF1?.response === "document upload successful") {
        getUserDetails();
        setEditing(false);
        setSeverity("success");
        setDisplayMsg("KYC Updated Successfully!");
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Files should be less than 2MB");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please upload all your documents to continue");
      setHandleSnackbar(true);
    }
  };

  const updateBANKDetails = async () => {
    if (fileSizeChecker(bankPassBook) > 2048) {
      setSeverity("error");
      setDisplayMsg(
        "Bank PassBook File is too Big, please select a file less than 2MB"
      );
      setHandleSnackbar(true);
      setBankPassBook(null);
      return;
    }
    if (
      bankName !== null &&
      bankIFSCCode !== null &&
      bankAccountNo !== null &&
      bankBranch !== null &&
      bankPassBook !== null &&
      bankPassBook !== undefined &&
      bankPassBook !== ""
    ) {
      const formData = new FormData();
      formData.append("username", rowSelectedUserName);
      formData.append("bankname", bankName ? bankName : details[0]?.value);
      formData.append("ifsc", bankIFSCCode ? bankIFSCCode : details[2]?.value);
      formData.append(
        "account_number",
        bankAccountNo ? bankAccountNo : details[1]?.value
      );
      formData.append(
        "branch_name",
        bankBranch ? bankBranch : details[3]?.value
      );
      formData.append("passbook_image", bankPassBook);

      const sendBANKDetails = await allRequestHandler({
        requestType: "PUT",
        requestUrl: URLS.UPDATEBANKDETAILS,
        requestData: formData,
      });
      if (sendBANKDetails.response !== null) {
        getUserDetails();
        setEditing(false);
        setDisplayMsg("Details Updated");
        setSeverity("success");
        setHandleSnackbar(true);
      } else {
        setDisplayMsg("Some error occured");
        setSeverity("error");
        setHandleSnackbar(true);
      }
    } else {
      setDisplayMsg("Make sure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const updatePKGDetails = async () => {
    if (
      packageId !== null &&
      packageId !== undefined &&
      packageId !== "" &&
      packageName !== null &&
      packageName !== undefined &&
      packageName !== "" &&
      packagePrice !== null &&
      packagePrice !== undefined &&
      packagePrice !== "" &&
      packageRepurchaseCommission !== null &&
      packageRepurchaseCommission !== undefined &&
      packageRepurchaseCommission !== "" &&
      packageBv !== null &&
      packageBv !== undefined &&
      packageBv !== "" &&
      packageType !== null &&
      packageType !== undefined &&
      packageType !== "" &&
      packageCategory !== null &&
      packageCategory !== undefined &&
      packageCategory !== "" &&
      packageShortDesc !== null &&
      packageShortDesc !== undefined &&
      packageShortDesc !== "" &&
      packageLongDesc !== null &&
      packageLongDesc !== undefined &&
      packageLongDesc !== "" &&
      packageCapping !== null &&
      packageCapping !== undefined &&
      packageCapping !== "" &&
      packagePercentage !== null &&
      packagePercentage !== undefined &&
      packagePercentage !== ""
    ) {
      const formData = new FormData();
      formData.append("package_id", packageId);
      formData.append("name", packageName);
      formData.append("price", packagePrice);
      formData.append("repurchase_commission", packageRepurchaseCommission);
      formData.append("bv", packageBv);
      formData.append("type", packageType);
      formData.append("category", packageCategory);
      formData.append("short_description", packageShortDesc);
      formData.append("long_description", packageLongDesc);
      formData.append("capping", packageCapping);
      formData.append("package_percentage", packagePercentage);

      const updatePackageDetails = await allRequestHandler({
        requestType: "PATCH",
        requestUrl: URLS.PACKAGES,
        requestData: formData,
      });
      if (updatePackageDetails.response !== null) {
        getUserDetails(rowSelectedUserName);
        setEditing(false);
        setDisplayMsg("Details Updated");
        setSeverity("success");
        setHandleSnackbar(true);
      } else {
        setDisplayMsg("Some error occured");
        setSeverity("error");
        setHandleSnackbar(true);
      }
    } else {
      setDisplayMsg("Make sure all fields have valid values");
      setSeverity("error");
      setHandleSnackbar(true);
    }
  };

  const updateDetails = async () => {
    if (type === "PROMOTIONAL MATERIAL") {
      updatePromotionDetails();
    } else if (type === "CAREER SETTING") {
      updateCareerSettingDetails();
    } else if (type === "RANK SETTING") {
      updateRankSettingDetails();
    } else if (type === "BANK") {
      updateBANKDetails();
    } else if (type === "KYC") {
      updateKYCDetails();
    } else if (type === "PACKAGE DETAILS") {
      updatePKGDetails();
    } else {
      updatePersonalDetails();
    }
  };

  const doApprove = async () => {
    setShowPreviewApproval(false);
    if (type === "BANK") {
      let approveDetails = await allRequestHandler({
        requestType: "PUT",
        requestUrl: URLS.APPROVEDOC,
        requestData: {
          username: rowSelectedUserName,
          bank_details: {
            is_approved: value === "reject" ? false : true,
            rejection_reason: value === "reject" ? reason : "",
          },
        },
      });
      if (approveDetails.response) {
        getUserDetails();
        setSeverity("success");
        setDisplayMsg(approveDetails.response);
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Some error occured");
        setHandleSnackbar(true);
      }
    } else if (type === "APPLICATION") {
      let approveDetails = await allRequestHandler({
        requestType: "PUT",
        requestUrl: URLS.APPROVEDOC,
        requestData: {
          username: rowSelectedUserName,
          application: {
            is_approved: value === "reject" ? false : true,
            rejection_reason: value === "reject" ? reason : "",
          },
        },
      });
      if (approveDetails) {
        getUserDetails();
        setSeverity("success");
        setDisplayMsg(approveDetails.response);
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Some error occured");
        setHandleSnackbar(true);
      }
    } else if (type === "KYC") {
      let approveDetails = await allRequestHandler({
        requestType: "PUT",
        requestUrl: URLS.APPROVEDOC,
        requestData: {
          username: rowSelectedUserName,
          aadhar: {
            is_approved: value === "reject" ? false : true,
            rejection_reason: value === "reject" ? reason : "",
          },
          pan: {
            is_approved: value === "reject" ? false : true,
            rejection_reason: value === "reject" ? reason : "",
          },
        },
      });
      if (approveDetails) {
        getUserDetails();
        setSeverity("success");
        setDisplayMsg(approveDetails.response);
        setHandleSnackbar(true);
      } else {
        setSeverity("error");
        setDisplayMsg("Some error occured");
        setHandleSnackbar(true);
      }
    }
  };

  const showModal = (value) => {
    setSeePhoto(true);
    setPhoto(value);
  };

  const showPdf = async (title) => {
    const getDetails = await allRequestHandler({
      requestType: "POST",
      requestUrl: URLS.USERPRF,
      requestData: { username: details[2]?.value },
    });
    if (title === "Aadhar Document") {
      window.open(getDetails?.documents?.aadhar?.aadhar, "_blank").focus();
    } else {
      window.open(getDetails?.documents?.pan?.pan, "_blank").focus();
    }
  };

  const uploadProfilePicture = (e) => {
    let selectedFile = URL.createObjectURL(e.target.files[0]);
    setProfilePicturePreview(selectedFile);
    setProfilePicture(e.target.files[0]);
  };

  const uploadPicture = async () => {
    if (profilePic !== null && profilePic !== undefined && profilePic !== "") {
      const formData = new FormData();
      formData.append("img", profilePic);

      let uploadProfile = await allRequestHandler({
        requestType: profilePicture ? "PUT" : "POST",
        requestUrl: URLS.USERPRFIMG,
        requestData: formData,
      });
      if (uploadProfile?.response) {
        setProfilePictureEdit(false);
        setSeverity("success");
        setDisplayMsg("Image set Successfully!");
        setHandleSnackbar(true);
        getUserDetails();
      } else {
        setSeverity("error");
        setDisplayMsg("Files should be less than 2MB");
        setHandleSnackbar(true);
      }
    } else {
      setSeverity("error");
      setDisplayMsg("Please upload picture to continue");
      setHandleSnackbar(true);
    }
    getUserDetails();
  };

  useEffect(() => {
    console.log(details);
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        open={handleSnackbar}
        onClose={() => setHandleSnackbar(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {" "}
          {displayMsg}{" "}
        </MuiAlert>
      </Snackbar>
      <Grid className={classes.personaDetails}>
        <Grid style={{ textAlign: "center" }}>
          {profileComponent && (
            <>
              <ProfileImg
                src={
                  !editProfilePic && profilePicture
                    ? profilePicture
                    : profilePicturePreview
                }
                onChange={uploadProfilePicture}
                edit={editProfilePic}
              />
              <Grid>
                {!editProfilePic && (
                  <CustomButton
                    text="Edit"
                    style={{
                      textAlign: "center",
                      background: "#C5B1FF",
                      color: "#262626",
                      marginBottom: 10,
                      fontWeight: 700,
                      marginRight: 20,
                    }}
                    className={classes.Btn}
                    onClick={() => setProfilePictureEdit(true)}
                  />
                )}

                <CustomButton
                  text={"Set Picture"}
                  onClick={uploadPicture}
                  style={
                    editProfilePic
                      ? {
                          textAlign: "center",
                          background: "#E9C547",
                          color: "#262626",
                          marginBottom: 10,
                          fontWeight: 700,
                          marginRight: 20,
                        }
                      : {
                          textAlign: "center",
                          background: "#787878",
                          color: "#BCBCBC",
                          marginBottom: 10,
                          fontWeight: 700,
                          pointerEvents: "none",
                          marginRight: 20,
                        }
                  }
                />
                {editProfilePic && (
                  <CustomButton
                    text={"Cancel"}
                    onClick={() => setProfilePictureEdit(false)}
                    style={{
                      textAlign: "center",
                      background: "#E9C547",
                      color: "#262626",
                      marginBottom: 10,
                      fontWeight: 700,
                    }}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>

        <Modal
          open={seePhoto}
          onClose={() => setSeePhoto(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modalBox}>
            <Button
              onClick={() => setSeePhoto(false)}
              style={{ float: "right" }}
            >
              {" "}
              <CloseRoundedIcon
                style={{
                  fontSize: 30,
                  color: "#E9C547",
                  margin: 10,
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              />
            </Button>
            {photo ? (
              <img src={photo} height={"auto"} width={"100%"} alt="" />
            ) : (
              <Typography
                className={classes.title}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                No file attached
              </Typography>
            )}
          </Box>
        </Modal>
        <Grid
          container
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography className={classes.title}>{title}</Typography>
          {showApproval && (
            <CustomButton
              text={"Approve"}
              onClick={() => setShowPreviewApproval(true)}
              style={{
                textAlign: "center",
                background: "#E9C547",
                color: "#262626",
                marginBottom: 10,
                fontWeight: 700,
              }}
            />
          )}

          {showEdit === true ? (
            editing ? (
              <CustomButton
                style={{
                  background: "none",
                  boxShadow: "none",
                  fontWeight: 700,
                  color: "#C5B1FF",
                  marginBottom: 10,
                }}
                text={"Update Details"}
                onClick={updateDetails}
              />
            ) : (
              <CustomButton
                text="Edit"
                style={{
                  textAlign: "center",
                  background: "#C5B1FF",
                  color: "#262626",
                  marginBottom: 10,
                  fontWeight: 700,
                }}
                className={classes.Btn}
                onClick={() => setEditing(!editing)}
              />
            )
          ) : (
            <p></p>
          )}
        </Grid>

        {details.map((detail, index) => {
          return (
            <>
              <Grid
                container
                className={classes.detailsRow}
                style={
                  index % 2 === 0
                    ? {
                        background: "rgba(197, 177, 255, 0.2)",
                        borderRadius: 10,
                      }
                    : { background: "none", rowStyle }
                }
              >
                <Typography className={classes.detailValue}>
                  {detail.title}
                </Typography>
                {editing ? (
                  <>
                    {detail.edit === true ? (
                      <CustomTextfield
                        label={""}
                        type={detail?.type || "text"}
                        autoComplete="off"
                        isRequired={true}
                        autoFocus
                        height={40}
                        BoxHeight="68px"
                        value={detail?.type === "file" ? "" : detail?.value}
                        style={{
                          background: "none",
                          marginBottom: "10px",
                          border: "none",
                          width: "10%",
                        }}
                        handleChange={(e) => onChange(e, detail.title)}
                        // error={field.error}
                      />
                    ) : detail.view ? (
                      <Button onClick={() => showModal(detail.value)}>
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : (
                      <Typography
                        className={classes.detailValue}
                        style={{ fontWeight: 700, color: "#fff" }}
                      >
                        {detail.value}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography
                    className={classes.detailValue}
                    style={{ fontWeight: 700, color: "#fff" }}
                  >
                    {detail.view ? (
                      <Button onClick={() => showModal(detail.value)}>
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : detail.showPdf ? (
                      <Button onClick={() => showPdf(detail.title)}>
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : detail.appDetails ? (
                      <Button
                        onClick={() => {
                          setShowPreview(true);
                          setDetailView(true);
                        }}
                      >
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : detail.idCard ? (
                      <Button
                        onClick={() => {
                          setShowIdCard(true);
                          setIdCardView(true);
                        }}
                      >
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : detail.freeUserDetailsView ? (
                      <Button
                        onClick={() => {
                          setFreeUserTransDetails(detail.value);
                          setViewTransactions(true);
                        }}
                      >
                        <RemoveRedEyeRoundedIcon />
                      </Button>
                    ) : (
                      detail.value
                    )}
                  </Typography>
                )}
              </Grid>
            </>
          );
        })}
      </Grid>
      {isDevailsViewClicked && (
        <UserDetailsViewModal
          name={rowSelectedUserName}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      )}
      {isIdCardViewClicked && (
        <UserIdCardModal
          name={rowSelectedUserName}
          showIdCard={showIdCard}
          setShowIdCard={setShowIdCard}
        />
      )}

      <Modal
        open={showPreviewApproval}
        onClose={() => setShowPreviewApproval(false)}
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
            height: "auto",
            width: "40%",
          }}
        >
          <Typography
            style={{
              color: "#E9C547",
              fontWeight: 700,
              fontSize: 25,
              marginBottom: "10px",
            }}
          >
            ACTIONS ON {title}
          </Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Select
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="approve"
                control={<Radio />}
                label="Approve"
              />
              <FormControlLabel
                value="reject"
                control={<Radio />}
                label="Reject"
              />
            </RadioGroup>
          </FormControl>
          {value === "reject" && (
            <CustomTextfield
              label={"Reason"}
              type={"text"}
              autoComplete="off"
              autoFocus
              value={reason}
              handleChange={(event) => onReasonChange(event)}
            />
          )}
          <Grid>
            <CustomButton
              text={"Submit"}
              onClick={doApprove}
              style={{
                textAlign: "center",
                padding: "18px 45px",
                background: "#E9C547",
                color: "#262626",
                fontWeight: 700,
                marginTop: "10px",
              }}
            />
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={viewTransactions}
        onClose={() => setViewTransactions(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: 20,
                color: "#FFF",
                textTransform: "uppercase",
                margin: 10,
              }}
            >
              View Transactions
            </Typography>
            <Button
              onClick={() => setViewTransactions(false)}
              style={{ float: "right" }}
            >
              {" "}
              <CloseRoundedIcon
                style={{
                  fontSize: 30,
                  color: "#E9C547",
                  margin: 10,
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              />
            </Button>
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                disbackground: "none",
                padding: 10,
              }}
            >
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Paid
              </Typography>
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Amount
              </Typography>
              <Typography
                style={{
                  color: "#E9C547",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Paid Date
              </Typography>
            </Grid>
            {freeUserTransDetails?.map((trans, index) => {
              return (
                <Grid
                  container
                  style={
                    index % 2 === 0
                      ? {
                          background: "#434343",
                          padding: 20,
                          borderRadius: 10,
                          display: "flex",
                          justifyContent: "space-between",
                        }
                      : {
                          background: "none",
                          padding: 20,
                          display: "flex",
                          justifyContent: "space-between",
                        }
                  }
                >
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {trans?.amt_paid}
                  </Typography>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {trans?.amt_left ? trans?.amt_left : "-"}
                  </Typography>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {moment(trans?.paid_on).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(DetailsTable);
