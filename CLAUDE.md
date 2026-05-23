# TaskHub

Aplicação de gestão de tarefas e projetos construída durante um período de estudo para por em prática os conceitos aprendidos da stack de frontend da equipa.

## Stack

- React 19 com TypeScript
- Vite como bundler
- React Router — Data Mode (createBrowserRouter)
- Mantine — UI principal (componentes, temas, dark mode)
- CSS Modules + PostCSS — styling (sem CSS-in-JS)
- TanStack Query — data fetching e cache
- TanStack Table — tabelas com sorting, filtering e paginação
- Zustand — estado global de UI (filtros, modais)
- json-server — API REST simulada (db.json)
- ESLint + OxLint — linting
- @dnd-kit — drag and drop para o kanban

## Como correr

Terminal 1 — API na porta 3000:
npx json-server db.json

Terminal 2 — App na porta 5173:
npm run dev

## Estrutura de pastas

src/
  components/
    layout/       — Layout.tsx com AppShell, Header e Navbar
    ProjectCard.tsx
  hooks/
    useProjects.ts  — useProjects, useProject, useCreateProject, useUpdateProject, useDeleteProject
    useTasks.ts     — useTasks, useTasksByProject, useCreateTask, useUpdateTask, useDeleteTask
  pages/
    projects/
      ProjectsPage.tsx       — Lista de projetos com filtros
      ProjectDetailPage.tsx  — Detalhe do projeto e kanban de tarefas
    tasks/
      TasksPage.tsx          — Tabela global read-only de todas as tarefas
  store/
    projectsStore.ts  — Zustand store para filtros de projetos
  types.ts            — Interfaces partilhadas: Project, Task, NewProject

## Convenções

- Componentes e páginas em PascalCase: ProjectCard.tsx, ProjectsPage.tsx
- Hooks em camelCase começando por use: useProjects.ts
- CSS Modules por componente: ProjectCard.module.css
- Stores Zustand em camelCase: projectsStore.ts
- Tipos e interfaces em types.ts partilhado

## Decisões técnicas

- Data Mode do React Router em vez de Declarative Mode — preferência da equipa
- Mantine como lib UI principal — bem mantida, forte comunidade
- CSS Modules em vez de CSS-in-JS — seguindo guidelines da equipa
- json-server para simular API REST durante desenvolvimento
- Estrutura de pastas organizada por feature e não por tipo
- @dnd-kit para drag and drop — acessível, moderna e bem mantida

## Funcionalidades

### Projetos (/projects)
- Listar todos os projetos com filtros: All, Active, Archived
- Criar projeto via modal com validação
- Arquivar/ativar projeto com botão Archive/Activate
- Apagar projeto com botão Delete

### Detalhe de Projeto (/projects/:id)
- Ver informação do projeto
- Kanban de tarefas com colunas: To do, In progress, Done
- Arrastar tarefas entre colunas (drag and drop)
- Criar tarefa via modal com validação
- Apagar tarefa
- Editar tarefa

### Overall Tasks (/tasks)
- Tabela read-only de consulta global de todas as tarefas
- Colunas: Project, Name, Status, Priority, Due Date
- Sorting por qualquer coluna
- Paginação
- Sem ações — apenas consulta