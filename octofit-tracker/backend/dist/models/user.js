import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'] },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });
export const User = model('User', userSchema);
