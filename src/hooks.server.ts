import type { Provider } from '@auth/core/providers'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import EmailProvider from "next-auth/providers/email"


import {
  GOOGLE_OAUTH_ID,
  GOOGLE_OAUTH_SECRET,
  GITHUB_OAUTH_ID,
  GITHUB_OAUTH_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM
} from "$env/static/private"

const prisma = new PrismaClient()

const prov = (x: any) => x as unknown as Provider

export const handle = SvelteKitAuth({
  providers: [
    prov(GitHub({ clientId: GITHUB_OAUTH_ID, clientSecret: GITHUB_OAUTH_SECRET })),
    prov(Google({ clientId: GOOGLE_OAUTH_ID, clientSecret: GOOGLE_OAUTH_SECRET })),
    prov(EmailProvider({
      server: {
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      },
      from: SMTP_FROM
    }))
  ],
  // @ts-ignore
  adapter: PrismaAdapter( prisma ),
  callbacks: { }
})

