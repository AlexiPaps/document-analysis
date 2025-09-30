// backend/src/documents/search-result.model.ts
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class SearchResult {
    @Field()
    id?: string;

    @Field(() => Float)
    score?: number;

    @Field()
    content?: string;

    @Field()
    summary?: string;
}