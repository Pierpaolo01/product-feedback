import { body } from "express-validator"
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
                body('first_name')
                    .notEmpty().withMessage('First name is required'),
                body('last_name')
                    .notEmpty().withMessage('Last name is required'),
                body('username')
                    .notEmpty().withMessage('Username is required')
                    .isAlphanumeric().withMessage('Username can only include letters and numbers')
                    .custom(async (value: string) => {
                            const usernameCheck = await prisma.user.findFirst({
                                where: {
                                    username: value,
                                },
                            })
                            if (usernameCheck !== null) {
                                return Promise.reject()
                            }
                    }).withMessage("Username already taken"),
                body('password')
                    .custom((value) => {
                        if (value.split('').length <= 5) {
                            return Promise.reject()
                        }
                        return Promise.resolve()
                    }).withMessage('Password must be longer then 5 characters')
            ]
        }
        case Validators.login: {
            return [
                body("username", "invalid username")
                    .exists()
                    .custom(async (username: string, {req}) => {
                        const user = await prisma.user.findFirst({
                            where: {
                                username
                            }
                        })
                        if (user === null) {
                            return Promise.reject()
                        }
                        req.user = user
                    }),
                body('password', "invalid password")
                    .exists()
                    .custom(async (password, {req}) => {
                        if (!await bcrypt.compare(password, req.user?.password ?? "")) {
                            return Promise.reject()
                        }
                    })
            ]
        }
    }
}



export const signUp = async (req: Request, res: Response) => {
    const { first_name, last_name, username, password }: { [key:string]: string } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
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
        res.status(201).json({data: jwtToken})
        return
    }

export const login = async (req: Request, res: Response) => {
    const jwtPayload: any = {
        userId: req.user!.id,
        username: req.user!.username,
        role: req.user!.role
    }

    const jwtToken = jwt.sign(jwtPayload, 'super-secret', {expiresIn: '15m'})
    return res.status(200).json({data: jwtToken})
}
