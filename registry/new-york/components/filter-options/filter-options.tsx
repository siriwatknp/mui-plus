"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";

export interface FilterOption {
  id: string;
  label: string;
  selected?: boolean;
}

export interface FilterOptionsProps {
  title?: string;
  subtitle?: string;
  options: FilterOption[];
  showMoreCount?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function FilterOptions({ 
  title = "Amenities",
  subtitle = "Essentials", 
  options = [],
  showMoreCount = 6,
  onSelectionChange
}: FilterOptionsProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    options.filter(option => option.selected).map(option => option.id)
  );
  const [showAll, setShowAll] = React.useState(false);

  const visibleOptions = showAll ? options : options.slice(0, showMoreCount);
  const hiddenCount = Math.max(0, options.length - showMoreCount);

  const handleChipClick = React.useCallback((optionId: string) => {
    setSelectedIds(prev => {
      const newSelection = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  }, [onSelectionChange]);

  const handleShowMoreClick = React.useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ mb: 2 }}
      >
        {subtitle}
      </Typography>

      <Box 
        sx={{ 
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mb: hiddenCount > 0 ? 2 : 0,
          maxWidth: "600px",
          rowGap: 1.5
        }}
      >
        {visibleOptions.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          
          return (
            <Chip
              key={option.id}
              label={option.label}
              icon={isSelected ? <CheckIcon /> : undefined}
              onClick={() => handleChipClick(option.id)}
              variant={isSelected ? "filled" : "outlined"}
              sx={theme => ({
                borderRadius: 8,
                height: 44,
                fontSize: "0.875rem",
                fontWeight: 500,
                "& .MuiChip-label": {
                  px: 2,
                  py: 1,
                },
                "& .MuiChip-icon": {
                  fontSize: "1rem",
                  ml: 1.5,
                  mr: 0.5,
                },
                "&:focus-visible": {
                  outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
                  outlineOffset: 2,
                },
                ...(!isSelected && {
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "text.secondary",
                  },
                }),
                ...(isSelected && {
                  bgcolor: "#1a1a1a",
                  color: "white",
                  border: "1px solid #1a1a1a",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                  "&:hover": {
                    bgcolor: "#2a2a2a",
                  },
                  ...theme.applyStyles("dark", {
                    bgcolor: "white",
                    color: "#1a1a1a",
                    border: "1px solid white",
                    "& .MuiChip-icon": {
                      color: "#1a1a1a",
                    },
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }),
                }),
              })}
            />
          );
        })}
      </Box>

      {hiddenCount > 0 && (
        <Button
          variant="text"
          onClick={handleShowMoreClick}
          sx={{
            textTransform: "none",
            fontWeight: 400,
            p: 0,
            minWidth: "auto",
            justifyContent: "flex-start",
            color: "primary.main",
            "&:hover": {
              bgcolor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {showAll ? "Show less..." : `Show more...`}
        </Button>
      )}
    </Box>
  );
}