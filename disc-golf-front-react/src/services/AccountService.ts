import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";
import { IRegisterData } from "@/domain/IRegisterData";
import { userInfo } from "os";


export default class AccountService {
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
                localStorage.setItem('jwtToken', response.data.jwt);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                console
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

    static async register(data: IRegisterData): Promise<IResultObject<IUserInfo>> {
        try {
            const response = await AccountService.httpClient.post<IUserInfo>("register", data);

            console.log('register response', response);
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (e) {
            return {
                errors: [JSON.stringify(e)]
            };
        }
    }

    static async logout(data: IUserInfo): Promise<true | undefined> {
        try {
            localStorage.removeItem('userData');
            const response = await AccountService.httpClient.post(
                'logout', { refreshToken: data.refreshToken },
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.jwt,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('logout response', response);
            if (response.status === 200) {
                
                
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    static async refreshJwtToken(): Promise<IResultObject<IUserInfo>> {
    
        try {

            let item = JSON.parse(localStorage.getItem("userData")!);
            
            const response = await AccountService.httpClient.post(
                'RefreshTokenData', { jwt: item.jwt, refreshToken: item.refreshToken},
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
                        'Content-Type': 'application/json'
                    }
                })
                
            if (response.status < 300) {
                console.log("UUENDASIN JWT JA REFRESH TOKENI")
                item.refreshToken = response.data.refreshToken;
                item.jwt = response.data.jwt;
                
                localStorage.setItem("userData", JSON.stringify(item))
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
