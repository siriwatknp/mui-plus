"use client";

import { useState } from "react";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "./ai-tool";

export default function AIToolDemo() {
  const [openTools, setOpenTools] = useState<number[]>([0]);

  const toggleTool = (index: number) => {
    setOpenTools((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const tools = [
    {
      type: "search_web",
      state: "output-available" as const,
      input: {
        query: "React 18 features",
        limit: 5,
      },
      output:
        "Found 5 relevant results about React 18 features including automatic batching, transitions, and suspense improvements.",
    },
    {
      type: "read_file",
      state: "input-available" as const,
      input: {
        path: "/src/components/Button.tsx",
      },
      output: null,
    },
    {
      type: "execute_code",
      state: "output-error" as const,
      input: {
        language: "javascript",
        code: "console.log('Hello')",
      },
      errorText: "Permission denied: Cannot execute code in sandbox mode",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Tool Components
        </h3>
        <p className="text-sm text-muted-foreground">
          Display AI tool invocations with their inputs and outputs.
        </p>

        <div className="space-y-3">
          {tools.map((tool, index) => (
            <Tool
              key={index}
              open={openTools.includes(index)}
              onOpenChange={(open) =>
                open !== openTools.includes(index) && toggleTool(index)
              }
            >
              <ToolHeader type={tool.type} state={tool.state} />
              <ToolContent>
                <ToolInput input={tool.input} />
                {(tool.output || tool.errorText) && (
                  <ToolOutput output={tool.output} errorText={tool.errorText} />
                )}
              </ToolContent>
            </Tool>
          ))}
        </div>
      </div>
    </div>
  );
}
