import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'PENDING' },
    createdAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
});
