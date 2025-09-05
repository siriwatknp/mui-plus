import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const exploreRegistryTool = createTool({
  id: "explore-registry",
  description: "Explore the MUI registry",
  inputSchema: z.object({
    enabled: z.boolean().optional(),
  }),
  outputSchema: z.object({
    registries: z.array(
      z.object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        meta: z.object({
          screenshot: z.string(),
          category: z.string(),
        }),
      }),
    ),
  }),
  execute: async () => {
    console.log("Explore Registry...");
    const registry = await fetch("https://mui-plus.dev/r/registry.json");
    const registryData = await registry.json();
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registries: registryData.items.map((item: any) => ({
        name: item.name,
        title: item.title,
        description: item.description,
        meta: {
          screenshot: item.meta.screenshot,
          category: item.meta.category,
        },
      })),
    };
  },
});
