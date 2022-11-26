import axios, {AxiosPromise} from "axios";
import {LoginForm, SignupForm} from "@client/types/authenticationTypes";
import {ApiResponse} from "@client/types/apiResponse";

export default class AuthenticationService {
    public static login(data: LoginForm): AxiosPromise<ApiResponse<any>> {
        return axios.post('/login', data)
    }

    public static signup(data: SignupForm): AxiosPromise<ApiResponse<any>> {
        return axios.post('/signup', data)
    }
}
