import React, { useState, createContext } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [ isAdmin, setIsAdmin ] = useState(true)

    const handleIsAdmin = () => {
        setIsAdmin(!isAdmin)
    }

    return(
        <UserContext.Provider value={{ isAdmin, handleIsAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;