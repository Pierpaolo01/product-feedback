import {Request, Response} from "express";
import {prisma} from "@src/prisma";
import RoadmapStatusOverviewDTO from "@src/dto/roadmapStatusOverviewDTO";
import queryString from "query-string";

export const showRoadmapCount = async (req: Request, res: Response) => {
    try {
        const groupedStatuses = await prisma.suggestion.groupBy({
            by: ['status'],
            _count: {
                _all: true,
            },
        })

        let response;
        response = groupedStatuses
        if (req.query.includeSuggestions === 'true') {
            response = await Promise.all(
                groupedStatuses.map( async (status) => {
                    const suggestions = await prisma.suggestion.findMany({
                        where: {
                            status: status.status
                        }
                    })
                    return {...status, suggestions}
                })
            )
        }

        res.status(200).json({
            data: response.map((item:any) => new RoadmapStatusOverviewDTO(item))
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({data: e})
    }
}

export const roadmapOverview = async (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
}
