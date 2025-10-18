"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

export default function ConversionTrackingCard() {
  return (
    <Card
      sx={theme => ({
        maxWidth: 400,
        mx: "auto",
        borderRadius: 4,
        boxShadow: theme.shadows[8],
        bgcolor: "background.paper",
        ...theme.applyStyles('dark', {
          bgcolor: "grey.900",
        }),
      })}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Conversion Badge */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label="+34% Conversion"
              icon={<AddIcon />}
              aria-label="34 percent increase in conversion rate"
              sx={theme => ({
                bgcolor: "primary.50",
                color: "primary.700",
                fontWeight: 600,
                px: 1.5,
                border: "1px solid",
                borderColor: "primary.200",
                ...theme.applyStyles('dark', {
                  bgcolor: "primary.900",
                  color: "primary.100",
                  borderColor: "primary.700",
                }),
              })}
            />
          </Box>

          {/* Illustration */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              position: "relative",
            }}
          >
            <svg
              width="320"
              height="180"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Conversion funnel illustration showing marketing touchpoints leading to conversions"
            >
              {/* Background dots */}
              <circle cx="30" cy="25" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="70" cy="15" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="120" cy="20" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="180" cy="15" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="230" cy="25" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="280" cy="20" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="20" cy="65" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="80" cy="55" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="240" cy="60" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="290" cy="70" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="25" cy="120" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="85" cy="130" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="235" cy="125" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="285" cy="135" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="50" cy="155" r="2.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="270" cy="160" r="2.5" fill="#8B5CF6" opacity="0.4" />

              {/* Main funnel structure */}
              <path
                d="M100 40 L220 40 L200 110 L120 110 Z"
                stroke="#9CA3AF"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="8 4"
                opacity="1"
              />
              
              {/* Secondary funnel layer */}
              <path
                d="M120 65 L200 65 L185 95 L135 95 Z"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 3"
                opacity="0.7"
              />

              {/* Connection lines from touchpoints */}
              <path
                d="M60 30 L100 50"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <path
                d="M260 35 L220 50"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <path
                d="M50 75 L100 75"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <path
                d="M270 80 L220 75"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <path
                d="M60 140 L120 100"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <path
                d="M260 145 L200 100"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />

              {/* Key conversion points */}
              <circle cx="130" cy="55" r="3" fill="#8B5CF6" />
              <circle cx="190" cy="55" r="3" fill="#8B5CF6" />
              <circle cx="160" cy="80" r="4" fill="#8B5CF6" />
              <circle cx="150" cy="100" r="3" fill="#8B5CF6" />
              <circle cx="170" cy="100" r="3" fill="#8B5CF6" />

              {/* Lightning bolt icon */}
              <g transform="translate(152, 72)">
                <path
                  d="M6 0 L0 10 L4 10 L3 18 L9 8 L5 8 L6 0 Z"
                  fill="#8B5CF6"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                />
              </g>
            </svg>
          </Box>

          {/* Typography Section */}
          <Stack spacing={1.5}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.2,
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Track What Converts.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              Connect marketing activities to actual business results. Track lift,
              optimize fast, and double down on what drives growth.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}