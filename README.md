# AI-Powered Legal Document Analysis Platform (PoC)

A proof of concept for a legal document analysis platform that allows users to upload, search, and analyze legal documents using semantic search and AI-driven insights. Built with a modern tech stack, the platform integrates OpenAI for document analysis and Pinecone for vector-based search.

## Live Demo
- [https://document-analysis-eta.vercel.app](https://document-analysis-eta.vercel.app)

## Features
- **Document Upload**: Upload `.txt` files, store them in Supabase (Postgres), and generate summaries using OpenAI.
- **Semantic Search**: Search documents using Pinecone’s vector search with embeddings from OpenAI’s `text-embedding-3-small`.
- **Document Analysis**: Analyze documents with OpenAI to generate summaries and identify legal risks.
- **Document Retrieval**: Fetch all documents or a specific document by ID via GraphQL.

## Tech Stack
- **Frontend**: React, TypeScript, Apollo Client
- **Backend**: NestJS, TypeScript, GraphQL, Prisma, Postgres (Supabase)
- **AI Services**: OpenAI (`text-embedding-3-small` for embeddings, `gpt-4` for analysis)
- **Vector Database**: Pinecone

## Prerequisites
- Node.js (v18 or higher)
- npm
- Supabase account with Postgres database
- Pinecone account with an index (1536 dimensions for `text-embedding-3-small`)
- OpenAI API key