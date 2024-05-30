"use client"

import React, { useState, useEffect } from 'react';

import { AppContext, IUserInfo } from '@/state/AppContext';

const AppState: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const storedUserInfo = localStorage.getItem("userData");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        }
    }, []);

    useEffect(() => {
        if (userInfo && typeof localStorage !== 'undefined') {
            localStorage.setItem("userData", JSON.stringify(userInfo));
        }
    }, [userInfo]);
    
    return (
        <AppContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppState;
