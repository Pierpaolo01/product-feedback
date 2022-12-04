import {SuggestionCategories} from "@constants/suggestionCategories"

export interface SuggestionType {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    user_id: number;
    is_liked: boolean;
    likes: number;
    comments: number;
    created_at: string;
    update_at: string;
}

export interface CreateSuggestionFormType {
    title: string;
    category: SuggestionCategories;
    description: string;
}

export interface EditSuggestionFormType {
    title: string;
    category: SuggestionCategories;
    description: string;
}
