import type { ThemeOptions } from "@mui/material/styles";

export const progressTheme: ThemeOptions["components"] = {
  MuiCircularProgress: {
    styleOverrides: {
      circle: {
        strokeLinecap: "round",
      },
    },
  },
};
