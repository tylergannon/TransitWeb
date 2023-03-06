import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (session === null) return {session: null};
  
  return {
    session,
    user: {
      name: session.user?.name ?? "Joe Schmidt",
      email: session.user?.email ?? "joe@no.co",
      image: session.user?.image ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/African_emerald_cuckoo_%28Chrysococcyx_cupreus%29_male.jpg/1000px-African_emerald_cuckoo_%28Chrysococcyx_cupreus%29_male.jpg"
    }
  }
}

