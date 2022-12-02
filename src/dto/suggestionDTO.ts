import type {Suggestion, SuggestionLike} from "@prisma/client";

export default class SuggestionDTO {
    id: number
    title: string
    category: string
    description: string
    is_liked: boolean
    likes: number
    status: string
    update_at: Date
    user_id: number
    created_at: Date

    constructor(data: (Suggestion & {suggestionLike?: SuggestionLike[], _count?: {suggestionLike: number}})) {
        this.id = data.id
        this.title = data.title
        this.category = data.category
        this.description = data.description
        this.is_liked = !!data.suggestionLike?.length
        this.likes = data._count?.suggestionLike ?? 0
        this.status = data.status
        this.update_at = data.updated_at
        this.user_id = data.user_id
        this.created_at = data.created_at
    }
}
