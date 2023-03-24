import { PUBLIC_ASTROAPI_URL } from '$env/static/public';
import { zonedTimeToUtc, format } from 'date-fns-tz';

export type PlanetData<T> = {
	sun: T;
	moon: T;
	earth: T;
	mars: T;
	jupiter: T;
	saturn: T;
	uranus: T;
	neptune: T;
	pluto: T;
	northNode: T;
	chiron?: T;
	ceres?: T;
};

export type PlanetDataJson<T> = {
	sun: T;
	moon: T;
	earth: T;
	mars: T;
	jupiter: T;
	saturn: T;
	uranus: T;
	neptune: T;
	pluto: T;
	north_node: T;
	chiron?: T;
	ceres?: T;
};

export type Position = [number, number, number, number, number, number, number, number];

export type ChartJson = PlanetDataJson<Position> & ChartDateJson;

export type HdChartJson = {
	natal: ChartJson;
	design: ChartJson;
};

export type HdChartRequestJSON = {
	local_date: string;
	local_time: string;
	tz: string;
};

export type ChartDateJson = {
	date: string;
	time: string;
	tz: string;
};

export type TransitionReportJson = {
	start_date: ChartDateJson;
	end_date: ChartDateJson;
	chart: ChartJson;
	transitions: [keyof PlanetData<any>, ChartJson][];
	strict?: boolean;
	lines?: string[];
};

export function chartRequest(date: string, time: string, tz: string) {
	const dateUtc = zonedTimeToUtc(`${date} ${time}`, tz);
	return fetch(
		PUBLIC_ASTROAPI_URL +
			'/chart?' +
			new URLSearchParams({
				local_date: format(dateUtc, 'yyyy-MM-dd'),
				local_time: format(dateUtc, 'HH:mm:ss'),
				tz
			}).toString()
	).then((res) => res.json()) as Promise<HdChartJson>;
}

export function transitionReportRequest(utcStart: Date, utcEnd: Date, tz: string) {
	return fetch(
		PUBLIC_ASTROAPI_URL +
			'/transition_report?' +
			new URLSearchParams({
				start_date: format(utcStart, 'yyyy-MM-dd'),
				start_time: format(utcStart, 'HH:mm:ss'),
				end_date: format(utcEnd, 'yyyy-MM-dd'),
				end_time: format(utcEnd, 'HH:mm:ss'),
				tz
			}).toString()
	).then((res) => res.json()) as Promise<TransitionReportJson>;
}
