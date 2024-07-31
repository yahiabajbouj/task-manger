import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => String)
    async login(@Args('username') username: string, @Args('password') password: string): Promise<String> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new Error('Invalid credentials');
        return this.authService.login(user);
    }
}
