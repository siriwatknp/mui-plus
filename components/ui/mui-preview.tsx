"use client";

import { useMemo, useState } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { LIVE_EDITOR_SCOPE } from "@/lib/live-editor-scope";
import { Box, Button, Portal } from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import type { HTMLAttributes } from "react";

export type LivePreviewProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The code string to render in the live preview
   */
  code: string;
  /**
   * Whether to show live preview errors
   * @default true
   */
  showErrors?: boolean;
  /**
   * Custom background color for the preview area
   */
  backgroundColor?: string;
  /**
   * Minimum height for the preview area
   * @default "200px"
   */
  minHeight?: string | number;
  /**
   * Custom padding for the preview area
   * @default 6 (48px)
   */
  padding?: number | string;
};

/**
 * A live preview component for MUI components that renders React/TSX code
 * using react-live with the MUI component scope pre-configured.
 */
export const MuiPreview = ({
  code,
  showErrors = true,
  className,
  style,
  ...props
}: LivePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Clean up the code - remove imports and add render function
  const cleanCode = useMemo(() => {
    if (!code.trim()) return "";

    // Remove markdown code block syntax if present
    let cleaned = code.replace(/^```tsx?\n?/, "").replace(/```$/, "");

    // Remove all import statements
    cleaned = cleaned.replace(/^import\s+[^;]+;\s*$/gm, "");

    // Remove all export statements (including export default, export {}, etc.)
    // But preserve const/let/var declarations by only removing the export keyword
    cleaned = cleaned.replace(/^export\s+(default\s+)/gm, "");
    cleaned = cleaned.replace(/^export\s+(const|let|var)\s+/gm, "$1 ");
    cleaned = cleaned.replace(/^export\s+(function|class)\s+/gm, "$1 ");
    cleaned = cleaned.replace(/^export\s*\{[^}]*\}\s*;?\s*$/gm, "");

    // Normalize icon usage - remove "Icon" suffix from JSX elements
    // This ensures compatibility with the live editor scope naming convention
    // Examples: <FavoriteIcon /> → <Favorite />, <ShoppingCartIcon> → <ShoppingCart>
    // Using word boundary approach to handle multiline JSX safely
    cleaned = cleaned.replace(/<([A-Z]\w*?)Icon\b/g, "<$1");
    cleaned = cleaned.replace(/<\/([A-Z]\w*?)Icon>/g, "</$1>");

    // Remove extra blank lines
    cleaned = cleaned.replace(/\n\s*\n\s*\n/g, "\n\n");
    cleaned = cleaned.trim();

    if (!cleaned) return "";

    // Extract component name - try different patterns
    let componentName = "";

    // Try to find function ComponentName (now without export)
    let match = cleaned.match(/function\s+(\w+)/);
    if (match) {
      componentName = match[1];
    } else {
      // Try to find const ComponentName =
      match = cleaned.match(/(?:const|let|var)\s+(\w+)\s*=/);
      if (match) {
        componentName = match[1];
      }
    }

    // Add render call if component name is found
    if (componentName) {
      cleaned += `\n\nrender(<${componentName} />);`;
    }

    return cleaned;
  }, [code]);

  console.log("cleanCode", cleanCode);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const previewContent = (
    <Box
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        ...(isFullscreen && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: (theme.vars || theme).zIndex.modal,
          borderRadius: 0,
          border: "none",
          overflow: "auto",
        }),
      })}
    >
      <LiveProvider code={cleanCode} scope={LIVE_EDITOR_SCOPE} noInline>
        {/* Header with fullscreen toggle */}
        <Button
          variant="contained"
          size="small"
          onClick={handleFullscreenToggle}
          sx={{
            position: isFullscreen ? "fixed" : "absolute",
            top: 8,
            right: 8,
            zIndex: 1000,
            border: "2px solid #e5e5e5",
          }}
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </Button>

        <PreviewWithErrorBoundary />

        {/* Error area */}
        {showErrors && (
          <LiveError
            style={{
              padding: "16px",
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              color: "#d32f2f",
              fontSize: "14px",
              fontFamily: "monospace",
              borderTop: "1px solid rgba(211, 47, 47, 0.2)",
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          />
        )}
      </LiveProvider>
    </Box>
  );

  return (
    <>
      {isFullscreen ? (
        <Portal>{previewContent}</Portal>
      ) : (
        <Box className={className} style={style} {...props}>
          {previewContent}
        </Box>
      )}
    </>
  );
};

// Error boundary component for the preview
const PreviewWithErrorBoundary = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LivePreview style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};
