import type { ThemeOptions } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";

const borderWidth = 1;

export const controlsTheme: ThemeOptions["components"] = {
  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        "--_h": "34px",
        "--_w": "56px",
        "--_inset": "3px",
        "--_b": "1px",
        "--_thumb-size": "calc(var(--_h) - var(--_b) * 2 - var(--_inset) * 2)",
        "--_thumb-w": "var(--_thumb-size)",
        "--_thumb-h": "var(--_thumb-size)",
        "--plus-opacity-switchTrackDisabled": "0.5",
        width: "var(--_w)",
        height: "var(--_h)",
        padding: 0,
        borderRadius: "var(--_h)",
        "&:has(.Mui-focusVisible)": {
          outline: "2px solid",
          outlineOffset: "4px",
          outlineColor: (theme.vars || theme).palette.text.primary,
        },
        variants: [
          {
            props: { size: "small" },
            style: {
              "--_h": "28px",
              "--_w": "44px",
              "--_inset": "2px",
            },
          },
        ],
        [`& .${switchClasses.switchBase}`]: {
          padding: borderWidth,
          top: "var(--_inset)",
          left: "var(--_inset)",
          [`&.${switchClasses.checked}`]: {
            color: (theme.vars || theme).palette.common.white,
            transform: `translateX(calc(var(--_w) - var(--_thumb-w) - var(--_b) * 2 - var(--_inset) * 2))`,
            ...theme.applyStyles("dark", {
              [`& .${switchClasses.thumb}`]: {
                background: (theme.vars || theme).palette.grey[900],
              },
            }),
          },
          [`&.${switchClasses.checked}:not(.Mui-disabled) + .${switchClasses.track}`]:
            {
              opacity: 1,
              border: "none",
            },
          "&:active": {
            "--_thumb-w": "calc(var(--_thumb-size) + 4px)",
          },
          "&.Mui-disabled": {
            [`& .${switchClasses.thumb}`]: {
              opacity: "var(--plus-opacity-switchTrackDisabled)",
            },
          },
        },
        [`& .${switchClasses.thumb}`]: {
          borderRadius: "var(--_thumb-size)",
          background: (theme.vars || theme).palette.common.white,
          width: "var(--_thumb-w)",
          height: "var(--_thumb-h)",
          boxShadow:
            "0 3px 8px 0 rgba(0,0,0,0.1), 0 1px 1px 0 rgba(0,0,0,0.12), 0 3px 1px 0 rgba(0,0,0,0.08)",
          transition: "width 120ms ease-out 0ms",
        },
        [`& .${switchClasses.track}`]: {
          borderRadius: "var(--_thumb-size)",
          border: `solid ${(theme.vars || theme).palette.grey[300]}`,
          borderWidth,
          backgroundColor: (theme.vars || theme).palette.grey[300],
          opacity: 1,
          transition: "none",
          ...theme.applyStyles("dark", {
            border: `solid ${(theme.vars || theme).palette.grey[700]}`,
            backgroundColor: (theme.vars || theme).palette.grey[900],
          }),
        },
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: "var(--_gap)",
        [`&:has(.${switchClasses.root})`]: {
          "--_gap": theme.spacing(1),
          margin: 0,
        },
      }),
    },
  },
};
