import {body} from "express-validator";
import {prisma} from "@src/prisma";
import {Request, Response} from "express";

import {SuggestionStatus} from "@prisma/client"

export enum SuggestionValidators {
    create,
    update
}

export const SuggestionValidate = (method: SuggestionValidators) => {
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

        res.status(201).json({data: newSuggestion})
    } catch (e) {
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

        res.status(200).json({data: updatedSuggestion})
    } catch (e) {
        res.status(400).json({data: e})
    }

}

export const deleteSuggestion = async (req: Request, res: Response) => {
    try {
        await prisma.suggestion.delete({
            where: {
                id: Number(req.params.suggestionId)
            }
        })
        res.status(204).json()
    } catch (e) {
        res.status(400).json({data: e})
    }
}
