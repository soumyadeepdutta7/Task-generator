import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask {
    id: string;
    title: string;
    description: string;
    type: 'feature' | 'bug' | 'chore';
    status: 'todo' | 'in-progress' | 'done';
}

export interface IUserStory {
    id: string;
    role: string;
    goal: string;
    benefit: string;
}

export interface ISpec extends Document {
    goal: string;
    users: string;
    constraints: string;
    template: string;
    tasks: ITask[];
    userStories: IUserStory[];
    createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['feature', 'bug', 'chore'], default: 'feature' },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
});

const UserStorySchema = new Schema<IUserStory>({
    id: { type: String, required: true },
    role: { type: String, required: true },
    goal: { type: String, required: true },
    benefit: { type: String, required: true },
});

const SpecSchema = new Schema<ISpec>(
    {
        goal: { type: String, required: true },
        users: { type: String, required: true },
        constraints: { type: String, required: true },
        template: { type: String, default: 'web' },
        tasks: [TaskSchema],
        userStories: [UserStorySchema],
    },
    { timestamps: true }
);

const Spec: Model<ISpec> = mongoose.models.Spec || mongoose.model<ISpec>('Spec', SpecSchema);

export default Spec;
