"use client";

import Box from "@mui/material/Box";
import type { Experimental_GeneratedImage } from "ai";
import type { ComponentProps } from "react";

export type ImageProps = Experimental_GeneratedImage &
  ComponentProps<typeof Box> & {
    alt?: string;
  };

export const Image = ({
  base64,
  uint8Array,
  mediaType,
  alt,
  sx,
  ...props
}: ImageProps) => (
  <Box
    component="img"
    alt={alt}
    src={`data:${mediaType};base64,${base64}`}
    sx={{
      height: "auto",
      maxWidth: "100%",
      overflow: "hidden",
      borderRadius: 1,
      ...sx,
    }}
    {...props}
  />
);
