import { Schema } from 'mongoose';
import type { ObjectId } from 'mongodb';

export interface UserType {
	_id: string;
	firstName: string;
	lastName: string;
	profileImg: string;
	dobUtc: Date;
	tags: string[];
	tz: string;
	birthplace: ObjectId;
	createdAt: Date;
}

export const UserSchema = new Schema<UserType>(
	{
		_id: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		profileImg: { type: String },
		dobUtc: { type: Date },
		tags: { type: [String], default: [] },
		tz: { type: String },
		birthplace: { type: Schema.Types.ObjectId, ref: 'GeoNamesCity' },
		createdAt: { type: Date, default: Date.now }
	},
	{
		_id: false
	}
);
