import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";

import { IDisc } from "@/domain/IDisc";
import { IDiscFromPage } from "@/domain/IDiscFromPage";
import AccountService from "./AccountService";

export default class DiscsInWishlistService {
    private constructor() {

    }

    

    private static httpClient = axios.create({
        baseURL: 'https://localhost:7160/api/v1.0/discsinwishlist',
    });

    static async getAllDiscsInWishlistById(): Promise<IResultObject<IDiscFromPage[]>>{
        try {
            let jwt = JSON.parse(localStorage.getItem("userData")!).jwt;
            const response = await DiscsInWishlistService.httpClient.get<IDiscFromPage[]>("/", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });

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


    static async deleteFromWishlist(discsInWishlistId: string): Promise<IResultObject<IDiscFromPage[]>>{
        let jwt = JSON.parse(localStorage.getItem("userData")!).jwt;
        try {
            const response = await DiscsInWishlistService.httpClient.delete<void>("/" + discsInWishlistId, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });

            if (response.status < 300) {
                return {
                    
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





    static async addDiscToWishlist(wishlistId: string, discFromPageId: string){
        try {
            let jwt = JSON.parse(localStorage.getItem("userData")!).jwt;
            const requestBody = {
                DiscFromPageId: discFromPageId,
                WishlistId: wishlistId
            };
            const response = await DiscsInWishlistService.httpClient.post<IDisc[]>("/",
            requestBody, 
            {
                headers: {
                    "Authorization": "Bearer " + jwt,
                    "Content-Type": "application/json"
                },
            });

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

    static async discAlreadyInWishlist(discFromPageId: string): Promise<IResultObject<boolean>> {
        try {
            let jwt = JSON.parse(localStorage.getItem("userData")!).jwt;
            const response = await DiscsInWishlistService.httpClient.get<boolean>("/" + discFromPageId, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
    
            if (response.status < 300) {
                console.log(response);
                return {
                    data: response.data
                };
            }
    
            return {
                errors: [response.status.toString() + " " + response.statusText]
            };
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }
    

}
