import React, { useState, useEffect } from "react";
import { Grid, Modal, Box, Typography, Button, Snackbar } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import styles from "../supportTickets/supportTickets.style";
import CustomTextField from "../../../customComponents/textfield";
import CustomButton from "../../../customComponents/primaryButton";
import MultilineInput from "../../../customComponents/multilineInput";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import DetailsTable from "../../../customComponents/detailsTable";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomSpinner from "../../../customComponents/spinner";

import * as XLSX from "xlsx";

const PromotionalMaterials = ({ classes }) => {
  const [redirect, setRedirect] = useState(false);

  const [handleSnackbar, setHandleSnackbar] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const [PromotionalMaterialsModal, setPromotionalMaterialsModal] =
    useState(false);

  const [promotionMaterial, setPromotionMaterial] = useState();
  const [selectedPromotionMaterial, setSelectedPromotionMaterial] =
    useState(null);

  const [promotionSelectedId, setPromotionSelectedId] = useState(null);

  const [promotionTitle, setPromotionTitle] = useState();
  const [promotionDescription, setPromotionDescription] = useState();
  const [promotionImage, setPromotionImage] = useState();

  const [loading, setLoading] = useState(true);

  const uploadPromotionImage = (e) => {
    let selectedFile = e.target.files[0];
    setPromotionImage(selectedFile);
  };

  const promotionDetails = [
    {
      title: "Id",
      value: selectedPromotionMaterial?.id,
    },
    {
      title: "Promotion Title",
      value: selectedPromotionMaterial?.name,
      edit: true,
      type: "text",
    },
    {
      title: "Description",
      value: selectedPromotionMaterial?.description,
    },

    {
      title: "Created Date",
      value: selectedPromotionMaterial?.created_at,
    },
    {
      title: "Updated Date",
      value: selectedPromotionMaterial?.updated_at,
    },
    {
      title: "Promotion Banner",
      value: selectedPromotionMaterial?.banner,
      view: true,
      edit: true,
      type: "file",
    },
  ];

  const openAddPromotionModal = () => {
    setPromotionalMaterialsModal(true);
  };

  const getPromotionMaterials = async () => {
    let promotionMaterial = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PROMOTIONMATERIAL,
    });
    if (
      promotionMaterial?.status === "401" ||
      promotionMaterial?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (promotionMaterial) {
      const content = promotionMaterial?.map((p, index) => {
        return {
          name: p?.name,
          createdAt: moment(p?.created_at).format("DD/MM/YYYY"),
          updatedAt: moment(p?.updated_at).format("DD/MM/YYYY"),
          id: p?.id,
          description: p?.description,
          banner: (
            <img
              src={p?.banner}
              alt="banner"
              style={{ width: 30, height: 30, borderRadius: "100%" }}
            ></img>
          ),
        };
      });
      setPromotionMaterial(content);
      setLoading(false);
    }
  };

  const openPromotionSelectedRow = (id) => {
    setPromotionSelectedId(id);
    getSelectedPromotionDetails(id);
  };

  const getSelectedPromotionDetails = async (id) => {
    setLoading(true);
    let selectedPromotion = await allRequestHandler({
      requestType: "GET",
      requestUrl: URLS.PROMOTIONMATERIAL + "" + id,
    });
    if (
      selectedPromotion?.status === "401" ||
      selectedPromotion?.data?.detail ===
        "Authentication credentials were not provided."
    )
      setRedirect(true);
    if (selectedPromotion.status !== 404) {
      setSelectedPromotionMaterial(selectedPromotion);
      setLoading(false);
    }
  };

  const addPromotionDetails = async () => {
    setPromotionalMaterialsModal(false);
    if (
      promotionTitle !== null &&
      promotionDescription !== null &&
      promotionImage !== null
    ) {
      const formData = new FormData();

      formData.append("name", promotionTitle);
      formData.append("description", promotionDescription);
      formData.append("banner", promotionImage);

      let promotionDetails = await allRequestHandler({
        requestType: "POST",
        requestUrl: URLS.PROMOTIONMATERIAL,
        requestData: formData,
      });

      if (promotionDetails) {
        getPromotionMaterials();
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

  const exportToExcel = (data, type) => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, type);
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(
      workBook,
      `${type} - ${
        new Date().getFullYear() +
        " - " +
        (new Date().getMonth() + 1) +
        " - " +
        new Date().getDate()
      }.xlsx`
    );
  };

  useEffect(() => {
    getPromotionMaterials();
  }, []);

  if (redirect) {
    return <Redirect push to="/admin/login" />;
  }

  return loading ? (
    <Grid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <CustomSpinner />
    </Grid>
  ) : (
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
      <Grid className={classes.outerContainer}>
        <Grid className={classes.tableContainer}>
          {promotionSelectedId !== null && promotionSelectedId !== undefined ? (
            !loading ? (
              <div
                style={{
                  border: "3px solid #474747",
                  boxShadow: "4px 24px 60px rgb(0 0 0 / 40%)",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Button
                  onClick={() => {
                    setPromotionSelectedId(null);
                    getPromotionMaterials();
                  }}
                >
                  <KeyboardBackspaceRoundedIcon style={{ fontSize: 35 }} />
                </Button>

                <DetailsTable
                  type={"PROMOTIONAL MATERIAL"}
                  selectedPromotionRowId={promotionSelectedId}
                  details={promotionDetails}
                  title={"PROMOTIONAL MATERIAL DETAILS"}
                  getUserDetails={getSelectedPromotionDetails}
                  showEdit={true}
                  showApproval={false}
                />
              </div>
            ) : (
              <CustomSpinner />
            )
          ) : (
            <Table
              header={[
                "",
                "",
                "Promotion Title",
                "Created Date",
                "Updated Date",
                "Id",
                "Description",
                "Banner",
              ]}
              data={promotionMaterial}
              title={"Company promotions"}
              createBtn={"UPLOAD NEW MATERIAL"}
              createMethod={openAddPromotionModal}
              showEye={true}
              menuOptions={["Delete Promotional Material"]}
              showMenuOptions={true}
              showPagination={true}
              onRowClick={openPromotionSelectedRow}
              getUserDetails={getPromotionMaterials}
              exportExcel={true}
              exportToExcelClick={() =>
                exportToExcel(promotionMaterial, "compony-promotion")
              }
            />
          )}
        </Grid>
      </Grid>
      <Modal
        open={PromotionalMaterialsModal}
        onClose={() => setPromotionalMaterialsModal(false)}
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
          <Grid
            container
            style={{
              borderBottom: "2px solid #D0D0D0",
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
              Create A New Package
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridGap: 30,
              height: "auto",
            }}
          >
            <CustomTextField
              fullWidth={true}
              label={"Promotion Title"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={70}
              placeholder={"Enter promotion title"}
              handleChange={(e) => setPromotionTitle(e.target.value)}
            />

            <MultilineInput
              multiline={true}
              minRows={4}
              maxRows={5}
              fullWidth={true}
              label={"Promotion Description"}
              type={"text"}
              isRequired={true}
              autoComplete="off"
              autoFocus
              BoxHeight="68px"
              height={140}
              placeholder={"Enter Promotion Description"}
              handleChange={(e) => setPromotionDescription(e.target.value)}
            />
            <Grid>
              <Typography
                style={{
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 25,
                  marginBottom: 15,
                }}
              >
                {" "}
                Upload Promotion Image
              </Typography>
              <div style={{ display: "flex" }}>
                <label
                  htmlFor="promotion-image"
                  style={{
                    background: "#E9C547",
                    color: "#000",
                    padding: "0.5em 3em",
                    textTransform: "uppercase",
                    borderRadius: 4,
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  Select File
                  <input
                    style={{ display: "none" }}
                    id="promotion-image"
                    type="file"
                    name="file"
                    onChange={uploadPromotionImage}
                    required
                  />
                </label>
                <Typography
                  style={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 15,
                    margin: 8,
                  }}
                >
                  {promotionImage?.name}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid>
            <CustomButton
              text="Add Material"
              style={{
                color: "#000",
                padding: "26px 45px",
                fontWeight: 700,
                marginTop: "20px",
              }}
              onClick={addPromotionDetails}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(styles)(PromotionalMaterials);
