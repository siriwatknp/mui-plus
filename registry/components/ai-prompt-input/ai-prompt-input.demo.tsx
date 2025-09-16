"use client";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
} from "./ai-prompt-input";
import { PaperclipIcon, ImageIcon, MicIcon } from "lucide-react";

export default function AIPromptInputDemo() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("Message:", formData.get("message"));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Basic Prompt Input
        </h3>
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea placeholder="Ask me anything..." />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton onClick={() => console.log("Attach")}>
                <PaperclipIcon className="size-4" />
              </PromptInputButton>
              <PromptInputButton onClick={() => console.log("Image")}>
                <ImageIcon className="size-4" />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Additional Tools
        </h3>
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea placeholder="Type your message here..." />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton onClick={() => console.log("Attach")}>
                <PaperclipIcon className="size-4" />
                <span className="text-xs">Attach</span>
              </PromptInputButton>
              <PromptInputButton onClick={() => console.log("Image")}>
                <ImageIcon className="size-4" />
                <span className="text-xs">Image</span>
              </PromptInputButton>
              <PromptInputButton onClick={() => console.log("Voice")}>
                <MicIcon className="size-4" />
                <span className="text-xs">Voice</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Loading State
        </h3>
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea placeholder="Processing..." disabled />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton disabled>
                <PaperclipIcon className="size-4" />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit status="streaming" disabled />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
