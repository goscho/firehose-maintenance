# Firehose Maintenance System

A Next.js application for managing fire hose maintenance records with a touch-friendly interface designed for tablet use in fire departments.

## Overview

This application provides a comprehensive system for tracking fire hose maintenance, including:

- Touch-optimized interface for tablet devices
- Fire hose registration and management
- Maintenance record tracking with test results
- Multi-owner support for different fire departments
- German language interface

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Custom touch-optimized components with Storybook
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── _components/        # Shared components
│   │   ├── hose-selector/  # Hose selection component
│   │   ├── maintain-hose-form/ # Maintenance form
│   │   ├── new-hose-form/  # New hose registration
│   │   ├── numpad/         # Touch numpad component
│   │   └── ...
│   ├── api/auth/           # NextAuth.js API routes
│   ├── hose/               # Hose-related pages
│   └── ...
├── lib/                    # Utility libraries
│   ├── fireHoseRepository.ts
│   ├── maintenanceRepository.ts
│   └── ...
└── stories/                # Storybook stories

prisma/
├── schema.prisma           # Database schema
├── migrations/             # Database migrations
└── sql/                    # Custom SQL queries
```

## Database Schema

The application uses a PostgreSQL database with the following main entities:

- **FireHose**: Hose records with number, dimensions, and owner
- **Maintenance**: Maintenance records with test results and failure descriptions
- **Owner**: Fire department/owner information
- **FailureDescription**: Predefined failure reason templates

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Environment variables (see below)

### Installation

```bash
# Start Postgres, Logto and Adminer
docker compose up -d

# copy template.env to .env and provide the the missing values
mv template.env .env

# Install dependencies
pnpm install

# Apply database migrations
pnpm prisma migrate dev

# Generate SQL scripts
pnpm prisma generate --sql

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm storybook        # Start Storybook on port 6006
pnpm build-storybook  # Build Storybook
pnpm db:deploy        # Deploy Prisma migrations
```

## Development Guidelines

### Code Style

- **Imports**: Use `@/` alias for src directory imports
- **Components**: Export default function with named TypeScript interfaces
- **Types**: PascalCase for interfaces (e.g., `TouchButtonProps`)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Styling**: Tailwind classes with array concatenation pattern
- **Language**: German for UI text, English for code comments

### Component Structure

Components are organized in `_components/` with:
- `component-name.tsx` - Main component file
- `component-name.stories.tsx` - Storybook stories
- `index.ts` - Clean exports

### Example Component Structure

```tsx
interface TouchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function TouchButton({ 
  children, 
  onClick, 
  variant = 'primary' 
}: TouchButtonProps) {
  const classes = [
    'min-h-16 px-6 text-lg font-medium rounded-lg',
    variant === 'primary' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  ].join(' ');

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Touch Interface Guidelines

- Minimum touch target size: 44px (iOS) / 48dp (Android)
- Use `min-h-16` (64px) for primary buttons
- Provide visual feedback for touch interactions
- Consider thumb-friendly layouts for tablet use


## Contributing

1. Follow the established code style and conventions
2. Add Storybook stories for new components
3. Ensure TypeScript strict mode compliance
4. Test touch interactions on tablet devices
5. Maintain German language consistency in UI

## License

This project is private and proprietary.
