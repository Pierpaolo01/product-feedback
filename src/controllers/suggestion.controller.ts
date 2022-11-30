import {body} from "express-validator";
import {prisma} from "@src/prisma";
import {Request, Response} from "express";

import {SuggestionStatus} from "@constants/suggestionStatus";


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
                        suggestionLike: true
                    }
                },
                suggestionLike: {
                    where: {
                        user_id: Number(req.userId)
                    }
                }
            }
        })

        const data = suggestionsData.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                category: item.category,
                status: item.status,
                user_id: item.user_id,
                is_liked: !!item.suggestionLike.length,
                likes: item._count.suggestionLike,
                created_at: item.created_at,
                update_at: item.updated_at,
            }
        })

        res.status(200).json({data})
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

        res.status(201).json({data: {
                id: newSuggestion.id,
                title: newSuggestion.title,
                description: newSuggestion.description,
                category: newSuggestion.category,
                status: newSuggestion.status,
                user_id: newSuggestion.user_id,
                is_liked: false,
                likes: 0,
                created_at: newSuggestion.created_at,
                update_at: newSuggestion.updated_at,
            }})
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

        res.status(204).json({data: updatedSuggestion})
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
                        suggestionLike: true
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

        return res.status(200).json({data: {
                id: suggestionData.id,
                title: suggestionData.title,
                description: suggestionData.description,
                category: suggestionData.category,
                status: suggestionData.status,
                user_id: suggestionData.user_id,
                is_liked: !!suggestionData.suggestionLike.length,
                likes: suggestionData._count.suggestionLike,
                created_at: suggestionData.created_at,
                update_at: suggestionData.updated_at,
            }})
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
