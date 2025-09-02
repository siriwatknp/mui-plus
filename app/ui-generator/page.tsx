"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import { AutoAwesome, Clear, ContentCopy, Build } from "@mui/icons-material";
import { useState } from "react";

const examplePrompts = [
  "A login form with email and password fields",
  "A dashboard card showing user statistics",
  "A product card with image, title, price and buy button",
  "A navigation sidebar with menu items",
  "A user profile card with avatar and details",
];

export default function UIGeneratorPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputText, setInputText] = useState("");

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ui-completion",
    }),
  });

  console.log("messages", messages);

  // Get completion from all assistant messages
  const completion = messages
    .filter((m) => m.role === "assistant")
    .map((m) => {
      // Extract text from parts
      return m.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
    })
    .join("\n");

  const handleExampleClick = (prompt: string) => {
    setInputText(prompt);
  };

  const handleClear = () => {
    setInputText("");
    stop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage({ text: inputText });
      setInputText("");
    }
  };

  const extractCode = (text: string) => {
    const codeMatch = text.match(/```tsx?\n([\s\S]*?)```/);
    return codeMatch ? codeMatch[1] : null;
  };

  const handleCopyCode = () => {
    const code = extractCode(completion);
    if (code) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const code = extractCode(completion);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            AI UI Generator
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate Material UI components using AI. Powered by Mastra and
            Vercel AI SDK.
          </Typography>
        </Box>

        {/* Input Form */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                label="Describe the UI component you want to create"
                placeholder="e.g., Create a modern login form with email and password fields, remember me checkbox, and social login buttons"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={status === "streaming" || status === "submitted"}
              />

              {/* Example Prompts */}
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Try these examples:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {examplePrompts.map((prompt, index) => (
                    <Chip
                      key={index}
                      label={prompt}
                      onClick={() => handleExampleClick(prompt)}
                      variant="outlined"
                      size="small"
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    status === "streaming" || status === "submitted" ? (
                      <CircularProgress size={20} />
                    ) : (
                      <AutoAwesome />
                    )
                  }
                  disabled={
                    status === "streaming" ||
                    status === "submitted" ||
                    !inputText.trim()
                  }
                  sx={{ minWidth: 150 }}
                >
                  {status === "streaming" || status === "submitted"
                    ? "Generating..."
                    : "Generate UI"}
                </Button>
                {(status === "streaming" || status === "submitted") && (
                  <Button variant="outlined" onClick={stop} color="error">
                    Stop
                  </Button>
                )}
                {(completion || inputText) &&
                  status !== "streaming" &&
                  status !== "submitted" && (
                    <Button
                      variant="outlined"
                      startIcon={<Clear />}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  )}
              </Stack>
            </Stack>
          </form>
        </Paper>

        {/* Output Display */}
        {messages.length > 0 && (
          <Stack spacing={3}>
            {/* Messages Display */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Generation Process</Typography>
                  {code && (
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={handleCopyCode}
                      variant="outlined"
                    >
                      {copiedCode ? "Copied!" : "Copy Code"}
                    </Button>
                  )}
                </Box>

                <Stack>
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index}>
                              <Streamdown>{part.text}</Streamdown>
                            </div>
                          );
                        }
                        if (part.type === "tool-planningWorkflow") {
                          if (part.state === "output-available") {
                            const {
                              result: { designSummary, designAnalysis },
                            } =
                              (part.output as {
                                result: {
                                  designSummary: string;
                                  designAnalysis: string;
                                };
                              }) || {};

                            return (
                              <div key={index}>
                                <Streamdown>{designSummary}</Streamdown>
                                <Divider />
                                <Streamdown>{designAnalysis}</Streamdown>
                              </div>
                            );
                          }
                          if (part.state !== "output-error") {
                            return (
                              <div key={index}>
                                <Streamdown>Planning the design...</Streamdown>
                              </div>
                            );
                          }
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Paper>

            {/* Info Alert */}
            <Alert severity="info">
              The generated code uses Material UI components. Make sure you have
              the required dependencies installed in your project.
            </Alert>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
