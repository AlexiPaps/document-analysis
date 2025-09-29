# AI-Powered Document Analysis Platform

A production-ready tech application built with TypeScript, NestJS, GraphQL, Prisma, Postgres, React, OpenAI, and Pinecone.

## Monorepo Structure
- `backend/`: NestJS backend with TypeScript
- `frontend/`: React frontend with TypeScript

## Prerequisites
- Node.js (v20.x or later)
- npm

## Backend Setup
1. Navigate to `backend`: `cd backend`
2. Install dependencies: `npm install`
3. Run the NestJS app: `npx nest start`
4. Run a simple TypeScript file: `npm run test:ts`

## Frontend Setup
1. Navigate to `frontend`: `cd frontend`
2. Install dependencies: `npm install`
3. Run the React app: `npm run dev`

## Deployment
- Backend: Deploy the `backend` folder to a cloud provider (e.g., Vercel, Heroku) by setting the root to `backend`.
- Frontend: Deploy the `frontend` folder separately (e.g., Vercel, Netlify).