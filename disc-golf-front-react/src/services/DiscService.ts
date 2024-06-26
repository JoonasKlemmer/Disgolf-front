import axios from "axios";
import { IResultObject } from "./IResultObject";
import { IDisc } from "@/domain/IDisc";
import { Console } from "console";

export default class DiscService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'https://localhost:7160/api/v1.0/disc',
    });

    static async getAllDiscs(): Promise<IResultObject<IDisc[]>>{
        try {
            const response = await DiscService.httpClient.get<IDisc[]>("", {
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
