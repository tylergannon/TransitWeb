import { format, utcToZonedTime } from 'date-fns-tz';
const PUBLIC_ASTROAPI_URL = '/astroapi';

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

const _fmt = (d: Date, t: string, p: string) => format(utcToZonedTime(d, t), p, { timeZone: t });
const fDate = (d: Date, t: string) => _fmt(d, t, 'yyyy-MM-dd');
const fTime = (d: Date, t: string) => _fmt(d, t, 'HH:mm:ss');

export function fetchChart(dobUtc: Date, timeZone: string, _fetch: typeof fetch) {
	console.log('borg', dobUtc.toUTCString(), timeZone);
	return _fetch(
		PUBLIC_ASTROAPI_URL +
			'/chart?' +
			new URLSearchParams({
				local_time: fTime(dobUtc, timeZone),
				tz: timeZone,
				local_date: fDate(dobUtc, timeZone)
			}).toString()
	).then((res) => res.json()) as Promise<HdChartJson>;
}

export function transitionReportRequest(
	utcStart: Date,
	utcEnd: Date,
	timeZone: string,
	_fetch: typeof fetch
) {
	return _fetch(
		PUBLIC_ASTROAPI_URL +
			'/transition_report?' +
			new URLSearchParams({
				start_date: fDate(utcStart, timeZone),
				start_time: fTime(utcStart, timeZone),
				end_date: fDate(utcEnd, timeZone),
				end_time: fTime(utcEnd, timeZone),
				tz: timeZone
			}).toString()
	).then((res) => res.json()) as Promise<TransitionReportJson>;
}
