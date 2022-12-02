import {prisma} from "@src/prisma";
import {Request, Response} from "express";
import {body} from "express-validator";
import CommentDTO from "@src/dto/commentDTO";

export enum CommentValidators {
    CREATE,
    REPLY
}

export const CommentValidation = (method: CommentValidators) => {
    switch (method) {
        case CommentValidators.CREATE: {
            return [
                body('text')
                    .notEmpty().withMessage("Comment cannot be empty")
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
            },
            include: {
                user: true
            }
        })

        res.status(201).json({data: new CommentDTO(comment)})
    } catch (e) {
        res.status(400).json({data: e})
    }
}

export const indexSuggestionComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.suggestionComment.findMany({
            where: {
                suggestion_id: Number(req.params.suggestionId)
            },
            include: {
                user: true
            }
        })

        res.status(200).json({data:
                comments.map(comment => new CommentDTO(comment))
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({data: e})
    }
}
