import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user'; // Import IUser interface from user.ts

export interface ITask extends Document {
  name: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser['_id']; 
}

const TaskSchema: Schema = new Schema({
  name: { type: String ,required: true},
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model<ITask>('Task', TaskSchema);
