import { ObjectID } from 'bson';
import { Schema } from 'mongoose';
import type { Model } from 'mongoose';
import slugify from 'slugify';

export interface PersonType {
	_id: ObjectID;
	slug: string;
	userId: string;
	firstName: string;
	lastName?: string;
	dobUtc: Date;
	tz: string;
	placeId: number;
	tags: string[];
}

export type NewPersonType = Omit<PersonType, '_id' | 'slug'>;

export interface PersonModel extends Model<PersonType> {
	createPerson(person: NewPersonType): Promise<{ _id: ObjectID; slug: string }>;
}

export const PersonSchema = new Schema<PersonType>(
	{
		_id: { type: Schema.Types.ObjectId, required: true },
		userId: { type: String, required: true, ref: 'User' },
		slug: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: false },
		dobUtc: { type: Date, required: true },
		placeId: { type: Number, required: true, ref: 'GeoNamesCity' },
		tz: { type: String, required: true },
		tags: { type: [String], required: true, default: [] }
	},
	{
		statics: {
			async createPerson(this: import('mongoose').Model<PersonType>, person: NewPersonType) {
				const _id = new ObjectID();
				const slug = slugify(
					person.lastName ? `${person.firstName} ${person.lastName}` : person.firstName,
					{ lower: true }
				);
				// Catch mongo errors of duplicate index key
				try {
					await this.create({ ...person, _id, slug });
				} catch (e) {
					const code = (e as { code?: number }).code;
					if (!(code === 11000 || code === 11001)) throw e;

					await this.create({
						...person,
						_id,
						slug: `${slug}-${_id.toString().substring(0, 5)})}`
					});
				}
				return { _id, slug };
			}
		}
	}
);

// I want a unique index across userId and slug.
PersonSchema.index({ userId: 1, slug: 1 }, { unique: true });
PersonSchema.index({ userId: 1, tags: 1 });
