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

    static async getAll(jwt: string, wishlistId: string): Promise<IResultObject<IDisc[]>>{
        try {
            const response = await DiscsInWishlistService.httpClient.get<IDisc[]>("/" + wishlistId, {
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

}
