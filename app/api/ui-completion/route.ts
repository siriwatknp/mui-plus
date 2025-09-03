import { mastra } from "@/mastra";
import { UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const myAgent = mastra.getAgent("muiEngineer");

    // Use streamVNext with AI SDK v5 format (experimental)
    const stream = await myAgent.streamVNext(messages, {
      format: "aisdk",
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
