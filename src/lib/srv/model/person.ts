import { Schema } from 'mongoose';

export interface PersonType {
	userId: string;
	firstName: string;
	lastName?: string;
	dobUtc: Date;
	tz: string;
	tags: string[];
	city: string;
	cc: string;
	aa1: string;
	aa2: string;
}

export const PersonSchema = new Schema<PersonType>({
	userId: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: false },
	dobUtc: { type: Date, required: true },
	tz: { type: String, required: true },
	tags: { type: [String], required: true, default: [] }
});

PersonSchema.index({ userId: 1, name: 'text' });
PersonSchema.index({ userId: 1, tags: 1 });
