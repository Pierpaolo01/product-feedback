import { body } from "express-validator"
const {validationResult } = require('express-validator')
import {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { prisma } from "@src/prisma"
import {Role} from "@prisma/client"
import {JwtToken} from "@type/jwtToken";

export enum Validators {
    signup,
    login
}

export const validate = (method: Validators) => {
    switch (method) {
        case Validators.signup: {
            return [
                body('username')
                    .notEmpty().withMessage('Username is required')
                    .isAlphanumeric().withMessage('Username can only include letters and numbers')
                    .custom(async (value: string) => {
                        const usernameCheck =  prisma.user.findFirst({
                            where: {
                                username: value,
                            },
                        })
                        if (usernameCheck !== null) {
                            return Promise.reject()
                        }
                    }).withMessage("Username already taken")
            ]
        }
        case Validators.login: {
            return []
        }
    }
}

export const signUp =  async (req: Request, res: Response) => {
    const {errors} = validationResult(req)

    if (errors) {
        return res.status(422).send({data: errors})
    }

    const {username, password}: {username: string, password: string} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: Role.USER
        }
    })

    const jwtPayload: JwtToken = {
        userId: newUser.id,
        username: newUser.username,
        role: newUser.role
    }

    const jwtToken = jwt.sign(jwtPayload, 'super-secret', {expiresIn: '15m'})
    res.status(201).send({data: jwtToken})
}


