import type {SuggestionType} from "@client/types/suggestionTypes";

export interface StatusCount {
    status: string
    count: number
    suggestion?: SuggestionType[]
}
