// to make the file a module and avoid the TypeScript error
import { User } from "@type/models/user.ts";

export {}
declare global {
    namespace Express {
        export interface Request {
            userId?: number;
            user?: User;
        }
        export interface Response {}
    }
}

