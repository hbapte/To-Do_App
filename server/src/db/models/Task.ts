import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  name: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  name: { type: String ,required: true},
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define and export the Task model
export default mongoose.model<ITask>('Task', TaskSchema);
