import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
    @Field()
    readonly username: string;

    @Field()
    readonly password: string;
}