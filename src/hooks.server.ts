import type { Provider } from '@auth/core/providers'
import type { Profile } from '@auth/core/types'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { GITHUB_OAUTH_ID, GITHUB_OAUTH_SECRET } from "$env/static/private"

const prisma = new PrismaClient()

export const handle = SvelteKitAuth({
  providers: [
    GitHub(
      { 
        clientId: GITHUB_OAUTH_ID, 
        clientSecret: GITHUB_OAUTH_SECRET 
      }) as unknown as Provider<Profile>
  ],
  // @ts-ignore
  adapter: PrismaAdapter( prisma ),
  callbacks: { }
})

