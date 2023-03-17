import { Schema } from 'mongoose';
import model from './mongoose';

export interface PersonType {
	userId: string;
	name: string;
	dob_utc: Date;
	tz: string;
	tags: string[];
}
const PersonSchema = new Schema<PersonType>({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	dob_utc: { type: Date, required: true },
	tz: { type: String, required: true },
	tags: { type: [String], required: true, default: [] }
});

PersonSchema.index({ userId: 1, name: 'text' });
PersonSchema.index({ userId: 1, tags: 1 });

export const Person = model<PersonType>('person', PersonSchema);
