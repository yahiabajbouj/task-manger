import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) { }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const createdTask = new this.taskModel({ userId: userId, ...createTaskDto });
        return createdTask.save();
    }

    async findAll(userId: string): Promise<Task[]> {
        const objectId = new ObjectId(userId);
        return this.taskModel.find({ userId: objectId }).exec();
    }
}