import {JwtPayload} from "jsonwebtoken";
import {Role} from "@prisma/client"

export interface JwtToken extends JwtPayload{
    userId: number;
    username: string;
    role: Role
}
