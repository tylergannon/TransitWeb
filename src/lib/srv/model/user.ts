import { Schema } from 'mongoose';

export interface UserType {
	_id: string;
	email: string;
	name: string;
}

export const UserSchema = new Schema<UserType>(
	{
		_id: { type: String },
		email: { type: String },
		name: { type: String }
	},
	{
		_id: false
	}
);
