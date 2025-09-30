import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { PineconeService } from '../pinecone/pinecone.service';
import { OpenAIService } from '../openai/openai.service';

@Module({
    providers: [
        DocumentsService,
        DocumentsResolver,
        PrismaService,
        PineconeService,
        OpenAIService,
    ],
})
export class DocumentsModule { }