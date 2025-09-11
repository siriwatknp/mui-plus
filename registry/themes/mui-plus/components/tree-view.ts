import type { ThemeOptions } from "@mui/material/styles";
import type {} from "@mui/x-tree-view/themeAugmentation";

export const treeViewTheme: ThemeOptions["components"] = {
  MuiTreeItem: {
    styleOverrides: {
      content: ({ theme }) => ({
        "&[data-selected]": {
          "--Icon-color": "currentColor",
          backgroundColor: "transparent",
          "&[data-focused]": {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          "& .MuiTreeItem-label": {
            fontWeight: "bold",
          },
        },
      }),
    },
  },
};
