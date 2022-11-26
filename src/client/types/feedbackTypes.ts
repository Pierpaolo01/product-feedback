import {SuggestionCategories} from "@constants/suggestionCategories"

export interface FeedbackForm {
    title: string;
    category: SuggestionCategories;
    description: string;
}
