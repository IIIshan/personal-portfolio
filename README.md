# ISHAN'S_ARCHIVE

> Personal portfolio built as a VS Code / Obsidian-style file vault — dark cyberpunk UI with sidebar file tree, tabs, editor pane, and status bar.

<p align="center"><em>screenshot coming soon</em></p>

## About

A single-page portfolio designed to look and feel like a code editor. The entire UI is structured around a fake file vault: a collapsible sidebar with folders and markdown "files", browser tabs that track open documents, a main editor area that renders each section, and a minimal status bar.

All personal content lives in **one TypeScript file** (`src/data/content.ts`). The sidebar structure lives in another (`src/data/fileTree.ts`). Update your info, projects, blog entries, or tech stack without ever touching a component.

## Features

- **VS Code-inspired layout** — sidebar, tabs, editor pane, status bar
- **Data-driven file tree** — collapsible folders with semantic SVG icons and accent colors
- **Client-side routing** — React Router v6 with deep links, back/forward navigation
- **Mobile-responsive** — overlay drawer sidebar with backdrop, focus trap, and auto-close on navigation
- **Accessible** — `:focus-visible` outlines, ARIA roles and labels, keyboard navigation, skip-to-content link, `prefers-reduced-motion` support
- **Single-file content** — edit `content.ts` to update everything; no component changes needed
- **Cyberpunk Mono palette** — four accent colors (mint, cyan, orange, purple) defined as CSS custom properties
- **Dockerized** — runs in Docker containers
- **CI/CD Automated** — automatic deployment via GitHub Actions on every push

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| UI          | React 18, TypeScript                |
| Bundler     | Vite 5                              |
| Routing     | React Router v6                     |
| Styling     | Plain CSS with custom properties    |
| Fonts       | Inter (body), JetBrains Mono (UI)   |
| Production  | Caddy 2 (auto HTTPS + static serve) |
| CI/CD       | GitHub Actions                      |
| Container   | Docker                              |

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
    │   └── icons.tsx                 # Inline SVG icon set
    └── Workspace/
        ├── Workspace.tsx             # Editor + tabs + status bar wrapper
        ├── Tabs.tsx                  # Open file tabs
        ├── StatusBar.tsx             # Bottom status bar
        └── Editor/
            ├── EditorContainer.tsx   # Routes active file to the correct view
            ├── Frontmatter.tsx       # YAML-style metadata block
            ├── ProjectCard.tsx       # Individual project card
            ├── TagContainer.tsx      # Tag pill list
            └── InternalLink.tsx      # Wiki-style internal links
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+) or [Docker](https://docs.docker.com/get-docker/)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# App is live at http://localhost:5173
```

### Production Build

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

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
| `PROJECTS`    | Project cards                                 |
| `BLOG`        | Blog post entries                             |
| `STACK`       | Tech stack YAML-style key-value pairs         |
| `CONTACT`     | Contact links                                 |

### Accent Colors

Edit the CSS custom properties in [`src/index.css`](src/index.css):

```css
--accent-primary: #00ff9f;   /* electric mint  */
--accent-a:       #00cfff;   /* cyan blue      */
--accent-b:       #ff6b35;   /* neon orange    */
--accent-c:       #bf7fff;   /* soft purple    */
```

## Deployment

Production runs as a single Docker container using [Caddy](https://caddyserver.com/) for static file serving and automatic HTTPS via Let's Encrypt.

### Architecture

```
GitHub Push → GitHub Actions → VPS (206.189.131.132)
                                        │
                                   ┌────▼────┐
                                   │  Caddy  │  ← serves static files + auto HTTPS
                                   │  :443   │     (runs inside Docker container)
                                   └─────────┘
```

### How It Works

1. **Push to main branch** → Triggers GitHub Actions workflow
2. **GitHub Actions** → SSH into VPS, pull latest code, build Docker image
3. **VPS** → Stops old container, starts new container with new image
4. **Caddy** → Automatically provisions SSL certificates via Let's Encrypt

### Prerequisites

- A VPS running Ubuntu (22.04 or 24.04) with Docker installed
- A domain with DNS A records pointing to the VPS IP
- GitHub repository with the following secrets configured:

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | Your VPS IP address |
| `VPS_USERNAME` | SSH username (e.g., `root`) |
| `VPS_SSH_KEY` | Private SSH key (base64 encoded) |

### First-Time Setup

1. Clone the repository on your VPS:

```bash
mkdir -p ~/Personal_Portfolio
git clone https://github.com/IIIshan/personal-portfolio.git ~/Personal_Portfolio
cd ~/Personal_Portfolio
docker build -t portfolio-web:latest .
docker run -d --name portfolio-web -p 80:80 -p 443:443 -v caddy_data:/data -v caddy_config:/config --restart unless-stopped portfolio-web:latest
```

2. Wait for Let's Encrypt to provision SSL certificates (automatic)

### Updating

Simply push changes to the `main` branch. CI/CD will automatically deploy to your VPS.

### Manual Deploy

To trigger a deployment manually:
1. Go to GitHub repository → Actions
2. Select "Deploy to VPS" workflow
3. Click "Run workflow"

### Key Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: `node:22-alpine` compiles the app → `caddy:2-alpine` serves `dist/` |
| `Caddyfile` | Static file serving, SPA fallback, gzip, security headers, auto HTTPS |
| `docker-compose.prod.yml` | Production container config with persistent volumes |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for automated deployment |

## License

[MIT](LICENSE)
