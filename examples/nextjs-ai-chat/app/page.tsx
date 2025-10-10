"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BotIcon, SquareIcon } from "lucide-react";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../src/mui-plus/components/ai-conversation/ai-conversation";
import {
  Message,
  MessageContent,
  MessageAvatar,
} from "../src/mui-plus/components/ai-message/ai-message";
import { Response } from "../src/mui-plus/components/ai-response/ai-response";
import { Loader } from "../src/mui-plus/components/ai-loader/ai-loader";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  type PromptInputMessage,
} from "../src/mui-plus/components/ai-prompt-input/ai-prompt-input";
import {
  Suggestions,
  Suggestion,
} from "../src/mui-plus/components/ai-suggestion/ai-suggestion";

const SUGGESTED_PROMPTS = [
  "Explain quantum computing in simple terms",
  "Write a React component for a todo list",
  "What are the best practices for API design?",
  "Create a Python function to sort a list",
];

export default function ChatPage() {
  const { messages, sendMessage, status, error, regenerate, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const [inputValue, setInputValue] = useState("");

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleSubmit = (
    message: PromptInputMessage,
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (message.text?.trim()) {
      sendMessage({ text: message.text });
      setInputValue("");
    }
  };

  const handleRetry = () => {
    regenerate();
  };

  const showSuggestions = messages.length === 0 && status === "ready";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Main Chat Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Conversation>
          <ConversationContent>
            {messages.length === 0 && status === "ready" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: 2,
                  px: 2,
                }}
              >
                <BotIcon size={48} style={{ opacity: 0.5 }} />
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 1 }}>
                    Welcome to MUI+ AI Chat
                  </Box>
                  <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                    Try one of the suggestions below or ask anything
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {messages.map((message: any) => (
                  <Message key={message.id} from={message.role}>
                    <MessageAvatar
                      name={message.role === "user" ? "User" : "AI Assistant"}
                    />
                    <MessageContent variant="flat">
                      {message.parts?.map((part: any, index: number) => {
                        if (part.type === "text") {
                          return message.role === "assistant" ? (
                            <Response key={index}>{part.text}</Response>
                          ) : (
                            <Box key={index}>{part.text}</Box>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                ))}

                {/* Loading indicator - only show before streaming starts */}
                {status === "submitted" && (
                  <Message from="assistant">
                    <MessageAvatar name="AI Assistant" />
                    <MessageContent variant="flat">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Loader />
                        <Box
                          sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                        >
                          Thinking...
                        </Box>
                      </Box>
                    </MessageContent>
                  </Message>
                )}

                {/* Error message */}
                {error && (
                  <Message from="assistant">
                    <MessageAvatar name="AI Assistant" />
                    <MessageContent variant="flat">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        <Box sx={{ color: "error.text", fontSize: "0.875rem" }}>
                          {error.message ||
                            "An error occurred. Please make sure Ollama is running."}
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleRetry}
                            sx={{ textTransform: "none" }}
                          >
                            Retry
                          </Button>
                        </Box>
                      </Box>
                    </MessageContent>
                  </Message>
                )}
              </Box>
            )}
          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          p: 2,
        }}
      >
        <Box sx={{ maxWidth: 896, mx: "auto" }}>
          {/* Suggestions */}
          {showSuggestions && (
            <Box sx={{ mb: 2 }}>
              <Suggestions>
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <Suggestion
                    key={index}
                    suggestion={prompt}
                    onClick={handleSuggestionClick}
                  />
                ))}
              </Suggestions>
            </Box>
          )}

          {/* Input Form */}
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={status === "submitted" || error != null}
              />
            </PromptInputBody>
            <PromptInputToolbar>
              <Box /> {/* Empty box for spacing */}
              {status === "streaming" ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    stop();
                  }}
                  sx={{
                    minWidth: "auto",
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <SquareIcon size={16} />
                </Button>
              ) : (
                <PromptInputSubmit
                  status={status}
                  disabled={
                    status === "submitted" ||
                    !inputValue.trim() ||
                    error != null
                  }
                />
              )}
            </PromptInputToolbar>
          </PromptInput>
        </Box>
      </Box>
    </Box>
  );
}
