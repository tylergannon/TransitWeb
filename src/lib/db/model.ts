export interface Person {
	id?: number;
	name: string;
	utcDob: Date;
	tz: string;
	chartId?: number;
}

export interface GeonamesCity {
	id?: number;
	name: string;
	nameAscii: string;
	cc: string;
	admin1: string;
	admin2: string;
	tz: string;
}

export interface GeonamesAdminArea {
	id: string;
	name: string;
	nameAscii: string;
}
