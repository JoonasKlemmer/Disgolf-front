import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";
import { IDisc } from "@/domain/IDisc";

export default class DiscsInWishlistService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'https://localhost:7160/api/v1.0/discsinwishlist',
    });

    static async getWishlistById(jwt: string): Promise<IResultObject<IDisc[]>>{
        try {
            const response = await DiscsInWishlistService.httpClient.get<IDisc[]>("/", {
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


    static async deleteFromWishlist(jwt: string, discsInWishlistId: string): Promise<IResultObject<IDisc[]>>{
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





    static async addDiscToWishlist(jwt: string, wishlistId: string, discFromPageId: string){
        try {
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

}
