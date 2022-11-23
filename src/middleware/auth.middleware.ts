import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

import {JwtToken} from "@type/jwtToken";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.get('Authorization')?.split(' ')[1] ?? '';
    let decodedToken;

    try {
        decodedToken = jwt.verify(jwtToken, 'super-secret') as JwtToken;
    } catch (e) {
        res.status(401).json({data: 'invalid token'});
        return
    }

    req.userId = decodedToken.userId;
    next();
}
