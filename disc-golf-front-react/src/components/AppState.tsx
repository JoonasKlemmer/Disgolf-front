"use client"

import AccountService from "@/services/AccountService";
import { AppContext, IUserInfo } from "@/state/AppContext";
import { useEffect, useState } from "react";

export default function AppState({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>((() => {
        const storedUserInfo = localStorage.getItem("userData");
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    }));
    if(localStorage.getItem("userData") !== null){
        AccountService.refreshJwtToken()
    }
    
    console.log(localStorage.getItem("userData"))


    return (
        <AppContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AppContext.Provider>
    );
}
