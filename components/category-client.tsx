"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import { RegistryItem } from "@/lib/registry";
import TagFilter from "@/components/tag-filter";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { ExternalLinkIcon, Copy, Check, Terminal } from "lucide-react";
import { useColorScheme } from "@mui/material/styles";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { ImperativePanelHandle } from "react-resizable-panels";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import React from "react";

interface CategoryClientProps {
  categoryInfo: { name: string; label: string };
  allItems: RegistryItem[];
  availableTags: string[];
  selectedTags: string[];
  filteredItems: RegistryItem[];
}

interface ComponentPreviewContentProps {
  item: RegistryItem;
  needsIframe: boolean;
}

const ComponentPreviewContent = React.memo(
  ({ item, needsIframe }: ComponentPreviewContentProps) => {
    const DynamicComponent = React.useMemo(() => {
      if (needsIframe) return null;

      try {
        const componentPath = item.files[0].path.replace(".tsx", "");
        return dynamic(
          () =>
            // First try to import .demo version
            import(`@/registry/${componentPath}.demo`)
              .catch(() => {
                // If .demo doesn't exist, try the original path
                return import(`@/registry/${componentPath}`);
              })
              .catch(() => {
                // Return a fallback component for failed imports
                return {
                  default: function FallbackComponent() {
                    return (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-sm">Preview unavailable</span>
                      </div>
                    );
                  },
                };
              }),
          {
            loading: () => (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse bg-muted rounded w-16 h-16"></div>
              </div>
            ),
            ssr: false,
          },
        );
      } catch {
        return function ErrorFallback() {
          return (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Preview unavailable</span>
            </div>
          );
        };
      }
    }, [item.files, needsIframe]);

    if (needsIframe) {
      return (
        <div className="w-full h-full relative">
          <iframe
            src={`/preview/${item.name}`}
            className="aspect-video border-none min-h-[80vh] max-w-full [color-scheme:auto]"
          />
        </div>
      );
    }

    if (!DynamicComponent) {
      return (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <span className="text-sm">Preview unavailable</span>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
        <DynamicComponent />
      </div>
    );
  },
);

ComponentPreviewContent.displayName = "ComponentPreviewContent";

function ComponentPreview({ item }: { item: RegistryItem }) {
  // Use explicit previewMode from registry metadata
  const needsIframe = item.meta.previewMode === "iframe";
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<{
    Component: React.ComponentType<SyntaxHighlighterProps>;
    lightStyle: Record<string, React.CSSProperties>;
    darkStyle: Record<string, React.CSSProperties>;
  } | null>(null);
  const panelRef = useRef<ImperativePanelHandle | null>(null);
  const { mode, systemMode } = useColorScheme();

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const handleCopyCLI = async () => {
    const cliCommand = `npx shadcn@latest add ${process.env.NEXT_PUBLIC_BASE_URL}/r/${item.name}.json`;
    await navigator.clipboard.writeText(cliCommand);
    setCopiedIndex(-2); // Use -2 for CLI button
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const handleTabChange = async (value: string) => {
    setActiveTab(value);

    // Dynamically import syntax highlighter when code tab is first accessed
    if (value === "code" && !SyntaxHighlighter) {
      try {
        const [syntaxHighlighterModule, stylesModule] = await Promise.all([
          import("react-syntax-highlighter") as Promise<{
            Prism: React.ComponentType<SyntaxHighlighterProps>;
          }>,
          import("react-syntax-highlighter/dist/esm/styles/prism") as Promise<{
            oneLight: Record<string, React.CSSProperties>;
            oneDark: Record<string, React.CSSProperties>;
          }>,
        ]);
        setSyntaxHighlighter({
          Component: syntaxHighlighterModule.Prism,
          lightStyle: stylesModule.oneLight,
          darkStyle: stylesModule.oneDark,
        });
      } catch (error) {
        console.error("Failed to load syntax highlighter:", error);
        // Set a fallback to prevent infinite loading
        setSyntaxHighlighter(() => null);
      }
    }
  };

  const renderPreview = React.useCallback(() => {
    return (
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel ref={panelRef} defaultSize={100} minSize={30}>
          <ComponentPreviewContent item={item} needsIframe={needsIframe} />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          onDoubleClick={() => {
            if (panelRef.current) {
              panelRef.current.resize(100);
            }
          }}
        />
        <ResizablePanel defaultSize={0} minSize={0} maxSize={70} />
      </ResizablePanelGroup>
    );
  }, [item, needsIframe, panelRef]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full"
    >
      <div className="flex justify-between items-center mb-2">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCLI}
            className="h-8 px-3 text-xs font-mono"
          >
            {copiedIndex === -2 ? (
              <Check className="h-3 w-3 mr-1.5" />
            ) : (
              <Terminal className="h-3 w-3 mr-1.5" />
            )}
            npx shadcn
          </Button>
          <OpenInV0Button name={item.name} className="h-8" />
        </div>
      </div>

      <TabsContent
        value="preview"
        className="h-full mt-0 bg-muted border rounded-lg overflow-hidden"
      >
        {renderPreview()}
      </TabsContent>

      <TabsContent
        value="code"
        className="h-full mt-0 border rounded-lg overflow-hidden"
      >
        {item.files.map((file, index) => (
          <div
            key={file.path}
            className={
              needsIframe ? "aspect-video max-w-full min-h-[80vh]" : "h-[400px]"
            }
          >
            <div className="flex items-center justify-between bg-muted px-3 py-2 text-sm">
              <span className="font-mono">{file.path}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(file.content, index)}
                className="h-6 px-2"
              >
                {copiedIndex === index ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="h-[calc(100%-40px)] overflow-auto">
              {activeTab === "code" ? (
                SyntaxHighlighter ? (
                  <SyntaxHighlighter.Component
                    language={
                      file.path.endsWith(".tsx") || file.path.endsWith(".ts")
                        ? "tsx"
                        : "jsx"
                    }
                    style={
                      (systemMode || mode) === "dark"
                        ? SyntaxHighlighter.darkStyle
                        : SyntaxHighlighter.lightStyle
                    }
                    customStyle={{
                      margin: 0,
                      padding: "16px",
                      fontSize: "12px",
                    }}
                    showLineNumbers
                  >
                    {file.content}
                  </SyntaxHighlighter.Component>
                ) : SyntaxHighlighter === null ? (
                  <pre className="p-4 text-xs bg-background">
                    <code>{file.content}</code>
                  </pre>
                ) : (
                  <div className="p-4 text-xs bg-background flex items-center justify-center">
                    <div className="animate-pulse">
                      Loading syntax highlighter...
                    </div>
                  </div>
                )
              ) : (
                <pre className="p-4 text-xs bg-background">
                  <code>{file.content}</code>
                </pre>
              )}
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default function CategoryClient({
  categoryInfo,
  availableTags,
  selectedTags,
  filteredItems,
}: CategoryClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold capitalize mb-2">
          {categoryInfo.label}
        </h1>
        <p className="text-muted-foreground">
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "component" : "components"}
          {selectedTags.length > 0 && (
            <span> matching: {selectedTags.join(", ")}</span>
          )}
        </p>
      </div>

      {/* Sticky Tag Filter */}
      <TagFilter
        availableTags={availableTags}
        selectedTags={selectedTags}
        category={categoryInfo.name}
      />

      {/* Registry Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-8">
          {filteredItems.map((item) => (
            <div key={item.name} className="min-w-0 flex flex-col space-y-3">
              {/* Title and Description */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Link
                    href={`/preview/${item.name}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                    title="Open full preview"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Live Component Preview */}
              <div className="min-h-[360px]">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-pulse bg-muted rounded w-16 h-16"></div>
                    </div>
                  }
                >
                  <ComponentPreview item={item} />
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No components found matching the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
