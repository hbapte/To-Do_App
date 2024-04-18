import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
    names: string;
    email: string;
    username: string;
    password: string;
    emailVerified: boolean;
    emailVerificationToken: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema: Schema = new Schema({
    names: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
      
});



const User: Model<User> = mongoose.model<User>("User", userSchema);

export default User;
