import { createTool } from "@mastra/core/tools";
import { z } from "zod";

function trimContent(content: string, maxLength: number = 10000): string {
  if (content.length <= maxLength) {
    return content;
  }

  let trimmedContent = content;
  const h3Regex = /^###\s+.+$/gm;
  const h3Matches = [...content.matchAll(h3Regex)];

  // Remove h3 sections from the end until we're under the limit
  for (
    let i = h3Matches.length - 1;
    i >= 0 && trimmedContent.length > maxLength;
    i--
  ) {
    const h3Match = h3Matches[i];
    const h3Index = h3Match.index!;

    // Find the next h3 or h2 section to determine where this section ends
    const nextSectionRegex = /^(##|###)\s+.+$/gm;
    nextSectionRegex.lastIndex = h3Index + h3Match[0].length;
    const nextMatch = nextSectionRegex.exec(trimmedContent);

    const endIndex = nextMatch ? nextMatch.index! : trimmedContent.length;

    // Remove this h3 section
    trimmedContent =
      trimmedContent.slice(0, h3Index) + trimmedContent.slice(endIndex);
  }

  return trimmedContent;
}

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
          url.endsWith(".md") ? url : `${url.replace(/\/$/, "")}.md`,
        );
        const text = await response.text();
        return trimContent(text, 100000 / urls.length);
      }),
    );
    return { content: content.join("\n\n") };
  },
});
