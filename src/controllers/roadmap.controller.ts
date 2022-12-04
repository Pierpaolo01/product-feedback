import {Request, Response} from "express";
import {prisma} from "@src/prisma";

export const showRoadmapCount = async (req: Request, res: Response) => {
    try {
        const groupedSuggestion = await prisma.suggestion.groupBy({
            by: ['status'],
            _count: {
                _all: true,
            }
        })

        res.status(200).json({
            data:
                groupedSuggestion.map(item => {
                    return {
                        status: item.status,
                        count: item._count._all
                    }
                })
        })
    } catch (e) {
        res.status(500).json({data: e})
    }
}
