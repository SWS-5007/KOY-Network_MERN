import { styled, Button } from "@mui/material";

export const BtnContained = styled(Button)(({ theme }) => ({
  width: "max-content",
  height: "35px",
  color: "#ffffff",
  backgroundColor: theme.palette.primary.main,
  fontSize: "0.875rem",
  fontWeight: "400",
  textTransform: "none",
  borderRadius: "5px",
  padding: "0 15px",
  "&:hover": {
    backgroundColor: theme.palette.primary.hover,
  },
}));
