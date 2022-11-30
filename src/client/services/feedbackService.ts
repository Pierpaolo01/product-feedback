import axios, {AxiosPromise} from "axios";
import type {FeedbackForm} from "@client/types/feedbackTypes";
import {ApiResponse} from "@client/types/apiResponse";

export default class FeedbackService {
    public static createSuggestion(data: FeedbackForm) {
        return axios.post('/suggestion', data);
    }

    public static indexSuggestions():AxiosPromise<ApiResponse<any>> {
        return axios.get('/suggestions')
    }

    public static createSuggestionLike(id: number): AxiosPromise<ApiResponse<any>> {
        return axios.post(`/suggestion/${id}/like`)
    }

    public static deleteSuggestionLike(id: number): AxiosPromise<ApiResponse<any>> {
        return axios.delete(`/suggestion/${id}/unlike`)
    }
}
