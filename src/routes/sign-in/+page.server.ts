import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ locals }) => {
  if (await locals.getSession() !== null) {
    throw redirect(307, "/app")
  }
}) satisfies PageServerLoad;

