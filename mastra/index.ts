import { Mastra } from "@mastra/core/mastra";
import { serve } from "@mastra/inngest";
import { realtimeMiddleware } from "@inngest/realtime";
import { Inngest } from "inngest";
import { PinoLogger } from "@mastra/loggers";
import { DefaultStorage } from "@mastra/libsql";
import { planningWorkflow } from "./workflows/planning";
import { uxuiDesigner } from "./agents/uxui-designer";
import { muiEngineer } from "./agents/mui-engineer";

const storage = new DefaultStorage({
  url: ":memory:",
});

const logger = new PinoLogger({
  name: "Mastra",
  level: "info",
});

export const mastra = new Mastra({
  agents: { muiEngineer, uxuiDesigner },
  workflows: { planningWorkflow },
  storage,
  logger,
  server:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          host: "0.0.0.0",
          apiRoutes: [
            {
              path: "/inngest/api",
              method: "ALL",
              createHandler: async ({ mastra }) =>
                serve({
                  mastra,
                  inngest: new Inngest({
                    id: "mastra",
                    baseUrl: "http://localhost:8288",
                    isDev: true,
                    middleware: [realtimeMiddleware()],
                  }),
                }),
            },
          ],
        },
  telemetry: {
    enabled: process.env.NODE_ENV !== "production",
  },
});
