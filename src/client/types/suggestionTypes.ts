import {SuggestionCategories} from "@constants/suggestionCategories"

export interface SuggestionType {
    id: number;
    title: number;
    description: string;
    category: string;
    status: string;
    user_id: number;
    is_liked: boolean;
    likes: number;
    created_at: string;
    update_at: string;
}

export interface SuggestionFormType {
    title: string;
    category: SuggestionCategories;
    description: string;
}
