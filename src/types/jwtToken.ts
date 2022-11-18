import {JwtPayload} from "jsonwebtoken";

export interface JwtToken extends JwtPayload{
    userId: number;
    username: string;
}
