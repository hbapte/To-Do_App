import mongoose, { Schema, Document } from 'mongoose';
import User  from './user';

export interface ITask extends Document {
  name: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User['_id']
}

const TaskSchema: Schema = new Schema({
  name: { type: String ,required: true},
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model<ITask>('Task', TaskSchema);
