# Waohire Blogs

A blog platform built with Remix and Supabase.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm (comes with Node.js)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waohire_blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   The project uses SQLite by default, which requires no additional configuration.

4. **Initialize Prisma**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Database Schema

The project uses Prisma as the ORM. The schema is defined in `prisma/schema.prisma`. After making any changes to the schema:

1. Create a migration:
   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

2. Update Prisma Client:
   ```bash
   npx prisma generate
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript checks
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure
