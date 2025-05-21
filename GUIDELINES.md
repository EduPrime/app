---
description: Project Overview and Best Practices for EduPrime
alwaysApply: true
---
- **Project Structure:**
  - EduPrime is a modular ERP built with Ionic Framework 8, Vue 3, and TypeScript.
  - Each module is located in `src/modules/[module-name]` and has its own components, services, and views.
  - Shared assets are located in `assets/` or `public/`.

- **Technology Stack:**
  - Frontend: Ionic Framework 8 with Vue 3 and TypeScript
  - State Management: Pinia 3
  - Routing: Vue Router 4
  - Bundler: Vite
  - ORM: Prisma
  - Mobile: Capacitor
  - Lint/Format: ESLint, Prettier, Husky

- **Best Practices:**
  - Use Ionic components (`ion-list`, `ion-item`, etc.) to ensure a consistent mobile experience.
  - Use Vue 3's Composition API and create composables for shared logic.
  - Manage global state with Pinia, creating stores per module or data domain.
  - Centralize API calls in services or composables, avoiding duplicated logic.
  - Use TypeScript for strong typing throughout the project.
  - Use slots for reusable and flexible components.
  - Name components with the module prefix, e.g., `class-registration-StudentList`.
  - For large lists, use Vue Virtual Scroller.
  - Follow code conventions for Vue, Ionic, and TypeScript.
  - Keep modules independent; if necessary, use shared composables/utilities.

- **Additional Notes:**
  - Use `package.json` scripts for build, lint, seed, etc.
  - Use Husky for pre-commit hooks.
  - Keep Prisma migrations and seeds organized in `prisma/`.
