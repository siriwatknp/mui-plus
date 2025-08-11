import type { ThemeOptions } from "@mui/material/styles";

export const textFieldTheme: ThemeOptions["components"] = {
  MuiFormControl: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              "& .MuiFormLabel-root, & .MuiInputLabel-root.MuiInputLabel-shrink":
                {
                  position: "static",
                  transform: "none",
                  pointerEvents: "auto",
                  marginBottom: "0.25rem",
                  maxWidth: "unset",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: (theme.vars || theme).palette.text.primary,
                },
              "& .MuiOutlinedInput-input:where(input)": {
                paddingBlock: "9.5px",
              },
              "&&& .MuiInputBase-input": {
                "&::-webkit-input-placeholder": {
                  opacity: "0.42 !important",
                },
                "&::-moz-placeholder": {
                  opacity: "0.42 !important",
                },
                "&::-ms-input-placeholder": {
                  opacity: "0.42 !important",
                },
              },
              "&& .MuiOutlinedInput-notchedOutline": {
                transition: "none",
                "& legend": {
                  width: 0,
                },
              },
              "& .MuiIconButton-root": {
                "&:hover": {
                  color: (theme.vars || theme).palette.text.primary,
                  backgroundColor: "transparent",
                },
              },
            },
          },
          {
            props: { variant: "outlined", size: "small" },
            style: {
              "& .MuiInputBase-input:where(input)": {
                paddingBlock: "6.5px",
                paddingInline: "12px",
              },
            },
          },
        ],
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.up(768)]: {
          fontSize: theme.typography.body2.fontSize,
        },
      }),
      input: () => ({
        padding: "8px 12px",
        minHeight: "1.5em",
        variants: [
          {
            props: { size: "small" },
            style: {
              padding: "4px 10px",
            },
          },
          {
            props: { multiline: true },
            style: {
              padding: 0,
            },
          },
        ],
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-notchedOutline": {
          transition: theme.transitions.create(["border-color"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: (theme.vars || theme).palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
          borderColor: (theme.vars || theme).palette.primary.main,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: (theme.vars || theme).palette.error.main,
        },
        "&.Mui-disabled": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme.vars || theme).palette.action.disabled,
          },
        },
        variants: [
          {
            props: { multiline: true },
            style: {
              padding: "8px 12px",
            },
          },
          {
            props: { size: "small", multiline: true },
            style: {
              padding: "4px 10px",
            },
          },
        ],
      }),
      notchedOutline: {
        borderRadius: 8,
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.action.hover,
        borderRadius: "8px 8px 0 0",
        "&:hover": {
          backgroundColor: (theme.vars || theme).palette.action.selected,
        },
        "&.Mui-focused": {
          backgroundColor: (theme.vars || theme).palette.action.selected,
        },
        "&.Mui-disabled": {
          backgroundColor: (theme.vars || theme).palette.action
            .disabledBackground,
        },
        "&::before": {
          transition: theme.transitions.create(["border-bottom-color"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "&:hover::before": {
          borderBottom: `2px solid ${
            (theme.vars || theme).palette.text.primary
          }`,
        },
        "&::after": {
          borderBottom: `2px solid ${
            (theme.vars || theme).palette.primary.main
          }`,
        },
        "&.Mui-error::after": {
          borderBottomColor: (theme.vars || theme).palette.error.main,
        },
      }),
      input: () => ({
        "&:where(input)": {
          padding: "25px 12px 8px",
        },
        variants: [
          {
            props: { size: "small" },
            style: {
              "&:where(input)": {
                padding: "21px 10px 4px",
              },
            },
          },
        ],
      }),
    },
  },
  MuiInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&::before": {
          transition: theme.transitions.create(["border-bottom-color"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "&:hover:not(.Mui-disabled)::before": {
          borderBottom: `2px solid ${
            (theme.vars || theme).palette.text.primary
          }`,
        },
        "&::after": {
          borderBottom: `2px solid ${
            (theme.vars || theme).palette.primary.main
          }`,
        },
        "&.Mui-error::after": {
          borderBottomColor: (theme.vars || theme).palette.error.main,
        },
      }),
      input: {
        padding: "4px 0 5px",
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        "&.Mui-focused": {
          color: (theme.vars || theme).palette.primary.main,
        },
        "&.Mui-error": {
          color: (theme.vars || theme).palette.error.main,
        },
      }),
      outlined: {
        "&.MuiInputLabel-shrink": {
          transform: "translate(14px, -9px) scale(0.75)",
        },
        variants: [
          {
            props: { size: "small" },
            style: {
              transform: "translate(14px, 7px) scale(1)",
              "&.MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
            },
          },
        ],
      },
      filled: {
        transform: "translate(12px, 16px) scale(1)",
        "&.MuiInputLabel-shrink": {
          transform: "translate(12px, 7px) scale(0.75)",
        },
        variants: [
          {
            props: { size: "small" },
            style: {
              transform: "translate(12px, 13px) scale(1)",
              "&.MuiInputLabel-shrink": {
                transform: "translate(12px, 4px) scale(0.75)",
              },
            },
          },
        ],
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: 4,
        lineHeight: "calc(20/12)",
        "&.Mui-error": {
          color: (theme.vars || theme).palette.error.text,
        },
      }),
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.secondary,
        variants: [
          {
            props: { position: "start" },
            style: {
              marginRight: 8,
            },
          },
          {
            props: { position: "end" },
            style: {
              marginLeft: 8,
            },
          },
        ],
      }),
    },
  },
};
