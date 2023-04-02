import { Schema } from 'mongoose';

export interface UserType {
	_id: string;
	firstName: string;
	lastName: string;
	tags: string[];
	tz?: string;
	birthplace?: number;
	dobUtc?: Date;
	profileImg?: string;
	createdAt?: Date;
}

export const UserSchema = new Schema<UserType>(
	{
		_id: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		profileImg: { type: String, required: false },
		dobUtc: { type: Date, required: false },
		tags: { type: [String], default: [] },
		tz: { type: String, required: false },
		birthplace: { type: Schema.Types.Number, ref: 'GeoNamesCity', required: false },
		createdAt: { type: Date, default: Date.now }
	},
	{
		_id: false
	}
);
