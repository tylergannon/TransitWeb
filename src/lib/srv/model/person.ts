import { Schema } from 'mongoose';

export interface PersonType {
	userId: string;
	firstName: string;
	lastName?: string;
	dobUtc: Date;
	tz: string;
	placeId: number;
	tags: string[];
}

export const PersonSchema = new Schema<PersonType>({
	userId: { type: String, required: true, ref: 'User' },
	firstName: { type: String, required: true },
	lastName: { type: String, required: false },
	dobUtc: { type: Date, required: true },
	placeId: { type: Number, required: true, ref: 'GeoNamesCity' },
	tz: { type: String, required: true },
	tags: { type: [String], required: true, default: [], index: true }
});

PersonSchema.index({ userId: 1, name: 'text' });
