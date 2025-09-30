import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Document {
    @Field(() => ID)
    id?: string;

    @Field()
    name?: string;

    @Field()
    content: string = '';

    @Field()
    summary?: string;

    @Field()
    userId?: string;

    @Field()
    createdAt?: Date;

    @Field()
    updatedAt?: Date;
}