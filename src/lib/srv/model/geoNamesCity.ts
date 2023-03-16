import { Schema, model } from 'mongoose';

export interface GeoNamesCityType {
	name: string;
	lat: number;
	lng: number;
	country: string;
	cc: string;
	cc_iso: string;
	ac1?: string;
	ac2?: string;
	aa1?: string;
	aa2?: string;
	tz: string;
}

const GeoNamesCitySchema = new Schema<GeoNamesCityType>({
	name: { type: String, required: true },
	lat: { type: Number, required: true },
	lng: { type: Number, required: true },
	country: { type: String, required: true },
	cc: { type: String, required: true },
	cc_iso: { type: String, required: true },
	ac1: { type: String, required: false },
	ac2: { type: String, required: false },
	aa1: { type: String, required: false },
	aa2: { type: String, required: false },
	tz: { type: String, required: true }
});

GeoNamesCitySchema.index({
	name: 'text',
	ac1: 'text',
	aa1: 'text',
	ac2: 'text',
	country: 'text',
	cc_iso: 'text'
});

export const GeoNamesCity = model<GeoNamesCityType>('geonames_city', GeoNamesCitySchema);
