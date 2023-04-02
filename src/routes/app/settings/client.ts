import type { UserType } from '$lib/srv/model';

export type UserRequestType = Omit<UserType, 'dobUtc' | 'tags' | 'birthplace' | 'createdAt'> & {
	dobUtc: string;
	tags: string;
	birthplace: string;
};

export const updateProfile = async ({ createdAt: _, ...user }: Partial<UserType>) =>
	await fetch('/app/settings?/saveProfile', {
		method: 'POST',
		body: new URLSearchParams({
			...user,
			birthplace: user.birthplace?.toString(),
			dobUtc: user.dobUtc?.valueOf().toString(),
			tags: user.tags?.join(',')
		} as Partial<UserRequestType>)
	}).then<UserType>((res) => res.json());
