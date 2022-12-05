import axios, {AxiosPromise} from "axios";
import type {ApiResponse} from "@client/types/apiResponse";
import type {StatusCount} from "@client/types/roadmapTypes";

export default class RoadmapService {
    public static countStatuses(includeSuggestions = false): AxiosPromise<ApiResponse<StatusCount[]>> {
        return axios.get('/roadmap/count', { params: { includeSuggestions } })
    }
}
