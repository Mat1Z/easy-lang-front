import { Theme, createTheme } from "@mui/material/styles";

const primaryColor = "#000 !important";
const secondaryColor = "#00D75E !important";
// Create a theme instance.
export const themeObject = (isDark: boolean): Theme =>
  createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            background: "#00d264 !important",
            ":disabled": {
              background: "#e0e0e0 !important",
            },
            color: "white",
            backgroundColor: "#fff"
          },
          containedSecondary: {
            backgroundColor: "#aaa !important",
            color: "#fff !important",
          },
          outlinedPrimary: {
            color: "#fff",
            border: `2px solid #fff`,
            text: "#fff",
            ":hover": {
              border: `2px solid #fff`,
            }
          },
        },
      },
    }
  });