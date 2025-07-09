# Doctor Dashboard

A modern web application for managing patient records and doctor appointments, built with React, TypeScript, and Express.js.

## Features

- **Dashboard Overview**: Main interface for quick access to patient information and daily tasks
- **Patient Management**: Comprehensive patient list with detailed records
- **Appointment Calendar**: Schedule and manage patient appointments
- **Settings**: Configure application preferences

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Radix UI components for accessible UI elements
- React Router for navigation
- React Query for data management

### Backend
- Express.js server
- REST API endpoints
- CORS enabled

## Project Structure

```plaintext
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   ├── lib/               # Utility functions
│   └── hooks/             # Custom React hooks
├── server/                # Express.js backend
│   └── routes/           # API route handlers
└── shared/               # Shared types and utilities
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Development

- Development server runs on port 8080
- Backend API is integrated with the Vite dev server during development
- TypeScript strict mode is available but currently disabled by default
- Includes testing setup with Vitest

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build both client and server
- `npm run test`: Run tests
- `npm run format.fix`: Format code with Prettier
- `npm run typecheck`: Run TypeScript type checking

## Dependencies

Key dependencies include:
- React and React DOM
- Express.js for the backend
- Tailwind CSS for styling
- Radix UI components
- React Router for navigation
- TypeScript for type safety
- Vite for building and development

        