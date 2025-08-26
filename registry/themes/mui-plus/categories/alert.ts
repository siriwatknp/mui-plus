import type { ThemeOptions } from "@mui/material/styles";

export const alertTheme: ThemeOptions["components"] = {
  MuiAlert: {
    styleOverrides: {
      root: {
        "--Icon-color": "currentColor",
      },
    },
  },
};
