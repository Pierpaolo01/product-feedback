import axios, {AxiosPromise} from "axios";
import {ApiResponse} from "@client/types/apiResponse";

export default class CommentService {
    public static createComment(suggestion_id: string | number, text: string): AxiosPromise<ApiResponse<any>> {
        return axios.post(`/suggestion/${suggestion_id}/comments`, {text})
    }

    public static indexSuggestionComments(suggestion_id: string | number):AxiosPromise<ApiResponse<any>> {
        return axios.get(`/suggestion/${suggestion_id}/comments`)
    }
}
