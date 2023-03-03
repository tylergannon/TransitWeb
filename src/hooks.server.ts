import type { Provider } from '@auth/core/providers'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"

import { GITHUB_OAUTH_ID, GITHUB_OAUTH_SECRET, GOOGLE_OAUTH_ID, GOOGLE_OAUTH_SECRET } from "$env/static/private"

const prisma = new PrismaClient()

/**
  * Appease Typescript about the fact that these factories return
  * duck-typed Provider objects that aren't proper type descendants of Provider.
  * */
function provider(factory: (conf: any)=>any, id: String, sec: String) {
  return factory({clientId: id, clientSecret: sec}) as unknown as Provider
}

export const handle = SvelteKitAuth({
  providers: [
    provider(GitHub, GITHUB_OAUTH_ID, GITHUB_OAUTH_SECRET),
    provider(Google, GOOGLE_OAUTH_ID, GOOGLE_OAUTH_SECRET),
  ],
  // @ts-ignore
  adapter: PrismaAdapter( prisma ),
  callbacks: { }
})

