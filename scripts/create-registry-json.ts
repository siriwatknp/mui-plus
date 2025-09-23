#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";

interface FileInfo {
  path: string;
  relativePath: string;
  name: string;
}

interface RegistryFile {
  path: string;
  target: string;
  content: string;
  type: string;
}

interface RegistryMeta {
  $schema: string;
  type: string;
  title: string;
  description: string;
  registryDependencies?: string[];
  meta: {
    screenshot?: string;
    category?: string;
    tags?: string[];
    previewMode?: string;
  };
}

interface RegistryJson {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
  meta: RegistryMeta["meta"];
}

// Get the base URL for registry dependencies based on environment
function getRegistryBaseUrl(): string {
  const vercelEnv = process.env.VERCEL_ENV;
  const vercelUrl = process.env.VERCEL_BRANCH_URL;

  // Use preview URL for non-production Vercel deployments
  if (vercelEnv && vercelEnv !== "production" && vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Use production URL for production or local development
  return "https://mui-plus.dev";
}

const program = new Command();

program
  .name("create-registry-json")
  .description("Generate registry JSON files for MUI Plus components")
  .version("1.0.0")
  .argument("[name]", "Component name (if not provided, generates all)")
  .option("-t, --title <title>", "Component title")
  .option("-d, --description <desc>", "Component description")
  .option("-c, --category <category>", "Component category")
  .option("--tags <tags>", "Comma-separated tags")
  .action((name: string | undefined, options) => {
    if (!name) {
      // If no name provided, generate all
      processAllRegistries();
    } else {
      // Generate for specific component
      const tags = options.tags
        ? options.tags.split(",").map((t: string) => t.trim())
        : undefined;
      generateRegistryForItem(
        name,
        options.title,
        options.description,
        options.category,
        tags
      );
    }
  });

function scanRegistryFiles(dir: string | null = null): string[] {
  const registryPath = dir || path.join(process.cwd(), "registry");
  const files: string[] = [];

  function scanRecursive(currentPath: string): void {
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(currentPath, item.name);

        if (item.isDirectory()) {
          scanRecursive(fullPath);
        } else if (
          item.isFile() &&
          (item.name.endsWith(".ts") || item.name.endsWith(".tsx"))
        ) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(
        `Warning: Could not read directory ${currentPath}: ${
          (error as Error).message
        }`
      );
    }
  }

  if (fs.existsSync(registryPath)) {
    scanRecursive(registryPath);
  }

  return files;
}

function findAllRelatedFiles(itemPath: string, itemName: string): FileInfo[] {
  const itemDir = path.dirname(itemPath);
  const registryPath = path.join(process.cwd(), "registry");
  const allFiles: FileInfo[] = [];

  function scanDirectory(dirPath: string): void {
    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);

        if (item.isDirectory()) {
          scanDirectory(fullPath);
        } else if (
          item.isFile() &&
          (item.name.endsWith(".ts") || item.name.endsWith(".tsx"))
        ) {
          const relativePath = path.relative(registryPath, fullPath);
          allFiles.push({
            path: fullPath,
            relativePath: relativePath,
            name: itemName,
          });
        }
      }
    } catch (error) {
      console.warn(
        `Warning: Could not read directory ${dirPath}: ${
          (error as Error).message
        }`
      );
    }
  }

  scanDirectory(itemDir);
  return allFiles;
}

function findMatchingFiles(name: string): FileInfo[] {
  const allFiles = scanRegistryFiles(null);
  const matches: FileInfo[] = [];

  for (const filePath of allFiles) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const registryPath = path.join(process.cwd(), "registry");
    const relativePath = path.relative(registryPath, filePath);
    const pathSegments = relativePath.split(path.sep);

    // Check if this file matches the name we're looking for
    // Also check for index files in a directory matching the name
    if (
      fileName === name ||
      (fileName === "index" &&
        pathSegments.length >= 2 &&
        pathSegments[pathSegments.length - 2] === name)
    ) {
      matches.push({
        path: filePath,
        relativePath: relativePath,
        name: name,
      });
    }
  }

  return matches;
}

