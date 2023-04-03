declare namespace Lucia {
	type Auth = import('./lib/srv/lucia').Auth;
	type UserAttributes = {
		firstName: string;
		lastName: string;
		profileImg?: string;
		dobUtc?: Date;
		tz?: string;
		birthplace?: number;
		tags: string[];
		createdAt?: Date;
	};
}
