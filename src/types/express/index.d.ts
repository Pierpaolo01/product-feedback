// to make the file a module and avoid the TypeScript error
import {prisma} from "@src/prisma";

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

interface User {
    username: string;
    password: string;
    roles: string;
    created_at: string;
    updated_at: string;
}
