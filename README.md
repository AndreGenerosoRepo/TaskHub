# TaskHub

A task and project management app built to practice the frontend stack used at my new company.

## Tech Stack

- **React 19** + TypeScript
- **Vite** — bundler
- **React Router** — Data Mode
- **Mantine** — UI components and theming
- **CSS Modules** + PostCSS — styling
- **TanStack Query** — data fetching and cache
- **TanStack Table** — sortable, filterable, paginated tables
- **Zustand** — global UI state
- **@dnd-kit** — drag and drop for kanban
- **json-server** — simulated REST API
- **ESLint** + OxLint — linting

## Features

- List, create, edit, archive and delete projects
- Filter projects by status: All, Active, Archived
- Kanban board per project with drag and drop between columns (To do, In progress, Done)
- Create, edit and delete tasks within each project
- Overall Tasks — read-only table with sorting, filtering and pagination across all projects
- Dark mode toggle

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/taskhub.git
cd taskhub
npm install
```

### Running the app

You need two terminals:

**Terminal 1 — API (port 3000):**
```bash
npx json-server db.json
```

**Terminal 2 — App (port 5173):**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  components/
    layout/       — AppShell with Header and Navbar
    KanbanBoard   — Drag and drop kanban board
    ProjectCard   — Project card with actions
  hooks/
    useProjects   — TanStack Query hooks for projects
    useTasks      — TanStack Query hooks for tasks
  pages/
    projects/     — Projects list and detail pages
    tasks/        — Overall tasks table
  store/
    projectsStore — Zustand store for project filters
  types.ts        — Shared TypeScript interfaces
```

## What I learned

This project was built in 6 days with spare time during a study period to practice the frontend stack used at Logrise company.

### Key concepts practiced

- **React Router Data Mode** — understanding the difference between Declarative Mode and Data Mode, and why loaders are preferable to useEffect for data fetching
- **TanStack Query** — managing server state, cache invalidation, optimistic updates and mutations
- **TanStack Table** — building sortable, filterable and paginated tables with custom column definitions
- **Mantine** — composing complex UIs with a component library, theming, dark mode and form validation
- **Zustand** — managing global UI state separately from server state
- **CSS Modules** — writing scoped styles without CSS-in-JS
- **@dnd-kit** — implementing accessible drag and drop for the kanban board
- **CLAUDE.md / AGENTS.md** — providing context to AI tools for better code generation
- **Symlinks** — sharing a single CLAUDE.md across multiple tools via symlink

### Decisions made

- Used **Data Mode** over Declarative Mode in React Router following team preference
- Chose **Mantine** as the UI library for its strong community and Material Design inspiration
- Organized folders **by feature** (projects/, tasks/) rather than by type (components/, pages/)
- Used **json-server** to simulate a REST API without a real backend
- Avoided **CSS-in-JS** entirely, using CSS Modules and PostCSS instead