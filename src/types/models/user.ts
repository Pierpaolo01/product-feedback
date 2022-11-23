import {Role} from "@prisma/client"

export interface User {
    id: number;
    username: string;
    password: string;
    role: Role;
    Feedback: any[];
    created_at: Date;
    updated_at: Date;
}
