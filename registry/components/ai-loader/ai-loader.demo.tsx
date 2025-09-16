"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Loader } from "./ai-loader";

export default function AILoaderDemo() {
  return (
    <Box sx={{ width: "100%", maxWidth: 768, mx: "auto", p: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
          >
            Loader Sizes
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Loader size={12} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                12px
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Loader size={16} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                16px (default)
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Loader size={24} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                24px
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Loader size={32} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                32px
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
          >
            Loader in Context
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1.5,
              }}
            >
              <Loader size={16} />
              <Typography variant="body2">Loading content...</Typography>
            </Paper>

            <Button
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
              }}
              startIcon={<Loader size={14} />}
            >
              Processing
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
