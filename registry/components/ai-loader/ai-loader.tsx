"use client";

import CircularProgress from "@mui/material/CircularProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

export type LoaderProps = CircularProgressProps;

export const Loader = (props: LoaderProps) => (
  <CircularProgress size={16} thickness={5} {...props} />
);
