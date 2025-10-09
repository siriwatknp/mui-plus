# Getting Started

MUI Plus is a component registry for Material UI (MUI) that provides beautifully crafted components and blocks built on top of a hand-crafted theme.

It aims to be goto solution for building your next MUI project.

## Quick Start

```bash
npx create-next-app@latest mui-plus-starter \
  -e https://github.com/siriwatknp/mui-plus/tree/main/examples/nextjs
```

> Replace `mui-plus-starter` with your project name.

### Stack Overview

The starter includes:

- **Next.js 15** with App Router and Turbopack
- **Material UI v7** with Emotion for styling
- **Tailwind CSS v4** for utility classes
- **TypeScript** for type safety
- **shadcn CLI** ready for component installation

## MUI Plus Theme

The MUI Plus theme offers a refined, minimalist design system that moves beyond Material Design:

### Key Features

- **Monochromatic palette** - Pure black/white primary colors for maximum contrast (replace them with your brand colors)
- **System colors** - Native OS colors for semantic states (success, error, warning, info)
- **Subtle interactions** - Reduced opacity values for understated hover/focus states
- **Native typography** - System font stacks for optimal performance
- **Refined shadows** - 24 elevation levels with subtle depth

### Installation

To add the MUI Plus theme to your project:

```bash
npx shadcn@latest add https://mui-plus.dev/r/mui-plus.json
```

### Usage

```diff
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
+ import { ThemeProvider } from "@/mui-plus/theme";
import { AppTheme } from "./theme";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider
          options={{
            enableCssLayer: true,
          }}
        >
+         <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

The theme is available in the `src/mui-plus/theme` directory.
You can modify them as you want.

## Components and Blocks

MUI Plus provides a growing collection of components and blocks that you can add to your project.

Visit [mui-plus.dev](https://mui-plus.dev) to browse all available components with live previews.

Add components directly to your project:

```bash
npx shadcn@latest add https://mui-plus.dev/r/ai-elements.json
```

Components will be installed to `src/mui-plus/` directory by default.

## MCP Setup

Follow [Shadcn MCP Setup](https://ui.shadcn.com/docs/registry/mcp) with the following registry configuration:

```json
{
  "registries": {
    "@mui-plus": "https://mui-plus.dev/r/{name}.json"
  }
}
```

## Next Steps

1. **Explore components** at [mui-plus.dev](https://mui-plus.dev)
2. **Customize the theme** by modifying `src/mui-plus/theme/`
3. **Add your first component** using the shadcn CLI
4. **Join the community** on [GitHub](https://github.com/siriwatknp/mui-plus)

## Support

- **Documentation**: [mui-plus.dev](https://mui-plus.dev)
- **GitHub Issues**: [github.com/siriwatknp/mui-plus/issues](https://github.com/siriwatknp/mui-plus/issues)
- **Author**: [@siriwatknp](https://github.com/siriwatknp)
