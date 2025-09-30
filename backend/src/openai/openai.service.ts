import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
    private readonly openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async analyzeDocument(content: string): Promise<string> {
        const prompt = `You are a legal document analysis assistant. Summarize the key points or clauses of the following document text in 200 words or less:\n\n${content}`;

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
        });

        return response.choices[0].message.content || 'Analysis failed.';
    }
}