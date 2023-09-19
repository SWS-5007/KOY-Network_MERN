import { styled, Button } from "@mui/material";

export const BtnOutlined = styled(Button)(({ theme }) => ({
  width: "max-content",
  height: "35px",
  color: theme.palette.primary.main,
  fontSize: "0.875rem",
  fontWeight: "500",
  lineHeight: "1,75",
  textTransform: "none",
  paddingLeft: "15px",
  paddingRight: "15px",
  border: theme.border.primary,
  borderRadius: theme.borderRadius.main,
  ":hover": {
    border: theme.border.hover,
  },
}));
