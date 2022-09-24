import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import Table from "../../../customComponents/table";
import styles from "./promotionalMaterials.style";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { URLS } from "../../../constants/index";
import { allRequestHandler } from "../../../api/index";
import CustomSpinner from "../../../customComponents/spinner";
import DetailsTable from "../../../customComponents/detailsTable";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import * as XLSX from "xlsx";

const PromotionalMaterials = ({ classes }) => {
  const [redirect, setRedirect] = useState(false);
  const [promotionMaterial, setPromotionMaterial] = useState();
  const [loading, setLoading] = useState(true);
  const [promotionSelectedId, setPromotionSelectedId] = useState(null);
  const [selectedPromotionMaterial, setSelectedPromotionMaterial] =
    useState(null);

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
              style={{ width: 50, height: 50, borderRadius: "100%" }}
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

  const exportToExcel = (data, type) => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, type);
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

  const promotionDetails = [
    {
      title: "Id",
      value: selectedPromotionMaterial?.id,
    },
    {
      title: "Promotion Title",
      value: selectedPromotionMaterial?.name,
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
    },
  ];
  // const download = (url) => {
  //   var element = document.createElement("a");
  //   var file = new Blob([url], { type: "image/*" });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "image.png";
  //   element.click();
  // };

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
                />
              </div>
            ) : (
              <CustomSpinner />
            )
          ) : (
            <Table
              header={[
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
              showEye={true}
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
    </>
  );
};

export default withStyles(styles)(PromotionalMaterials);
