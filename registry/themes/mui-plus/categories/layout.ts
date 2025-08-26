import type { ThemeOptions } from "@mui/material/styles";

export const layoutTheme: ThemeOptions["components"] = {
  MuiStack: {
    defaultProps: {
      useFlexGap: true,
    },
  },
};
