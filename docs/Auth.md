# Auth Notes

We're using [Auth JS][0], which is in alpha and will change.

* The [Svelte plugin][1] handles integration with Svelte.
* The [Prisma adapter][2] ensures user data is stored in the database.

## Session Management

See the [session management][3] docs page.  Our `+layout.server.ts`
copies that code and sets the user session to `event.locals.session`.

[0]: https://authjs.dev
[1]: https://authjs.dev/reference/sveltekit
[2]: https://authjs.dev/reference/adapters/prisma
[3]: https://authjs.dev/reference/sveltekit#managing-the-session

