import { Schema, model } from 'mongoose';
export interface KeyType {
	_id: string;
	user_id: string;
	hashed_password: string;
	primary: boolean;
	expires: number;
}

export const Key = model(
	'key',
	new Schema<KeyType>(
		{
			_id: {
				type: String
			},
			user_id: {
				type: String,
				required: true
			},
			hashed_password: String,
			primary: {
				type: Boolean,
				required: true
			},
			expires: Number
		},
		{ _id: false }
	)
);
