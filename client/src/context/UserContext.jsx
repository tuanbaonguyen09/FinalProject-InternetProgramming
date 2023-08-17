import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userName, setUserName] = useState("HEllo")
    const [isLogin, setIsLogin] = useState()
    return (
        <UserContext.Provider value={{userName, setUserName, isLogin, setIsLogin}}>
            {children}
        </UserContext.Provider>
    )

}


