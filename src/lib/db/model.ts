export interface Person {
	id?: string;
	name: string;
	utcDob: Date;
	tz: string;
	placeId: string;
	tags: string[];
}

export interface GeonamesCity {
	id: number;
	name: string;
	nameAscii: string;
	cc: string;
	ac1: string;
	ac2: string;
	country: string;
	aa1: string;
	aa2: string;
	tz: string;
}

export interface GeonamesAdminArea {
	id: string;
	name: string;
	nameAscii: string;
}
