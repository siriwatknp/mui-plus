"use client";

import { useState } from "react";
import { MuiPreview } from "@/components/ui/mui-preview";
import { Tabs, Tab, Box } from "@mui/material";

interface CodeBlock {
  code: string;
  title: string;
}

interface CodePreviewProps {
  text: string;
}

export function CodePreview({ text }: CodePreviewProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const extractCodeBlocks = (text: string): CodeBlock[] => {
    const codeBlockRegex =
      /```(?:tsx?|jsx?|javascript|typescript)?\n([\s\S]*?)```/g;
    const blocks: CodeBlock[] = [];
    let match;
    let index = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const code = match[1];
      // Try to extract a component name or use generic title
      const componentMatch = code.match(
        /(?:export\s+default\s+function\s+(\w+)|function\s+(\w+)|const\s+(\w+)\s*=)/,
      );
      const componentName =
        componentMatch?.[1] || componentMatch?.[2] || componentMatch?.[3];

      blocks.push({
        code,
        title: componentName || `Component ${index + 1}`,
      });
      index++;
    }

    return blocks;
  };

  const codeBlocks = extractCodeBlocks(text);

  // If no code blocks found, return null
  if (codeBlocks.length === 0) {
    return null;
  }

  // If only one code block, render without tabs
  if (codeBlocks.length === 1) {
    return <MuiPreview code={codeBlocks[0].code} />;
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Multiple code blocks, render with tabs
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          {codeBlocks.map((block, index) => (
            <Tab key={index} label={block.title} />
          ))}
        </Tabs>
      </Box>
      {codeBlocks.map((block, index) => {
        return (
          <Box
            key={index}
            hidden={selectedTab !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {selectedTab === index && <MuiPreview code={block.code} />}
          </Box>
        );
      })}
    </Box>
  );
}
