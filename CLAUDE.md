# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development Workflow
- `npm run dev` - Start development server (with optional `-- --open` to auto-open browser)
- `npm run build` - Build production version
- `npm run preview` - Preview production build locally
- `npm run check` - Run Svelte type checking and validation
- `npm run check:watch` - Run type checking in watch mode

### Database Operations
- `docker-compose -f docker/docker-compose.yml up -d` - Start PostgreSQL database container
- `npx drizzle-kit push` - Push schema changes to database (development)
- `npx drizzle-kit generate` - Generate migration files
- `npx drizzle-kit migrate` - Apply migrations to database

## Architecture Overview

This is a **SvelteKit** application with PostgreSQL database integration, designed as a forum system called "Immortal Forum".

### Tech Stack
- **Frontend**: SvelteKit with Svelte 5, TailwindCSS v4
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite with TypeScript
- **Deployment**: SvelteKit adapter-auto

### Database Schema Structure
The application models a forum with the following core entities:
- `dude` - User accounts with authentication fields
- `dudeReputation` - Reputation scoring system linked to users
- `topic` - Forum categories/topics
- `forum` - Main forum posts linking users and topics

### Key Directories
- `src/routes/` - SvelteKit file-based routing with pages and server-side logic
- `src/db/schema.ts` - Drizzle database schema definitions
- `src/lib/` - Shared components and utilities
- `docker/` - Database containerization

### Database Connection
- Database configuration in `drizzle.config.ts`
- Expects `DATABASE_URL` environment variable
- Local development uses PostgreSQL container (password: ABC.123)

### Development Setup Notes
- Uses file-based routing typical of SvelteKit applications
- Includes example Sverdle game in routes for reference
- TailwindCSS integrated through Vite plugin
- TypeScript configuration supports Svelte components