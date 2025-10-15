# create-modus-demos

`create-modus-demos` scaffolds the optional Modus Web Components demos workspace into an existing Modus Next.js monorepo. It copies the latest template from this repository and updates your root `package.json` so you can run the demos immediately.

## Usage

```bash
npx create-modus-demos
```

### Options

- `--destination <path>` (or `-d`) — destination relative to the project root. Defaults to `packages/demos`.
- `--project-root <path>` (or `-r`) — path to the monorepo that contains `package.json`. Defaults to the current working directory.

## What you get

Running the command will:

1. Copy the demos Next.js app into the destination folder.
2. Register the demos workspace in the root `package.json` (adds it to `workspaces`, sets up `npm run dev:demos`, and appends the workspace to lint/type-check scripts).
3. Print next steps so you can install dependencies and start the demos server.

## Next steps after scaffolding

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the demos workspace:
   ```bash
   npm run dev:demos
   ```

The demos run on port `3001` by default.
