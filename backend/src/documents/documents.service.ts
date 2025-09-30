import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PineconeService } from '../pinecone/pinecone.service';
import { Document } from './document.model';
import { SearchResult } from './search-result.model';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class DocumentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly pineconeService: PineconeService,
        private readonly openAIService: OpenAIService
    ) { }

    async getDocuments(): Promise<Document[]> {
        return this.prisma.document.findMany();
    }

    async getDocumentById(id: string): Promise<Document | null> {
        return this.prisma.document.findUnique({ where: { id } });
    }

    async uploadDocument(name: string, content: string, userId: string = 'temp-user'): Promise<Document> {
        // Generate summary using OpenAI
        const summary = await this.openAIService.analyzeDocument(content);

        // Store document with summary
        const document = await this.prisma.document.create({
            data: {
                name,
                content,
                summary,
                userId,
            },
        });

        // Index summary in Pinecone
        const embedding = await this.pineconeService.generateEmbedding(summary);
        await this.pineconeService.upsertDocument(document.id, embedding, { name, content, summary });

        return document;
    }

    async searchDocuments(query: string, topK: number): Promise<SearchResult[]> {
        return this.pineconeService.queryDocuments(query, topK);
    }
}