function getAllRegistryItems(): FileInfo[] {
  const allFiles = scanRegistryFiles(null);
  const registryItems = new Map<string, FileInfo>();

  for (const filePath of allFiles) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const registryPath = path.join(process.cwd(), "registry");
    const relativePath = path.relative(registryPath, filePath);
    const pathSegments = relativePath.split(path.sep);

    // Determine the registry item name from the path structure
    let registryItemName: string;

    if (pathSegments.length >= 2) {
      // For themes like themes/mui-plus/... -> mui-plus
      // For components like components/button/... -> button
      // For blocks like blocks/data-metrics/... -> data-metrics
      registryItemName = pathSegments[1];
    } else {
      // Fallback to filename if structure is unexpected
      registryItemName = fileName;
    }

    // Skip sub-files within registry items
    // Only process files that match the registry item name
    if (fileName !== registryItemName && fileName !== "index") {
      continue;
    }

    if (!registryItems.has(registryItemName)) {
      registryItems.set(registryItemName, {
        path: filePath,
        relativePath: relativePath,
        name: registryItemName,
      });
    }
  }

  return Array.from(registryItems.values());
}

function extractDependencies(content: string): string[] {
  const dependencies = new Set<string>();

  // Extract @mui imports
  const muiImports = content.match(/from\s+["']@mui\/[^"']+["']/g) || [];
  muiImports.forEach((imp) => {
    const match = imp.match(/@mui\/[^"'/]+/);
    if (match) {
      dependencies.add(match[0]);
    }
  });

  // Always add emotion dependencies if MUI is used
  if (dependencies.size > 0) {
    dependencies.add("@emotion/react");
    dependencies.add("@emotion/styled");
  }

  return Array.from(dependencies);
}

function extractRegistryDependencies(content: string): string[] {
  const registryDeps = new Set<string>();
  const baseUrl = getRegistryBaseUrl();

  // Match both relative imports and @/registry imports
  // Examples:
  // from "../../hooks/use-number-input"
  // from "../../../ui/button"
  // from "@/registry/hooks/use-number-input"
  const imports = content.match(/from\s+["'][^"']+["']/g) || [];

  imports.forEach((imp) => {
    // Check for relative imports
    const relativeMatch = imp.match(/from\s+["']((?:\.\.\/)+)([^"']+)["']/);
    if (relativeMatch) {
      const relativePath = relativeMatch[2];

      // Check if this points to a registry item
      const registryMatch = relativePath.match(
        /^(hooks|ui|components|blocks|themes)\/([^/]+)/
      );
      if (registryMatch) {
        const itemName = registryMatch[2];
        registryDeps.add(`${baseUrl}/r/${itemName}.json`);
      }
    }

    // Check for @/registry imports
    const aliasMatch = imp.match(/from\s+["']@\/registry\/([^"']+)["']/);
    if (aliasMatch) {
      const registryPath = aliasMatch[1];

      // Extract the item name from the registry path
      const registryMatch = registryPath.match(
        /^(hooks|ui|components|blocks|themes)\/([^/]+)/
      );
      if (registryMatch) {
        const itemName = registryMatch[2];
        registryDeps.add(`${baseUrl}/r/${itemName}.json`);
      }
    }
  });

  return Array.from(registryDeps);
}

function processRegistryFile(
  fileInfo: FileInfo,
  title?: string,
  description?: string,
  category?: string,
  tags?: string[]
): { metadata: RegistryMeta; registryJson: RegistryJson } {
  const { path: filePath, name } = fileInfo;
  const OUTPUT_PATH = path.join(process.cwd(), "public", "r", `${name}.json`);

  // Determine the component/block directory
  const itemDir = path.dirname(filePath);
  const META_PATH = path.join(itemDir, `${name}.meta.json`);

  // Find all related files in the same directory structure
  const allRelatedFiles = findAllRelatedFiles(filePath, name);

  // Extract dependencies from all files
  const allDependencies = new Set<string>();
  const allRegistryDependencies = new Set<string>();
  const files: RegistryFile[] = [];

  for (const fileData of allRelatedFiles) {
    try {
      const content = fs.readFileSync(fileData.path, "utf-8");
      const fileDependencies = extractDependencies(content);
      const registryDependencies = extractRegistryDependencies(content);

      // Add to overall dependencies
      fileDependencies.forEach((dep) => allDependencies.add(dep));
      registryDependencies.forEach((dep) => allRegistryDependencies.add(dep));

      // Add to files array
      // Convert registry path to target path with src/mui-plus prefix
      // Special handling for themes folder - use src/mui-plus/theme instead of src/mui-plus/themes
      let targetPath = fileData.relativePath;
      if (targetPath.startsWith("themes/")) {
        // Remove "themes/[theme-name]/" and replace with "src/mui-plus/theme/"
        // e.g., "themes/mui-plus/components/alert.ts" -> "src/mui-plus/theme/components/alert.ts"
        targetPath = targetPath.replace(
          /^themes\/[^\/]+\//,
          "src/mui-plus/theme/"
        );
      } else {
        // For non-theme files, just prepend src/mui-plus/
        targetPath = "src/mui-plus/" + targetPath;
      }

      // For single file items, simplify the path to avoid duplication
      // e.g., "components/login-form-split/login-form-split.tsx" -> "components/login-form-split.tsx"
      if (
        allRelatedFiles.length === 1 &&
        !targetPath.startsWith("src/mui-plus/theme/")
      ) {
        // Check if the file name duplicates the folder name
        const pathParts = targetPath.split("/");
        if (pathParts.length >= 3) {
          const fileName = pathParts[pathParts.length - 1];
          const folderName = pathParts[pathParts.length - 2];
          const fileNameWithoutExt = fileName.replace(/\.(ts|tsx|js|jsx)$/, "");

          // If folder name matches file name (without extension), simplify path
          if (folderName === fileNameWithoutExt) {
            // Remove the duplicate folder
            pathParts.splice(pathParts.length - 2, 1);
            targetPath = pathParts.join("/");
          }
        }
      }

      files.push({
        path: fileData.relativePath,
        target: targetPath,
        content: content,
        type: "registry:item",
      });
    } catch (error) {
      console.warn(
        `Warning: Could not read file ${fileData.path}: ${
          (error as Error).message
        }`
      );
    }
  }

  const dependencies = Array.from(allDependencies);
  const registryDependencies = Array.from(allRegistryDependencies);

  // Check if meta.json exists and load it
  let existingMeta: Partial<RegistryMeta> | null = null;
  let metaExists = false;
  if (fs.existsSync(META_PATH)) {
    metaExists = true;
    try {
      existingMeta = JSON.parse(fs.readFileSync(META_PATH, "utf-8"));
    } catch (error) {
      console.warn(
        `Warning: Could not parse existing meta.json file: ${
          (error as Error).message
        }`
      );
      metaExists = false; // Treat corrupt file as non-existent
    }
  }

  // If meta.json exists and we're not forcing an update with CLI args, use existing metadata
  let metadata: RegistryMeta;

  if (metaExists && !title && !description && !category && !tags) {
    // Meta exists and no CLI overrides provided - use existing metadata as-is
    metadata = existingMeta as RegistryMeta;
    console.log(`✓ Using existing meta.json for ${name}`);
  } else if (metaExists && (title || description || category || tags)) {
    // Meta exists but CLI overrides provided - update only specified fields
    metadata = existingMeta as RegistryMeta;

    if (title) {
      metadata.title = title;
    }
    if (description) {
      metadata.description = description;
    }
    if (category) {
      metadata.meta = metadata.meta || {};
      metadata.meta.category = category;
    }
    if (tags) {
      metadata.meta = metadata.meta || {};
      metadata.meta.tags = tags;
    }

    // Write the updated meta.json file
    fs.writeFileSync(META_PATH, JSON.stringify(metadata, null, 2));
    console.log(`✓ Updated meta.json for ${name} with CLI overrides`);
  } else {
    // Meta doesn't exist - create new metadata

    // Determine metadata fields
    let finalTitle: string;
    let finalDescription: string;

    if (title) {
      finalTitle = title;
    } else {
      finalTitle = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (description) {
      finalDescription = description;
    } else {
      finalDescription = `A ${name} item.`;
    }

    const finalType = "registry:item";

    // Check if screenshot file exists
    const screenshotPath = path.join(
      process.cwd(),
      "public",
      "screenshots",
      `${name}.png`
    );
    const hasScreenshot = fs.existsSync(screenshotPath);

    // Create the metadata structure (without name field)
    metadata = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      type: finalType,
      title: finalTitle,
      description: finalDescription,
      meta: {},
    };

    // Add screenshot to meta only if the file exists
    if (hasScreenshot) {
      metadata.meta.screenshot = `/screenshots/${name}.png`;
    }

    // Add category and tags if provided
    if (category) {
      metadata.meta.category = category;
    }
    if (tags && tags.length > 0) {
      metadata.meta.tags = tags;
    }

    // Write the new meta.json file
    fs.writeFileSync(META_PATH, JSON.stringify(metadata, null, 2));
    console.log(`✓ Created new meta.json for ${name}`);
  }

  // Create the public registry JSON structure (with metadata)
  // For the public JSON, always use detected registry dependencies, not from meta.json
  const registryJson: RegistryJson = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: name,
    type: metadata.type,
    title: metadata.title,
    description: metadata.description,
    dependencies: dependencies,
    registryDependencies: registryDependencies,
    files: files,
    meta: metadata.meta,
  };

  // Ensure the output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the public JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registryJson, null, 2));

  // Create v0.json with registry:block type
  const V0_OUTPUT_PATH = path.join(
    process.cwd(),
    "public",
    "r",
    `${name}.v0.json`
  );
  const v0Json = JSON.parse(JSON.stringify(registryJson)); // Deep clone

  // Update registryDependencies for v0 format
  if (
    v0Json.registryDependencies &&
    Array.isArray(v0Json.registryDependencies)
  ) {
    v0Json.registryDependencies = v0Json.registryDependencies.map(
      (dep: string) => {
        // Check if the dependency matches any registry URL pattern
        const registryMatch = dep.match(
          /^(https?:\/\/[^\/]+)\/r\/([^\/]+)\.json$/
        );
        if (registryMatch) {
          const baseUrl = registryMatch[1];
          const itemName = registryMatch[2];
          // Replace with v0.json version, preserving the base URL
          return `${baseUrl}/r/${itemName}.v0.json`;
        }
        return dep;
      }
    );
  }

  // Replace all occurrences of registry:item with registry:block
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function replaceRegistryType(obj: any): void {
    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
      if (key === "type" && obj[key] === "registry:item") {
        obj[key] = "registry:block";
      } else if (typeof obj[key] === "object") {
        replaceRegistryType(obj[key]);
      }
    }
  }

  replaceRegistryType(v0Json);

  // Write the v0.json file
  fs.writeFileSync(V0_OUTPUT_PATH, JSON.stringify(v0Json, null, 2));

  console.log(`✓ Generated registry files:`);
  console.log(`  Meta: ${path.relative(process.cwd(), META_PATH)}`);
  console.log(`  Public: ${path.relative(process.cwd(), OUTPUT_PATH)}`);
  console.log(`  v0: ${path.relative(process.cwd(), V0_OUTPUT_PATH)}`);
  console.log(`  Item: ${metadata.title}`);
  console.log(`  Files: ${files.length} file(s) included`);
  console.log(`  Dependencies: ${dependencies.join(", ")}`);

  return { metadata, registryJson };
}

function generateRegistryForItem(
  name: string,
  title?: string,
  description?: string,
  category?: string,
  tags?: string[]
): void {
  const matches = findMatchingFiles(name);

  if (matches.length === 0) {
    console.error(`Item file not found for: ${name}`);
    process.exit(1);
  }

  if (matches.length === 1) {
    processRegistryFile(matches[0], title, description, category, tags);
    return;
  }

  // Multiple matches - process all
  console.log(`Found ${matches.length} files matching '${name}':`);

  matches.forEach((match, index) => {
    console.log(
      `\n[${index + 1}/${matches.length}] Processing: ${match.relativePath}`
    );
    processRegistryFile(match, title, description, category, tags);
  });
}

function processAllRegistries(): void {
  const allItems = getAllRegistryItems();
  console.log(`Found ${allItems.length} registry items:`);

  allItems.forEach((itemInfo, index) => {
    console.log(
      `\n[${index + 1}/${allItems.length}] Processing: ${itemInfo.name}`
    );
    processRegistryFile(itemInfo);
  });

  console.log(`\n✓ Processed all ${allItems.length} registry items`);
}

// Parse command-line arguments
program.parse(process.argv);
