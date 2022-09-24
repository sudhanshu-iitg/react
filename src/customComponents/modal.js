import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

const ConfirmationModel = ({
  confirmationHeading,
  confirmationMessage,
  open,
  handleClose,
  handleOnClick,
  handleOnClickTitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box style={{ backgroundColor: "black" }}>
        <DialogTitle id="alert-dialog-title">{confirmationHeading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {handleClose && <Button onClick={handleClose}>Back</Button>}
          {handleOnClick && (
            <Button onClick={handleOnClick} autoFocus>
              {handleOnClickTitle}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModel;
