import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocumentsService } from './documents.service';
import { OpenAIService } from '../openai/openai.service';
import { Document } from './document.model';
import { SearchResult } from './search-result.model';

@Resolver(() => Document)
export class DocumentsResolver {
    constructor(
        private readonly documentsService: DocumentsService,
        private readonly openAIService: OpenAIService,
    ) { }

    @Query(() => [Document], { name: 'documents' })
    async getDocuments(): Promise<Document[]> {
        return this.documentsService.getDocuments();
    }

    @Query(() => Document, { name: 'documentById', nullable: true })
    async getDocumentById(
        @Args('id') id: string,
    ): Promise<Document | null> {
        return this.documentsService.getDocumentById(id);
    }

    @Mutation(() => Document)
    async uploadDocument(
        @Args('name') name: string,
        @Args('content') content: string,
    ): Promise<Document> {
        return this.documentsService.uploadDocument(name, content);
    }

    @Mutation(() => String)
    async analyzeDocument(@Args('documentId') documentId: string): Promise<string> {
        const document = await this.documentsService.getDocumentById(documentId);
        if (!document) throw new Error('Document not found');
        return this.openAIService.analyzeDocument(document.content);
    }

    @Query(() => [SearchResult], { name: 'searchDocuments' })
    async searchDocuments(
        @Args('query') query: string,
        @Args('topK', { type: () => Int, defaultValue: 5 }) topK: number,
    ): Promise<SearchResult[]> {
        return this.documentsService.searchDocuments(query, topK);
    }
}