import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { uxuiDesigner } from "../agents/uxui-designer";

const designStep = createStep({
  id: "design-step",
  inputSchema: z.object({
    prompt: z.string(),
  }),
  outputSchema: z.object({
    designAnalysis: z.string(),
    designSummary: z.string(),
    muiUrls: z.array(z.string()),
  }),
  execute: async ({ inputData }) => {
    const result = await uxuiDesigner.streamVNext(inputData.prompt, {
      output: z.object({
        designAnalysis: z.string(),
        designSummary: z.string(),
        muiUrls: z.array(z.string()),
      }),
      onFinish: ({ text }) => {
        console.log(text);
      },
    });

    return result.object;
  },
});

export const planningWorkflow = createWorkflow({
  id: "planning",
  inputSchema: z.object({
    prompt: z.string(),
  }),
  outputSchema: z.object({
    designAnalysis: z.string(),
    designSummary: z.string(),
    muiUrls: z.array(z.string()),
  }),
})
  .then(designStep)
  .commit();
