import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";


export default class AccountService {
    private constructor() {

    }
    

    private static httpClient = axios.create(
        {
        baseURL: 'https://localhost:7160/api/v1.0/Identity/Account/',
    });

    static async login(email: string, pwd: string): Promise<IResultObject<IUserInfo>> {
        const loginData = {
            Email: email,
            Password: pwd
        }
        try {
            const response = await AccountService.httpClient.post<IUserInfo>("Login", loginData);
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

}
