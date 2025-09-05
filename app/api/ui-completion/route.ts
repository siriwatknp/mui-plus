import { mastra } from "@/mastra";
import { UIMessage } from "ai";
import { RuntimeContext } from "@mastra/core/di";
import { ModelProviderContext } from "@/mastra/model";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    modelProvider = "claude-sonnet-4",
  }: {
    messages: UIMessage[];
    modelProvider?: "openai-4o-mini" | "claude-sonnet-4";
  } = await req.json();

  try {
    const myAgent = mastra.getAgent("muiEngineer");

    // Create runtime context with model provider selection
    const runtimeContext = new RuntimeContext<ModelProviderContext>();
    runtimeContext.set("model-provider", modelProvider);

    // Use streamVNext with AI SDK v5 format (experimental)
    const stream = await myAgent.streamVNext(messages, {
      format: "aisdk",
      runtimeContext,
    });

    return stream.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error executing workflow:", error);

    // Return an error response
    return new Response(
      JSON.stringify({
        error: "Failed to execute workflow",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
