"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  Diamond as DiamondIcon,
  CardGiftcard as CardGiftcardIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

export default function InviteCard() {
  const [inviteLink] = React.useState("https://wimt/alexsmith");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const features = [
    {
      icon: <LinkIcon />,
      text: "Share a link"
    },
    {
      icon: <CardGiftcardIcon />,
      text: "Your friend gets 30 credits when they subscribe"
    },
    {
      icon: <DiamondIcon />,
      text: "You receive 30 credits for each referral"
    }
  ];

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      {/* Header with gradient background */}
      <Box
        sx={{
          height: 160,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Abstract shapes overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg viewBox=\"0 0 400 200\" xmlns=\"http://www.w3.org/2000/svg\"><defs><linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"%23667eea\" stop-opacity=\"0.3\"/><stop offset=\"100%\" stop-color=\"%23764ba2\" stop-opacity=\"0.5\"/></linearGradient></defs><ellipse cx=\"100\" cy=\"50\" rx=\"80\" ry=\"40\" fill=\"url(%23grad1)\" transform=\"rotate(45 100 50)\"/><ellipse cx=\"300\" cy=\"150\" rx=\"60\" ry=\"80\" fill=\"%23f093fb\" fill-opacity=\"0.4\" transform=\"rotate(-30 300 150)\"/><circle cx=\"350\" cy=\"30\" r=\"30\" fill=\"%23f5576c\" fill-opacity=\"0.3\"/></svg>')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          {/* Title */}
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              color: "text.primary",
              mb: 1 
            }}
          >
            Invite & Profit
          </Typography>

          {/* How it works section */}
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "text.secondary", 
                mb: 2,
                fontWeight: 500 
              }}
            >
              How it works:
            </Typography>

            <List sx={{ p: 0 }}>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        color: "text.primary",
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.text}
                    primaryTypographyProps={{
                      variant: "body1",
                      color: "text.primary",
                      fontWeight: 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Invite link section */}
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "text.secondary", 
                mb: 2,
                fontWeight: 500 
              }}
            >
              Your invite link:
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                value={inviteLink}
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <LinkIcon 
                        sx={{ 
                          color: "text.secondary", 
                          mr: 1, 
                          fontSize: 20 
                        }} 
                      />
                    ),
                  },
                  htmlInput: {
                    style: { 
                      cursor: "default",
                      color: "inherit" 
                    }
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "grey.50",
                    ...theme => theme.applyStyles('dark', {
                      bgcolor: "grey.900",
                    }),
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleCopy}
                sx={{
                  bgcolor: "grey.900",
                  color: "white",
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  minWidth: 80,
                  "&:hover": {
                    bgcolor: "grey.800",
                    transform: "translateY(-1px)",
                    boxShadow: 2,
                  },
                  ...theme => theme.applyStyles('dark', {
                    bgcolor: "grey.100",
                    color: "grey.900",
                    "&:hover": {
                      bgcolor: "grey.200",
                      transform: "translateY(-1px)",
                      boxShadow: 2,
                    },
                  }),
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}