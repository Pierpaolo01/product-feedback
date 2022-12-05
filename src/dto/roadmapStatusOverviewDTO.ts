import SuggestionDTO from "@src/dto/suggestionDTO";
import type {Suggestion} from "@prisma/client";

export default class RoadmapStatusOverviewDTO {
    status: string
    count: number
    suggestions?: SuggestionDTO[]

    constructor(data: {status: string, _count: { _all: number }, suggestions?: Suggestion[] }) {
        this.status = data.status
        this.count = data._count._all
        this.suggestions = data.suggestions?.map(suggestion => new SuggestionDTO(suggestion)) || undefined
    }
}
