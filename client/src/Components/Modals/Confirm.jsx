import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import React from "react";

export const Confirm = ({
  open,
  setOpen,
  handleYes,
  handleNo,
  title,
  content,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleNo}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title" color={"#000"}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" color={"#000"}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={handleYes}>
          Yes
        </Button>
        <Button color="primary" onClick={handleNo} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
