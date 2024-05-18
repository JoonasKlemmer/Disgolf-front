import { createContext } from "react";

export interface IUserInfo {
    "jwt": string,
    "refreshToken": string,
    "firstName": string,
    "lastName": string
}

export interface IUserContext {
    userInfo: IUserInfo,
    setUserInfo: (userInfo: IUserInfo | null) => void
}


export const AppContext = createContext<IUserContext | null>(null);
