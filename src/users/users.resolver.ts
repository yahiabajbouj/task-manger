import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver('User')
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => User)
    async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
