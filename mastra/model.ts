import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { RuntimeContext } from "@mastra/core/di";

export type ModelProviderContext = {
  "model-provider": "openai-4o-mini" | "claude-sonnet-4";
};

export const getDynamicModel = ({
  runtimeContext,
}: {
  runtimeContext: RuntimeContext<ModelProviderContext>;
}) => {
  const provider = runtimeContext.get("model-provider");

  console.log("provider", provider);

  switch (provider) {
    case "openai-4o-mini":
      return openai("gpt-4o-mini");
    case "claude-sonnet-4":
    default:
      return anthropic("claude-sonnet-4-20250514");
  }
};
