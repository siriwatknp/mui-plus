import type { ThemeOptions } from "@mui/material/styles";

export const linkTheme: ThemeOptions["components"] = {
  MuiLink: {
    styleOverrides: {
      root: {
        "&:focus-visible": {
          outlineOffset: "4px",
          outlineColor: "var(--Link-underlineColor)",
        },
      },
    },
  },
};
