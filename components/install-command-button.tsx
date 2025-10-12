"use client";

import React from "react";
import { Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallCommandButtonProps {
  itemName: string;
  className?: string;
}

export function InstallCommandButton({
  itemName,
  className,
}: InstallCommandButtonProps) {
  const [copiedType, setCopiedType] = React.useState<"ts" | "js" | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleCopy = async (type: "ts" | "js") => {
    const extension = type === "ts" ? ".json" : ".js.json";
    const cliCommand = `npx shadcn@latest add ${baseUrl}/r/${itemName}${extension}`;
    await navigator.clipboard.writeText(cliCommand);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div
      className={cn("inline-flex rounded-md border border-input", className)}
    >
      <button
        onClick={() => handleCopy("ts")}
        className="inline-flex items-center px-3 py-1.5 text-xs font-mono border-r border-input hover:bg-accent hover:text-accent-foreground transition-colors rounded-l-md"
      >
        {copiedType === "ts" ? (
          <Check className="h-3 w-3 mr-1.5" />
        ) : (
          <Terminal className="h-3 w-3 mr-1.5" />
        )}
        npx shadcn (TS)
      </button>
      <button
        onClick={() => handleCopy("js")}
        className="inline-flex justify-center items-center px-3 py-1.5 text-xs font-mono hover:bg-accent hover:text-accent-foreground transition-colors rounded-r-md min-w-[111.46px]"
      >
        {copiedType === "js" ? (
          <Check className="h-3 w-3 mr-1.5" />
        ) : (
          "npx shadcn (JS)"
        )}
      </button>
    </div>
  );
}
