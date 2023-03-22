// declare namespace Lucia {
// 	type Auth = import('./lib/srv/lucia').Auth;
// 	type UserAttributes = {
// 		firstName: string;
// 		lastName: string;
// 		profileImg: string;
// 		dobUtc: Date;
// 		tz: string;
// 		birthplace: import('mongodb').ObjectId;
// 		createdAt: Date;
// 	};
// }

declare namespace Lucia {
	type Auth = import('./lib/srv/lucia').Auth;
	type UserAttributes = {
		firstName: string;
		lastName: string;
		profileImg: string;
		dobUtc: Date;
		tz: string;
		birthplace: import('mongodb').ObjectId;
		tags: string[];
		createdAt: Date;
	};
}
