import axios, {AxiosPromise} from "axios";
import type {SuggestionFormType} from "@client/types/suggestionTypes";
import type {ApiResponse} from "@client/types/apiResponse";
import type {SuggestionType} from "@client/types/suggestionTypes";

export default class FeedbackService {
    public static createSuggestion(data: SuggestionFormType): AxiosPromise<ApiResponse<SuggestionType>> {
        return axios.post('/suggestion', data);
    }

    public static indexSuggestions():AxiosPromise<ApiResponse<Array<SuggestionType>>> {
        return axios.get('/suggestions')
    }

    public static createSuggestionLike(id: number): AxiosPromise {
        return axios.post(`/suggestion/${id}/like`)
    }

    public static deleteSuggestionLike(id: number): AxiosPromise {
        return axios.delete(`/suggestion/${id}/unlike`)
    }
}
