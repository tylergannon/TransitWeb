// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient } from "@prisma/client"

declare global {
  declare var _prismaClient: PrismaClient|undefined
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
      session?: Session
      user?: {
        name: string,
        email: string,
        image?: string
      }
    }
		// interface Platform {}
	}
}

export {};
