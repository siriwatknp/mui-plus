import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const getRegistryItemTool = createTool({
  id: "get-registry-item",
  description: "Get the MUI registry item",
  inputSchema: z.object({
    name: z.string(),
  }),
  outputSchema: z.object({
    files: z.array(
      z.object({
        content: z.string(),
      }),
    ),
  }),
  execute: async ({ context: { name } }) => {
    const registry = await fetch(`https://mui-plus.dev/r/${name}.json`);
    const registryData = await registry.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files = registryData.files.map((file: any) => ({
      content: file.content,
    }));
    return { files };
  },
});
