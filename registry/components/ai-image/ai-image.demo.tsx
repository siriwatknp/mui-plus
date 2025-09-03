"use client";

import { Image } from "./ai-image";

export default function AIImageDemo() {
  // Example base64 placeholder image (1x1 transparent pixel)
  const placeholderBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          AI Generated Image Display
        </h3>
        <p className="text-sm text-muted-foreground">
          This component displays AI-generated images from base64 data.
        </p>

        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Default styling</p>
            <Image
              base64={placeholderBase64}
              mediaType="image/png"
              alt="AI generated placeholder"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Custom size</p>
            <Image
              base64={placeholderBase64}
              mediaType="image/png"
              alt="AI generated placeholder"
              className="w-32 h-32 object-cover"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">With border</p>
            <Image
              base64={placeholderBase64}
              mediaType="image/png"
              alt="AI generated placeholder"
              className="border-2 border-primary p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
