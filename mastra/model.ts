import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

export const model = anthropic("claude-sonnet-4-20250514");
// export const model = google("gemini-2.5-flash");
