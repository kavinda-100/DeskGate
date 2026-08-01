# Repository Guidelines

## Project Structure & Module Organization

DeskGate is a pnpm TypeScript monorepo. Workspace packages live in `packages/*`; application work will live in `apps/*`.

- `packages/schemas/` contains shared Zod schemas and environment validation. Keep reusable contracts in `src/` and export them through `index.ts`.
- `packages/database/` owns Prisma configuration, the PostgreSQL schema at `prisma/schema.prisma`, and the database client exports.
- `goal.md` describes the intended API, web, and Electron architecture. Treat it as the product and security reference when adding applications.

Do not edit generated output such as `dist/`, `generated/`, or `.tsbuildinfo` files directly.

## Build, Test, and Development Commands

Use Node 20+ and pnpm 11.

- `pnpm install` installs workspace dependencies.
- `pnpm dev` starts every configured application workspace; it first builds shared packages.
- `pnpm build` builds packages, then applications.
- `pnpm lint` checks JavaScript and TypeScript with ESLint; use `pnpm lint:fix` for safe automatic fixes.
- `pnpm format` checks Prettier formatting; use `pnpm format:fix` to rewrite supported files.
- `pnpm db:generate`, `pnpm db:push`, and `pnpm db:studio` operate on the Prisma database package.

## Coding Style & Naming Conventions

Write strict ESM TypeScript. Follow Prettier (two-space indentation, single quotes) and run formatting before review. Prefer named exports and keep public package exports in each package's `index.ts`. Use `camelCase` for variables/functions, `PascalCase` for types and classes, and descriptive lowercase directory names such as `packages/schemas/src/`.

ESLint treats `any` as an error and unused values as warnings; prefix intentionally unused parameters with `_`. Avoid `console.log`; use `console.info`, `console.warn`, or `console.error` when logging is necessary.

## Testing Guidelines

No test runner is configured yet. When adding behavior, add the chosen test tooling and colocate tests as `*.test.ts` or `*.test.tsx`. Cover validation rules, entitlement decisions, and database-facing behavior; run the relevant workspace test command plus `pnpm lint` and `pnpm build` before opening a PR.

## Commit & Pull Request Guidelines

Recent commits use short, imperative subjects, for example `Add initial project configuration files`. Keep commits focused and use that style. PRs should explain the change and verification performed, link the related issue when available, and include screenshots for web or desktop UI changes.

## Security & Configuration

Never commit credentials or local `.env` values. Keep authorization, subscriptions, and entitlements enforced by the backend; desktop and web clients must not be treated as a source of truth.

## Skill (agent skills)
To see if any skills are available for the agent, you can look at the directory `./agents/skills` and check if any skill is available for the agent. If you want to add a new skill, you can create a new directory in `./agents/skills` and add your skill there. Each skill should describes the skill and its capabilities.
