import axios, {AxiosPromise} from "axios";
import type {CreateSuggestionFormType} from "@client/types/suggestionTypes";
import type {ApiResponse} from "@client/types/apiResponse";
import type {SuggestionType} from "@client/types/suggestionTypes";

export default class SuggestionService {
    public static createSuggestion(data: CreateSuggestionFormType): AxiosPromise<ApiResponse<SuggestionType>> {
        return axios.post('/suggestion', data);
    }

    public static indexSuggestions():AxiosPromise<ApiResponse<Array<SuggestionType>>> {
        return axios.get('/suggestions')
    }

    public static showSuggestion(id: string | number): AxiosPromise<ApiResponse<SuggestionType>> {
        return axios.get(`/suggestion/${id}`)
    }

    public static updateSuggestion(id: string | number, data: SuggestionType): AxiosPromise<ApiResponse<SuggestionType>> {
        return axios.put(`/suggestion/${id}`, data)
    }

    public static deleteSuggestion(id: string | number):AxiosPromise {
        return axios.delete(`/suggestion/${id}`)
    }

    public static createSuggestionLike(id: number): AxiosPromise {
        return axios.post(`/suggestion/${id}/like`)
    }

    public static deleteSuggestionLike(id: number): AxiosPromise {
        return axios.delete(`/suggestion/${id}/unlike`)
    }
}
