"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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
import { CodeBlock } from "@/registry/components/ai-code-block/ai-code-block";
import { CopyIcon, SparklesIcon, XIcon } from "lucide-react";
import { Suggestion } from "@/registry/components/ai-suggestion/ai-suggestion";

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
                    // Check if the text contains code blocks
                    const codeInText = extractCode(part.text);
                    if (codeInText && message.role === "assistant") {
                      // Split the text to show non-code parts as Response and code as CodeBlock
                      const beforeCode = part.text.substring(
                        0,
                        part.text.indexOf("```")
                      );
                      const afterCode = part.text.substring(
                        part.text.lastIndexOf("```") + 3
                      );

                      return (
                        <div key={`${message.id}-${i}`} className="space-y-4">
                          {beforeCode && <Response>{beforeCode}</Response>}
                          <div className="relative">
                            <CodeBlock language="tsx" code={codeInText} />
                            <button
                              onClick={handleCopyCode}
                              className="absolute top-2 right-2 p-2 rounded-md bg-background/80 hover:bg-background border"
                              title={copiedCode ? "Copied!" : "Copy code"}
                            >
                              <CopyIcon className="h-4 w-4" />
                            </button>
                          </div>
                          {afterCode && <Response>{afterCode}</Response>}
                        </div>
                      );
                    }
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.text}
                      </Response>
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

                  return null;
                })}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && <Loader />}
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
            {completion && status !== "streaming" && status !== "submitted" && (
              <PromptInputButton variant="ghost" onClick={handleClear}>
                <XIcon className="h-4 w-4" />
                <span>Clear</span>
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
