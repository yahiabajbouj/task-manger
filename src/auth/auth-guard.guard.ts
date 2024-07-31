import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().request;
        const Authorization = request.get('Authorization');
        let token = null;
        if (Authorization) token = Authorization.replace('Bearer ', '');
    
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_SECRET') });                        
            request['user'] = payload;                       
            // const Role = this.reflector.get<string>('role', context.getHandler());
            // if (Role && Role != payload.role) {
            //     throw new UnauthorizedException();
            // }
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}
