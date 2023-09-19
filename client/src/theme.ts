import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    sidebar?: {
      backgroundColor: string;
      hoverBackgroundColor: string;
      color: string;
    };

    borderRadius?: {
      main: string;
    };

    border?: {
      primary: string;
      hover: string;
    };

    labels?: {
      backgroundColor: string;
      fontWeight: string;
      fontColor: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#09244B",
      main: "#4087d4",
    },

    success: {
      main: "#4a54b0",
    },

    text: {
      primary: "#202123",
      secondary: "#6e6e80",
      disabled: "#acacbe",
    },
  },

  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    h3: {
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    },
  },

  sidebar: {
    backgroundColor: "#11111F",
    hoverBackgroundColor: "#1c1a2f",
    color: "white",
  },

  borderRadius: {
    main: "5px",
  },

  border: {
    primary: "1px solid #5783db",
    hover: "1px solid #527acc",
  },

  labels: {
    backgroundColor: "#3333330f",
    fontWeight: "400",
    fontColor: "#333333",
  },
});

export default theme;
