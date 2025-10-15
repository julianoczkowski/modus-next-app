#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { promisify } from "node:util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const cp = fs.cp ? promisify(fs.cp) : null;

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  const targetRoot = path.resolve(process.cwd(), options.projectRoot ?? ".");
  const relativeDestination = options.destination ?? "packages/demos";
  const destinationPath = path.resolve(targetRoot, relativeDestination);

  const templateDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../template");

  await ensureDirectory(path.dirname(destinationPath));
  await assertNotExists(destinationPath, `Destination \"${relativeDestination}\" already exists. Pass --destination to use a different folder.`);

  await copyTemplate(templateDir, destinationPath);

  const updatedRoot = await updateRootPackageJson({
    rootDir: targetRoot,
    demoRelativePath: relativeDestination
  });

  printSuccessMessage({
    rootUpdated: updatedRoot,
    destination: relativeDestination
  });
}

function parseArgs(args) {
  const options = {};
  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];
    if (current === "--destination" || current === "-d") {
      options.destination = args[index + 1];
      index += 1;
    } else if (current === "--project-root" || current === "-r") {
      options.projectRoot = args[index + 1];
      index += 1;
    } else if (current === "--help" || current === "-h") {
      printHelp();
      process.exit(0);
    }
  }
  return options;
}

function printHelp() {
  console.log(`Usage: npx create-modus-demos [options]\n\nOptions:\n  -d, --destination <path>   Destination folder relative to the project root (default: packages/demos)\n  -r, --project-root <path>  Root folder that contains the monorepo package.json (default: current directory)\n  -h, --help                 Display this help message`);
}

async function ensureDirectory(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

async function assertNotExists(target, message) {
  try {
    await access(target, fs.constants.F_OK);
    console.error(message);
    process.exit(1);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function copyTemplate(source, destination) {
  if (cp) {
    await cp(source, destination, { recursive: true });
    return;
  }

  await copyTemplateFallback(source, destination);
}

async function copyTemplateFallback(source, destination) {
  const entries = await fs.promises.readdir(source, { withFileTypes: true });
  await ensureDirectory(destination);
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyTemplateFallback(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function updateRootPackageJson({ rootDir, demoRelativePath }) {
  const packageJsonPath = path.join(rootDir, "package.json");
  try {
    await access(packageJsonPath, fs.constants.F_OK);
  } catch (error) {
    console.warn(`\n⚠️  No package.json found in ${rootDir}. Skipping workspace updates.`);
    return false;
  }

  const raw = await readFile(packageJsonPath, "utf8");
  const data = JSON.parse(raw);
  let changed = false;

  if (Array.isArray(data.workspaces)) {
    if (!data.workspaces.includes(demoRelativePath)) {
      data.workspaces.push(demoRelativePath);
      changed = true;
    }
  } else if (data.workspaces && Array.isArray(data.workspaces.packages)) {
    if (!data.workspaces.packages.includes(demoRelativePath)) {
      data.workspaces.packages.push(demoRelativePath);
      changed = true;
    }
  } else if (data.workspaces) {
    console.warn("\n⚠️  Could not update workspaces. Unsupported structure in package.json.");
  }

  if (data.scripts) {
    if (!data.scripts["dev:demos"]) {
      data.scripts["dev:demos"] = "npm run dev --workspace=@modus-next-app/demos";
      changed = true;
    }

    changed = updateLintCommand(data.scripts, "lint:colors", demoRelativePath) || changed;
    changed = updateLintCommand(data.scripts, "lint:icons", demoRelativePath) || changed;
    changed = updateLintCommand(data.scripts, "lint:styles", demoRelativePath) || changed;
    changed = updateLintCommand(data.scripts, "lint:semantic", demoRelativePath) || changed;
    changed = updateLintCommand(data.scripts, "lint:borders", demoRelativePath) || changed;
    if (data.scripts["type-check"] && !data.scripts["type-check"].includes(demoRelativePath)) {
      data.scripts["type-check"] = appendWorkspacePath(data.scripts["type-check"], demoRelativePath);
      changed = true;
    }
  }

  if (!changed) {
    return false;
  }

  await writeFile(packageJsonPath, `${JSON.stringify(data, null, 2)}\n`);
  return true;
}

function updateLintCommand(scripts, key, demoRelativePath) {
  const value = scripts[key];
  if (!value || value.includes(demoRelativePath)) {
    return false;
  }
  scripts[key] = appendWorkspacePath(value, demoRelativePath);
  return true;
}

function appendWorkspacePath(command, demoRelativePath) {
  const existingPaths = command.match(/packages\/[\w-]+/g) ?? [];
  const insert = `${command.trim()} ${demoRelativePath}`;
  if (existingPaths.length === 0) {
    return insert;
  }
  const lastPath = existingPaths[existingPaths.length - 1];
  return command.replace(lastPath, `${lastPath} ${demoRelativePath}`);
}

function printSuccessMessage({ rootUpdated, destination }) {
  console.log(`\n✅ Modus demos scaffolded into ${destination}.`);
  if (rootUpdated) {
    console.log("📦 Updated workspace configuration in package.json.");
  }
  console.log("\nNext steps:");
  console.log(`  1. Install dependencies with npm install`);
  console.log(`  2. Start the demos workspace with npm run dev:demos`);
}

main().catch((error) => {
  console.error("\n❌ Failed to scaffold Modus demos.");
  console.error(error);
  process.exit(1);
});
