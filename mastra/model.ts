import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { RuntimeContext } from "@mastra/core/di";

export type ModelProviderContext = {
  "model-provider": "openai-4o-mini" | "claude-sonnet-4" | "gemini-2.5-flash";
};

export const getDynamicModel = ({
  runtimeContext,
}: {
  runtimeContext: RuntimeContext<ModelProviderContext>;
}) => {
  const provider = runtimeContext.get("model-provider");

  switch (provider) {
    case "openai-4o-mini":
      return openai("gpt-4o-mini");
    case "claude-sonnet-4":
      return anthropic("claude-sonnet-4-20250514");
    case "gemini-2.5-flash":
    default:
      return google("gemini-2.5-flash");
  }
};
