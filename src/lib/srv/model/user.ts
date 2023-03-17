import { Schema } from 'mongoose';
import model from './mongoose';

export interface UserType {
	_id: string;
	email: string;
	name: string;
}

const UserSchema = new Schema<UserType>(
	{
		_id: { type: String },
		email: { type: String },
		name: { type: String }
	},
	{
		_id: false
	}
);

// Text index on friends.name
UserSchema.index({ 'friends.name': 'text' });
// Regular index on friends.tags
UserSchema.index({ 'friends.tags': 1 });

export const User = model('user', UserSchema);
