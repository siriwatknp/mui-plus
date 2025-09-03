"use client";

import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
  WebPreviewConsole,
} from "./ai-web-preview";
import { RefreshCwIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function AIWebPreviewDemo() {
  const consoleLogs = [
    {
      level: "log" as const,
      message: "Application started",
      timestamp: new Date(),
    },
    {
      level: "warn" as const,
      message: "Deprecated API usage detected",
      timestamp: new Date(),
    },
    {
      level: "error" as const,
      message: "Failed to fetch data",
      timestamp: new Date(),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Web Preview Component
        </h3>
        <p className="text-sm text-muted-foreground">
          Embed and preview web content with navigation controls.
        </p>

        <div className="h-[500px]">
          <WebPreview defaultUrl="https://example.com">
            <WebPreviewNavigation>
              <WebPreviewNavigationButton tooltip="Back">
                <ArrowLeftIcon className="size-4" />
              </WebPreviewNavigationButton>
              <WebPreviewNavigationButton tooltip="Forward">
                <ArrowRightIcon className="size-4" />
              </WebPreviewNavigationButton>
              <WebPreviewNavigationButton tooltip="Refresh">
                <RefreshCwIcon className="size-4" />
              </WebPreviewNavigationButton>
              <WebPreviewUrl className="flex-1" />
            </WebPreviewNavigation>
            <WebPreviewBody>
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Preview Content</h2>
                <p className="text-muted-foreground">
                  This is where the iframe content would be displayed. In a real
                  implementation, this would load the actual URL.
                </p>
              </div>
            </WebPreviewBody>
            <WebPreviewConsole logs={consoleLogs} />
          </WebPreview>
        </div>
      </div>
    </div>
  );
}
