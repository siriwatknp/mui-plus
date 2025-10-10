import { ollama } from "ollama-ai-provider-v2";
import { convertToModelMessages, streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert UIMessage[] to ModelMessage[] format
    const modelMessages = convertToModelMessages(messages);

    const result = streamText({
      model: ollama("llama3.2"),
      messages: modelMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request. Make sure Ollama is running.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
