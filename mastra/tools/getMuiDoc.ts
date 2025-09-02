import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const getMuiDocTool = createTool({
  id: "get-mui-doc",
  description: "Get the MUI documentation from the given urls",
  inputSchema: z.object({
    urls: z.array(z.string()),
  }),
  outputSchema: z.object({
    content: z.string(),
  }),
  execute: async ({ context: { urls } }) => {
    const content = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(
          url.endsWith(".md") ? url : `${url.replace(/\/$/, "")}.md`
        );
        const text = await response.text();
        return text;
      })
    );
    return { content: content.join("\n\n") };
  },
});
