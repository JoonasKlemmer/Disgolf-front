import axios from "axios";
import { IResultObject } from "./IResultObject";
import { Console } from "console";
import { IDisc } from "@/domain/IDisc";
import { IDiscFromPage } from "@/domain/IDiscFromPage";


export default class DiscService {
    private constructor() {

    }

    private static httpClient = axios.create({
        //baseURL: 'https://localhost:7160/api/v1.0/discfrompage',
        baseURL: 'https://joklemwebapp24.azurewebsites.net/api/v1.0/discfrompage',
    });

    static async getDiscFromPageById(discId: string): Promise<IResultObject<IDiscFromPage[]>>{
        try {
            const response = await DiscService.httpClient.get<IDiscFromPage[]>("/" + discId, {
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
