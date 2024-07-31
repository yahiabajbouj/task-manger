import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
    @Field()
    readonly title: string;

    @Field({ nullable: true })
    readonly description?: string;

    @Field({ nullable: true })
    readonly status?: string;
}
