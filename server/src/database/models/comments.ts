import mongoose, { Document, Model, Schema } from "mongoose";

interface CommentsType extends Document {
    title: string;
    description: string
    user: any
}

const commentSchema: Schema <CommentsType> = new Schema({
    title: { type: String, required:[ true, 'title is required']},
    description: String,
    user: {
        name: String,
        age: Number,
        address: {
            village: String,
            district: String

        }
    }
})

const Comment:Model<CommentsType>=mongoose.model<CommentsType>('Comment', commentSchema);

export default Comment;