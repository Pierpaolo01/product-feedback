import {NextFunction, Request, Response} from "express";

const {validationResult } = require('express-validator')

export const catchValidationError = (req: Request, res: Response, next: NextFunction) => {
    const { errors } = validationResult(req)

    if (errors.length) return res.status(422).json({data: {errors}})

    next()
}
