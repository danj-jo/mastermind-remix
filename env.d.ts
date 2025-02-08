
declare namespace NodeJS {
    interface ProcessEnv {
        DB_URI: string;
        // Add more environment variables if needed
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends ProcessEnv {}
    }
}
 declare module "express-session" {
     interface SessionData {
         isAuth: boolean
         userId?: ObjectId
         game?: SinglePlayerGameConfiguration
         destroy: () => void
         user: Player
         difficulty: string
        guesses?: string[]
     }
 }
