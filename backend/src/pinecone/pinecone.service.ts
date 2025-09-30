// backend/src/pinecone/pinecone.service.ts
import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { SearchResult } from '../documents/search-result.model';

@Injectable()
export class PineconeService {
    private readonly pinecone: Pinecone;
    private readonly openai: OpenAI;
    private readonly index;

    constructor() {
        const pineconeApiKey = process.env.PINECONE_API_KEY;
        if (!pineconeApiKey) {
            throw new Error('PINECONE_API_KEY is not defined in .env');
        }
        const indexName = process.env.PINECONE_INDEX_NAME;
        if (!indexName) {
            throw new Error('PINECONE_INDEX_NAME is not defined in .env');
        }

        this.pinecone = new Pinecone({ apiKey: pineconeApiKey });
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
        this.index = this.pinecone.Index(indexName);
    }

    async generateEmbedding(content: string): Promise<number[]> {
        const cleanedContent = content.replace(/\n+/g, ' ').trim();
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: cleanedContent,
        });
        const embedding = response.data[0].embedding;
        return embedding;
    }

    async upsertDocument(id: string, embedding: number[], metadata: { name: string; content: string; summary: string }) {
        await this.index.upsert([{ id, values: embedding, metadata }]);
    }

    async queryDocuments(queryText: string, topK: number): Promise<SearchResult[]> {
        const cleanedQuery = queryText.replace(/\n+/g, ' ').trim();
        const queryEmbedding = await this.generateEmbedding(cleanedQuery);
        const results = await this.index.query({
            vector: queryEmbedding,
            topK,
            includeMetadata: true,
        });
        return (results.matches || []).map(match => ({
            id: match.id,
            score: match.score ?? 0,
        }));
    }
}