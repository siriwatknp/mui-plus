"use client";

import { Loader } from "./ai-loader";

export default function AILoaderDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Loader Sizes
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Loader size={12} />
            <span className="text-xs text-muted-foreground">12px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size={16} />
            <span className="text-xs text-muted-foreground">
              16px (default)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size={24} />
            <span className="text-xs text-muted-foreground">24px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size={32} />
            <span className="text-xs text-muted-foreground">32px</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Loader in Context
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 border rounded-lg">
            <Loader size={16} />
            <span className="text-sm">Loading content...</span>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
            <Loader size={14} />
            Processing
          </button>
        </div>
      </div>
    </div>
  );
}
