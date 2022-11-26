import axios from "axios";
import type {FeedbackForm} from "@client/types/feedbackTypes";

export default class FeedbackService {
    public static createSuggestion(data: FeedbackForm) {
        return axios.post('/suggestion', data);
    }
}
