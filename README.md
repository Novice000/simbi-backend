# Simbi Backend

A backend API service developed by Efemena Esegbue, Blessing Asuquo, and Daniel Nwolu.

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [API Routes](#api-routes)
- [License](#license)
- [Contributors](#contributors)

## Project Overview

Simbi Backend is a Node.js application built with Express and TypeScript, utilizing Prisma as an ORM for database operations. The project follows a structured architecture with separate directories for controllers, services, routes, and database configuration.

## Directory Structure

```
.
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.ts                  # Express application setup
│   ├── config
│   │   ├── cors.ts             # CORS configuration
│   │   └── settings.ts         # Application settings
│   ├── controllers             # Request handlers
│   ├── database
│   │   └── db.ts               # Database connection
│   ├── prisma
│   │   ├── generated           # Prisma generated files
│   │   ├── migrations          # Database migrations
│   │   └── schema.prisma       # Prisma schema
│   ├── routes                  # API routes
│   ├── server.ts               # Server entry point
│   ├── services                # Business logic
│   └── utils
│       ├── errorClasses.ts     # Custom error classes
│       ├── errorMiddleware.ts  # Error handling middleware
│       └── logger.ts           # Logging utility
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- A database supported by Prisma (PostgreSQL, MySQL, SQLite, etc.)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Sparklingbae/Simbi-Backend.git
   cd Simbi-Backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your database connection details:

   ```
   DATABASE_URL=your_database_connection_string
   PORT=3000
   ```

## Database Setup

1. Generate Prisma Client:

   ```
   npm run generate:dev
   ```

2. Run database migrations:

   ```
   npm run migrate:dev
   ```

3. Open Prisma Studio to explore and manipulate your database:

   ```
   npm run studio
   ```

## Available Scripts

- `npm run build` - Compiles TypeScript to JavaScript in the dist directory
- `npm run dev` - Starts the development server with hot-reloading
- `npm run start` - Runs the compiled JavaScript code in production
- `npm run migrate:dev` - Runs Prisma migrations in development
- `npm run generate:dev` - Generates Prisma client in development
- `npm run migrate` - Runs Prisma migrations in production
- `npm run generate` - Generates Prisma client in production
- `npm run studio` - Opens Prisma Studio for visual database management

## API Routes

The API routes are organized in the `src/routes` directory. Add your API endpoints there and connect them to the appropriate controllers.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contributors

- Efemena Esegbue
- Daniel Nwolu
- Blessing Asuquo
