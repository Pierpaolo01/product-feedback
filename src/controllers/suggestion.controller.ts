import {body} from "express-validator";
import {prisma} from "@src/prisma";
import {Request, Response} from "express";

import {SuggestionStatus} from "@constants/suggestionStatus";
import SuggestionDTO from "@src/dto/suggestionDTO";


export enum SuggestionValidators {
    create,
    update
}

export const SuggestionValidation = (method: SuggestionValidators) => {
    switch (method) {
        case SuggestionValidators.create: {
            return [
                body('title')
                    .notEmpty().withMessage('Title field is required'),
                body('description')
                    .notEmpty().withMessage('Description field is required'),
                body("category")
                    .notEmpty().withMessage('Please select a category')
            ]
        }
        case SuggestionValidators.update: {
            return [
                body('title')
                    .notEmpty().withMessage('Title field is required'),
                body('description')
                    .notEmpty().withMessage('Description field is required'),
                body("category")
                    .notEmpty().withMessage('Please select a category'),
                body('status', "Invalid status")
                    .notEmpty().withMessage("Status is required")
                    .custom(async (value) => {
                        if (!Object.values(SuggestionStatus).includes(value)) {
                            return Promise.reject()
                        }
                    })
            ]
        }
    }
}

export const indexSuggestions = async (req: Request, res: Response) => {
    try {
        const suggestionsData = await prisma.suggestion.findMany({
            include: {
                _count: {
                    select: {
                        suggestionLike: true,
                        suggestionComment: true
                    }
                },
                suggestionLike: {
                    where: {
                        user_id: Number(req.userId),
                    }
                }
            }
        })
        res.status(200).json({
            data: suggestionsData.map((item) => new SuggestionDTO(item))
        })
    } catch (e) {
        res.status(400).json({data: e})
    }
}

export const createSuggestion = async (req: Request, res: Response) => {
    try {
        const newSuggestion = await prisma.suggestion.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                status: SuggestionStatus.PLANNED,
                user_id: Number(req.userId),
            }
        })

        res.status(201).json({data: new SuggestionDTO(newSuggestion)})
    } catch (e) {
        console.log(e)
        res.status(400).json({data: e})
    }
}

export const updateSuggestion = async (req: Request, res: Response) => {
    try {
        const updatedSuggestion = await prisma.suggestion.update({
            data: {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                status: req.body.status,
            },
            where: {
                id: Number(req.params.suggestionId)
            }
        })

        res.status(204).json({data: new SuggestionDTO(updatedSuggestion)})
    } catch (e) {
        res.status(400).json({data: e})
    }

}

export const showSuggestion = async (req: Request, res: Response) => {
    try {
        const suggestionData = await prisma.suggestion.findFirst({
            where: {
                id: Number(req.params.suggestionId)
            },
            include: {
                _count: {
                    select: {
                        suggestionLike: true,
                        suggestionComment: true
                    }
                },
                suggestionLike: {
                    where: {
                        user_id: Number(req.userId)
                    }
                }
            }
        })

        if (suggestionData === null) return res.status(404).json()

        return res.status(200).json({data: new SuggestionDTO(suggestionData)})
    } catch (e) {

    }
}

export const deleteSuggestion = async (req: Request, res: Response) => {
    try {
        await prisma.suggestionLike.deleteMany({
            where: {
                suggestion_id: Number(req.params.suggestionId)
            }
        })

        await prisma.suggestion.delete({
            where: {
                id: Number(req.params.suggestionId)
            }
        })
        res.status(204).json()
    } catch (e) {
        console.log(e)
        res.status(400).json({data: e})
    }
}

export const likeSuggestion = async (req: Request, res: Response) => {
    try {

        const like = await prisma.suggestionLike.findFirst({
            where: {
                user_id: Number(req.userId),
                suggestion_id: Number(req.params.suggestionId)
            }
        })

        if (like) return res.status(403).json({
            data: "cannot like more then once"
        })

        await prisma.suggestionLike.create({
            data: {
                user_id: Number(req.userId),
                suggestion_id: Number(req.params.suggestionId)
            }
        })
        res.status(201).json()
    } catch (e) {
        res.status(400).json({data: e})
    }
}

export const unlikeSuggestion = async (req: Request, res: Response) => {
    try {
        await prisma.suggestionLike.deleteMany({
            where: {
                user_id: Number(req.userId),
                suggestion_id: Number(req.params.suggestionId)
            }
        })
        res.status(204).json()
    } catch (e) {
        res.status(400).json({data: e})
    }
}
