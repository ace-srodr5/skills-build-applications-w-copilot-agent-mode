import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    coach: { type: String, required: true },
    memberGoal: { type: String, required: true },
}, { timestamps: true });
export const Team = model('Team', teamSchema);
