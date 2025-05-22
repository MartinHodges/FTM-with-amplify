# Aquarium Management App

A React application built with AWS Amplify Gen 2 for managing aquarium data.

## Features

- User authentication with Amazon Cognito
- DynamoDB data storage for aquarium information
- React frontend with TypeScript
- GraphQL API for data operations

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- AWS account
- Amplify CLI

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd my-amplify-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure

- `/amplify` - Amplify backend configuration
  - `/data` - Data models and GraphQL schema
  - `/auth` - Authentication configuration
- `/app` - Next.js application code
  - `/components` - React components
  - `/pages` - Next.js pages

## Data Model

The application uses the following data model:

### Aquarium

- `id` (UUID, auto-generated): Primary key
- `tank` (String): Name/identifier of the tank
- `tankType` (Enum): Type of tank (Freshwater, Saltwater, Tropical, Arctic)
- `fish` (String): Fish species in the tank

## Common Issues

### Missing createdAt/updatedAt Fields

Amplify Gen 2 automatically adds `createdAt` and `updatedAt` fields to models. If you encounter errors related to these fields:

1. Add them to your schema:
```typescript
createdAt: a.datetime(),
updatedAt: a.datetime()
```

2. Or specify only the fields you need in queries:
```typescript
client.models.Aquarium.list({
  selectionSet: ['id', 'tank', 'tankType']
})
```

## Deployment

Deploy your Amplify backend:
```bash
npx ampx push
```

Deploy your frontend to Amplify Hosting:
```bash
amplify publish
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.