# Getting Started

MUI Plus is a component registry for Material UI (MUI) that provides beautifully crafted components and blocks built on top of a hand-crafted theme.

It aims to be goto solution for building your next MUI project.

## Quick Start

```bash
npx create-next-app@latest mui-plus-starter -e https://github.com/siriwatknp/mui-plus/tree/main/examples/nextjs
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

- **Monochromatic palette** - Pure black/white primary colors for maximum contrast
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
+ import { MuiPlusThemeProvider } from "@/mui-plus/theme";
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
+         <MuiPlusThemeProvider>{children}</MuiPlusThemeProvider>
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
# Add a specific component
npx shadcn@latest add https://mui-plus.dev/r/login-form.json

# Add a block
npx shadcn@latest add https://mui-plus.dev/r/dashboard-sidebar.json
```

Components will be installed to `src/mui-plus/` directory by default.

## MCP Setup

The Model Context Protocol (MCP) enables AI assistants to interact with your codebase and add components automatically.

### Configuration

First, install the Shadcn MCP server with your client.

**Standard config** works in most of the tools:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "https://mui-plus.dev/r/registry.json"
      }
    }
  }
}
```

Then, restart your AI client to load the configuration.

### Usage Examples

With MCP configured, you can use natural language commands:

- "Add the payment overview card component"
- "Install the dashboard sidebar block"
- "Show me available authentication components"

The AI assistant will handle the installation and setup automatically.

## Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Home page
├── src/
│   └── mui-plus/          # MUI Plus components (auto-generated)
│       ├── blocks/        # Complex UI blocks
│       ├── components/    # Reusable components
│       └── theme/         # Theme configuration
├── components.json        # shadcn CLI configuration
└── package.json
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
