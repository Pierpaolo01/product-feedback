import axios, {AxiosPromise} from "axios";
import type {ApiResponse} from "@client/types/apiResponse";
import type {CommentType} from "@client/types/commentTypes";


export default class CommentService {
    public static createComment(suggestion_id: string | number, text: string): AxiosPromise<ApiResponse<CommentType>> {
        return axios.post(`/suggestion/${suggestion_id}/comments`, {text})
    }

    public static indexSuggestionComments(suggestion_id: string | number):AxiosPromise<ApiResponse<CommentType[]>> {
        return axios.get(`/suggestion/${suggestion_id}/comments`)
    }

    public static submitReply(comment_id: number, data: any): AxiosPromise<ApiResponse<any>> {
        return axios.post(`/comments/${comment_id}/reply`, data)
    }
}
