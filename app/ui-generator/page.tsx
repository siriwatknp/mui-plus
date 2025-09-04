"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIDataTypes } from "ai";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/components/ai-conversation/ai-conversation";
import {
  Message,
  MessageContent,
} from "@/registry/components/ai-message/ai-message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/registry/components/ai-prompt-input/ai-prompt-input";
import { Response } from "@/registry/components/ai-response/ai-response";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/registry/components/ai-reasoning/ai-reasoning";
import { Loader } from "@/registry/components/ai-loader/ai-loader";
import { SparklesIcon, XIcon } from "lucide-react";
import { Suggestion } from "@/registry/components/ai-suggestion/ai-suggestion";
import { CodePreview } from "@/components/ui/code-preview";

const examplePrompts = [
  "A login form with email and password fields",
  "A dashboard card showing user statistics",
  "A product card with image, title, price and buy button",
  "A navigation sidebar with menu items",
  "A user profile card with avatar and details",
];

type ModelProvider = "openai-4o-mini" | "claude-sonnet-4" | "gemini-2.5-flash";

export default function UIGeneratorPage() {
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] =
    useState<ModelProvider>("gemini-2.5-flash");

  const { messages, sendMessage, status, stop, error } = useChat<
    UIMessage<
      unknown,
      UIDataTypes,
      {
        planningWorkflow: {
          input: { prompt: string };
          output:
            | {
                status: "success" | "error";
                steps: {
                  "design-step": {
                    output: {
                      designAnalysis: string;
                      designSummary: string;
                      muiUrls: string[];
                      registryItems: string[];
                    };
                  };
                };
                result: {
                  designAnalysis: string;
                  designSummary: string;
                  muiUrls: string[];
                  registryItems: string[];
                };
              }
            | undefined;
        };
        getMuiDoc: {
          input: {
            urls: string[];
          };
          output: {
            content: string;
          };
        };
        getRegistryItem: {
          input: {
            name: string;
          };
          output: {
            files: { content: string }[];
          };
        };
      }
    >
  >({
    transport: new DefaultChatTransport({
      api: "/api/ui-completion",
    }),
  });

  const handleExampleClick = (prompt: string) => {
    setInputText(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(
        { text: inputText },
        { body: { modelProvider: selectedModel } }
      );
      setInputText("");
    }
  };

  const lastMsgPart = messages.slice(-1)[0]?.parts.slice(-1)[0];
  const previewText =
    !!lastMsgPart && lastMsgPart.type === "text" && lastMsgPart.state === "done"
      ? lastMsgPart.text
      : "";

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">AI UI Generator</h1>
        <p className="text-muted-foreground">
          Generate Material UI components using AI. Powered by Mastra and Vercel
          AI SDK.
        </p>
      </div>

      <Conversation className="flex-1 mb-4">
        <ConversationContent>
          {/* Show example prompts when no messages */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 p-4">
              <p className="w-full text-sm text-muted-foreground mb-2">
                Try these examples:
              </p>
              {examplePrompts.map((prompt, index) => (
                <Suggestion
                  key={index}
                  suggestion={prompt}
                  onClick={() => handleExampleClick(prompt)}
                  className="cursor-pointer"
                >
                  {prompt}
                </Suggestion>
              ))}
            </div>
          )}

          {/* Display messages */}
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.text}
                      </Response>
                    );
                  }

                  if (part.type === "tool-planningWorkflow") {
                    if (part.state === "output-available") {
                      const { designSummary, designAnalysis } =
                        part.output?.result || {};

                      return (
                        <div key={`${message.id}-${i}`} className="space-y-4">
                          <Response>{designSummary}</Response>
                          <hr className="border-border" />
                          <Response>{designAnalysis}</Response>
                        </div>
                      );
                    }
                    if (part.state !== "output-error") {
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={true}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>
                            Planning the design...
                          </ReasoningContent>
                        </Reasoning>
                      );
                    }
                  }

                  if (part.type === "tool-getMuiDoc") {
                    if (part.state !== "output-available") {
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={true}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>
                            Fetching MUI documentation...
                          </ReasoningContent>
                        </Reasoning>
                      );
                    }
                  }

                  // Handle error states for tool parts
                  if (
                    part.type.startsWith("tool-") &&
                    "state" in part &&
                    part.state === "output-error"
                  ) {
                    return (
                      <div key={`${message.id}-${i}`} className="space-y-2">
                        <Response>
                          An error occurred while processing your request.
                        </Response>
                        <PromptInputButton
                          variant="outline"
                          onClick={() =>
                            sendMessage(
                              {
                                text: "Continue the task",
                              },
                              { body: { modelProvider: selectedModel } }
                            )
                          }
                        >
                          Try Again
                        </PromptInputButton>
                      </div>
                    );
                  }

                  return null;
                })}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && <Loader />}
          {status === "error" && (
            <div className="space-y-2">
              <Response>{error?.message}</Response>
              <PromptInputButton
                size="default"
                variant="outline"
                onClick={() =>
                  sendMessage(
                    {
                      text: "Continue the task",
                    },
                    { body: { modelProvider: selectedModel } }
                  )
                }
              >
                Try Again
              </PromptInputButton>
            </div>
          )}
          {previewText && <CodePreview text={previewText} />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea
          placeholder="Describe the UI component you want to create"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={status === "streaming" || status === "submitted"}
        />
        <PromptInputToolbar>
          <div className="flex items-center gap-2">
            <select
              aria-label="Model Provider"
              value={selectedModel}
              onChange={(e) =>
                setSelectedModel(e.target.value as ModelProvider)
              }
              disabled={status === "streaming" || status === "submitted"}
              className="text-sm bg-background border border-border rounded-md px-2 py-1 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="openai-4o-mini">OpenAI GPT-4o Mini</option>
              <option value="claude-sonnet-4">Claude Sonnet 4</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            </select>
          </div>
          <PromptInputTools>
            {(status === "streaming" || status === "submitted") && (
              <PromptInputButton
                variant="ghost"
                onClick={stop}
                className="text-destructive"
              >
                <XIcon className="h-4 w-4" />
                <span>Stop</span>
              </PromptInputButton>
            )}
          </PromptInputTools>
          <PromptInputSubmit
            disabled={
              status === "streaming" ||
              status === "submitted" ||
              !inputText.trim()
            }
            size="default"
            status={status}
          >
            {status === "streaming" || status === "submitted" ? (
              "Generating..."
            ) : (
              <>
                <SparklesIcon className="h-4 w-4" />
                Generate UI
              </>
            )}
          </PromptInputSubmit>
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
