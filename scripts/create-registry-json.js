#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

// Usage: node scripts/create-registry-json.js <item-name> <item-title> <item-description> [category] [tags]
// Usage: node scripts/create-registry-json.js --all
const [, , firstArg, itemTitle, itemDescription, itemCategory, itemTags] =
  process.argv;

if (!firstArg) {
  console.error(
    "Usage: node scripts/create-registry-json.js <item-name> [title] [description] [category] [tags]"
  );
  console.error("       node scripts/create-registry-json.js --all");
  console.error("Examples:");
  console.error(
    '  node scripts/create-registry-json.js login-form "Login Form" "A login form component" authentication "form,login,auth"'
  );
  process.exit(1);
}

const isAllFlag = firstArg === "--all";
const itemName = isAllFlag ? null : firstArg;

function scanRegistryFiles(dir = null) {
  const registryPath = dir || path.join(process.cwd(), "registry");
  const files = [];

  function scanRecursive(currentPath) {
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
        `Warning: Could not read directory ${currentPath}: ${error.message}`
      );
    }
  }

  if (fs.existsSync(registryPath)) {
    scanRecursive(registryPath);
  }

  return files;
}

function findAllRelatedFiles(itemPath, itemName) {
  const itemDir = path.dirname(itemPath);
  const registryPath = path.join(process.cwd(), "registry");
  const allFiles = [];

  function scanDirectory(dirPath) {
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
        `Warning: Could not read directory ${dirPath}: ${error.message}`
      );
    }
  }

  scanDirectory(itemDir);
  return allFiles;
}

function findMatchingFiles(name) {
  const allFiles = scanRegistryFiles();
  const matches = [];

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

function getAllRegistryItems() {
  const allFiles = scanRegistryFiles();
  const registryItems = new Map();

  for (const filePath of allFiles) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const registryPath = path.join(process.cwd(), "registry");
    const relativePath = path.relative(registryPath, filePath);
    const pathSegments = relativePath.split(path.sep);

    // Determine the registry item name from the path structure
    let registryItemName;

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

function extractDependencies(content) {
  const dependencies = new Set();

  // Extract @mui imports
  const muiImports = content.match(/from\s+["']@mui\/[^"']+["']/g) || [];
  muiImports.forEach((imp) => {
    const pkg = imp.match(/@mui\/[^"'/]+/)[0];
    dependencies.add(pkg);
  });

  // Always add emotion dependencies if MUI is used
  if (dependencies.size > 0) {
    dependencies.add("@emotion/react");
    dependencies.add("@emotion/styled");
  }

  return Array.from(dependencies);
}

function processRegistryFile(
  fileInfo,
  title = null,
  description = null,
  category = null,
  tags = null
) {
  const { path: filePath, name } = fileInfo;
  const OUTPUT_PATH = path.join(process.cwd(), "public", "r", `${name}.json`);

  // Find all related files in the same directory structure
  const allRelatedFiles = findAllRelatedFiles(filePath, name);

  // Extract dependencies from all files
  const allDependencies = new Set();
  const files = [];

  for (const fileData of allRelatedFiles) {
    try {
      const content = fs.readFileSync(fileData.path, "utf-8");
      const fileDependencies = extractDependencies(content);

      // Add to overall dependencies
      fileDependencies.forEach((dep) => allDependencies.add(dep));

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
        type: "registry:block",
      });
    } catch (error) {
      console.warn(
        `Warning: Could not read file ${fileData.path}: ${error.message}`
      );
    }
  }

  const dependencies = Array.from(allDependencies);

  // Check if JSON already exists
  let existingJson = null;
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existingJson = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
    } catch (error) {
      console.warn(
        `Warning: Could not parse existing JSON file: ${error.message}`
      );
    }
  }

  // Determine title and description
  let finalTitle, finalDescription;

  if (title) {
    finalTitle = title;
  } else if (existingJson && existingJson.title) {
    finalTitle = existingJson.title;
  } else {
    finalTitle = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (description) {
    finalDescription = description;
  } else if (existingJson && existingJson.description) {
    finalDescription = existingJson.description;
  } else {
    finalDescription = `A ${name} item.`;
  }

  // Determine category, tags, and previewMode
  let finalCategory, finalTags, finalPreviewMode;

  if (category) {
    finalCategory = category;
  } else if (existingJson && existingJson.meta && existingJson.meta.category) {
    finalCategory = existingJson.meta.category;
  }

  if (tags) {
    finalTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  } else if (existingJson && existingJson.meta && existingJson.meta.tags) {
    finalTags = existingJson.meta.tags;
  }

  // Preserve existing previewMode if it exists
  if (existingJson && existingJson.meta && existingJson.meta.previewMode) {
    finalPreviewMode = existingJson.meta.previewMode;
  }

  // Create the registry JSON structure
  const registryJson = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: name,
    type: "registry:block",
    title: finalTitle,
    description: finalDescription,
    dependencies: dependencies,
    registryDependencies: [],
    files: files,
    meta: {
      screenshot: `/screenshots/${name}.png`,
    },
  };

  // Add category, tags, and previewMode to meta if they exist
  if (finalCategory) {
    registryJson.meta.category = finalCategory;
  }
  if (finalTags && finalTags.length > 0) {
    registryJson.meta.tags = finalTags;
  }
  if (finalPreviewMode) {
    registryJson.meta.previewMode = finalPreviewMode;
  }

  // Ensure the output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registryJson, null, 2));

  console.log(
    `✓ ${existingJson ? "Updated" : "Created"} registry JSON: ${OUTPUT_PATH}`
  );
  console.log(`  Item: ${registryJson.title}`);
  console.log(`  Files: ${files.length} file(s) included`);
  console.log(`  Dependencies: ${dependencies.join(", ")}`);

  return registryJson;
}

// Legacy function for backward compatibility
function createRegistryJson(name, title, description, category, tags) {
  const matches = findMatchingFiles(name);

  if (matches.length === 0) {
    console.error(`Item file not found for: ${name}`);
    process.exit(1);
  }

  if (matches.length === 1) {
    return processRegistryFile(matches[0], title, description, category, tags);
  }

  // Multiple matches - process all
  console.log(`Found ${matches.length} files matching '${name}':`);
  const results = [];

  matches.forEach((match, index) => {
    console.log(
      `\n[${index + 1}/${matches.length}] Processing: ${match.relativePath}`
    );
    results.push(
      processRegistryFile(match, title, description, category, tags)
    );
  });

  return results;
}

function processAllRegistries() {
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

// Run the script
if (isAllFlag) {
  processAllRegistries();
} else {
  createRegistryJson(
    itemName,
    itemTitle,
    itemDescription,
    itemCategory,
    itemTags
  );
}
