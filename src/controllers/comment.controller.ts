import {prisma} from "@src/prisma";
import {Request, Response} from "express";
import {body} from "express-validator";

export enum CommentValidators {
    CREATE,
    REPLY
}

export const CommentValidation = (method: CommentValidators) => {
    switch (method) {
        case CommentValidators.CREATE: {
            return [
                body('text')
                    .isLength({ min: 5, max:5 })
            ]
        }
        case CommentValidators.REPLY: {
            return []
        }
    }
}


export const createSuggestionComment = async (req: Request, res: Response) => {
    try {
        const comment = await prisma.suggestionComment.create({
            data: {
                text: req.body.text,
                user_id: req.userId!,
                suggestion_id: Number(req.params.suggestionId)
            }
        })

        console.log(comment)

        res.status(201).json({data: comment})
    } catch (e) {
        res.status(400).json({data: e})
    }
}

export const indexSuggestionComments = async (req: Request, res: Response) => {
    const comments = await prisma.suggestionComment.findMany({
        where: {
            suggestion_id: Number(req.params.suggestion_id)
        }
    })

    res.status(200).json({data: comments})
}
