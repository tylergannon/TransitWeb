import mongoose, { Schema } from 'mongoose';

export interface GeoNamesCityType {
	_id: number;
	name: string;
	names: string[];
	place: string[];
	tz: string;
}

export const GeoNamesCitySchema = new Schema<GeoNamesCityType>(
	{
		_id: { type: Number },
		name: { type: String, required: true },
		names: { type: [String], required: true, index: true },
		place: { type: [String], required: true, index: true },
		tz: { type: String, required: true, index: true }
	},
	{ collection: 'geoNamesCities' }
);
