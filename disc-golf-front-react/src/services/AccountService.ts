import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";
import { IRegisterData } from "@/domain/IRegisterData";
import jwt from "jsonwebtoken"




export default class AccountService {

    static readonly expiresInSeconds = 10
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
            
            const response = await AccountService.httpClient.post<IUserInfo>("Login"+ "?expiresInSeconds="+ AccountService.expiresInSeconds, loginData);
            if (response.status < 300) {
                localStorage.setItem("userData", JSON.stringify(response.data))
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

    static async logout(): Promise<true | undefined> {
        await AccountService.isTokenExpired();
        try {
            let item = JSON.parse(localStorage.getItem("userData")!);
            const response = await AccountService.httpClient.post(
                'logout', { refreshToken: item.refreshToken },
                {
                    headers: {
                        'Authorization': 'Bearer ' + item.jwt,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                
                localStorage.removeItem("userData");
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
                'RefreshTokenData'+ "?expiresInSeconds="+ AccountService.expiresInSeconds, { jwt: item.jwt, refreshToken: item.refreshToken},
                {
                    headers: {
                        'Authorization': 'Bearer ' + item.jwt,
                        'Content-Type': 'application/json'
                    }
                })
                
            if (response.status < 300) {
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

    static  isTokenExpired = async (): Promise<boolean> => {
        const jwtFromUserData = JSON.parse(localStorage.getItem("userData")!).jwt;
        try {
            const { exp } = jwt.decode(jwtFromUserData) as { exp: number };
            const expirationDatetimeInSeconds = exp * 1000;
            if(Date.now() >= expirationDatetimeInSeconds){
                await AccountService.refreshJwtToken();
                console.log("REFRESHED TOKEN")
            }
            return true;
        } catch {
            return true;
        }
    };

}
