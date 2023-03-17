import { Schema } from 'mongoose';
import model from './mongoose';

export interface SessionType {
	_id: string;
	user_id: string;
	active_expires: number;
	idle_expires: number;
}

export const Session = model(
	'session',
	new Schema<SessionType>(
		{
			_id: {
				type: String
			},
			user_id: {
				type: String,
				required: true
			},
			active_expires: {
				type: Number,
				required: true
			},
			idle_expires: {
				type: Number,
				required: true
			}
		},
		{ _id: false }
	)
);
