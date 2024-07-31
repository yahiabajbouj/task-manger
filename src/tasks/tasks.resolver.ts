import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { Request } from 'express';
import { GqlReq } from 'src/decorators/req.decorator';

@Resolver('Task')
@UseGuards(AuthGuard)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) { }

    @Query(() => [Task])
    async tasks(@Args('userId') userId: string, @GqlReq() req: Request): Promise<Task[]> {        
        userId = req['user'].id;
        return this.tasksService.findAll(userId);
    }

    @Mutation(() => Task)
    async createTask(@Args('createTaskDto') createTaskDto: CreateTaskDto, @GqlReq() req: Request): Promise<Task> {
        return this.tasksService.create(createTaskDto, req['user'].id);
    }
}
