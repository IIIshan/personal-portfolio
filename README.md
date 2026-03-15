# ISHAN'S\_ARCHIVE

> Personal portfolio built as a VS Code / Obsidian-style file vault — dark cyberpunk UI with sidebar file tree, tabs, editor pane, and status bar.

<!-- Replace with an actual screenshot: ![Screenshot](./docs/screenshot.png) -->
<p align="center"><em>screenshot coming soon</em></p>

## About

A single-page portfolio designed to look and feel like a code editor. The entire UI is structured around a fake file vault: a collapsible sidebar with folders and markdown "files", browser tabs that track open documents, a main editor area that renders each section, and a minimal status bar.

All personal content lives in **one TypeScript file** (`src/data/content.ts`). The sidebar structure lives in another (`src/data/fileTree.ts`). Update your info, projects, blog entries, or tech stack without ever touching a component.

## Features

- **VS Code-inspired layout** — sidebar, tabs, editor pane, status bar
- **Data-driven file tree** — collapsible folders with semantic SVG icons and accent colors
- **Client-side routing** — React Router v6 with deep links, back/forward navigation, and `historyApiFallback`
- **Mobile-responsive** — overlay drawer sidebar with backdrop, focus trap, and auto-close on navigation
- **Accessible** — `:focus-visible` outlines, ARIA roles and labels, keyboard navigation, skip-to-content link, `prefers-reduced-motion` support
- **Single-file content** — edit `content.ts` to update everything; no component changes needed
- **Cyberpunk Mono palette** — four accent colors (mint, cyan, orange, purple) defined as CSS custom properties
- **Dockerized development** — no Node.js required on the host machine
- **Lightweight** — zero runtime dependencies beyond React and React Router; plain CSS, no UI framework

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| UI          | React 18, TypeScript                |
| Bundler     | Vite 5                              |
| Routing     | React Router v6                     |
| Styling     | Plain CSS with custom properties    |
| Fonts       | Inter (body), JetBrains Mono (UI)   |
| Dev env     | Docker + Docker Compose             |

## Project Structure

```
src/
├── main.tsx                          # App entry point
├── App.tsx                           # Router, tab state, active file from URL
├── index.css                         # CSS variables, global resets, animations
├── data/
│   ├── content.ts                    # All personal content (profile, projects, blog, stack, contact)
│   └── fileTree.ts                   # Sidebar tree structure, view map, URL-to-file map
└── components/
    ├── GuideLine.tsx                 # Decorative vertical guide lines
    ├── Sidebar/
    │   ├── Sidebar.tsx               # File tree, collapse toggle, mobile overlay drawer
    │   ├── Sidebar.css
    │   ├── TreeItem.tsx              # Recursive tree node (folder / file)
    │   ├── TreeItem.css
    │   └── icons.tsx                 # Inline SVG icon set (User, Layers, Terminal, Tools, etc.)
    └── Workspace/
        ├── Workspace.tsx             # Editor + tabs + status bar wrapper, skip-to-content link
        ├── Workspace.css
        ├── Tabs.tsx                  # Open file tabs with keyboard support
        ├── Tabs.css
        ├── StatusBar.tsx             # Bottom status bar
        ├── StatusBar.css
        └── Editor/
            ├── EditorContainer.tsx   # Routes active file to the correct view
            ├── EditorContainer.css
            ├── Frontmatter.tsx       # YAML-style metadata block
            ├── Frontmatter.css
            ├── ProjectCard.tsx       # Individual project card
            ├── ProjectCard.css
            ├── TagContainer.tsx      # Tag pill list
            ├── TagContainer.css
            ├── InternalLink.tsx      # Wiki-style internal links
            └── InternalLink.css
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

That's it. No local Node.js installation required.

### Development

```bash
# Start the dev server
docker compose up

# App is live at http://localhost:5173
```

Vite's HMR is enabled — edits reflect instantly in the browser.

### Type Check

```bash
docker exec personal_portfolio-app-1 npx tsc --noEmit
```

### Production Build

```bash
docker exec personal_portfolio-app-1 npm run build
```

Output is written to `dist/`.

## Customization

### Content

Edit [`src/data/content.ts`](src/data/content.ts) to update:

| Export        | What it controls                              |
| ------------- | --------------------------------------------- |
| `VAULT_TITLE` | Sidebar header / home link text               |
| `FRONTMATTER` | Key-value metadata block on the profile page  |
| `HERO_TITLE`  | Main heading on the profile page              |
| `TAGS`        | Skill/tag pills below the heading             |
| `BIO`         | Short bio paragraph                           |
| `WORK`        | Work experience entries                       |
| `PROJECTS`    | Project cards (title, description, status)    |
| `BLOG`        | Blog post entries (title, description)        |
| `BLOG_INTRO`  | Intro text on the blog listing page           |
| `STACK`       | Tech stack YAML-style key-value pairs         |
| `CONTACT`     | Contact links (GitHub, LinkedIn, email, etc.) |
| `QUOTE`       | Footer quote on the profile page              |

### File Tree

Edit [`src/data/fileTree.ts`](src/data/fileTree.ts) to add, remove, or rename sidebar entries. Each node has:

- `id` — unique key (must match `FILE_VIEW_MAP` for leaf nodes)
- `label` — display name in the sidebar
- `path` — URL path for routing (leaf nodes only)
- `iconName` — icon key (`user`, `layers`, `terminal`, `tools`, `filetext`, `pen`, `archive`)
- `isFolder` / `defaultOpen` — folder behavior

After adding a new file node, also add its `id` to `FILE_VIEW_MAP` and its `path` to `PATH_TO_FILE_ID` in the same file.

### Accent Colors

Edit the CSS custom properties in [`src/index.css`](src/index.css):

```css
--accent-primary: #00ff9f;   /* electric mint  */
--accent-a:       #00cfff;   /* cyan blue      */
--accent-b:       #ff6b35;   /* neon orange    */
--accent-c:       #bf7fff;   /* soft purple    */
```

## Deployment

Production deployment configuration (multi-stage Docker build, Nginx, Caddy reverse proxy with auto HTTPS) is planned but not yet included. See project issues for status.

## License

[MIT](LICENSE)
