import { createContext, useEffect, useState } from "react";

// The below code is gonna used for the UserDetails and send to whereever it is requrired in the site where the user as object is passed and if info is there the return info else return null.
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // This will udate the user changes and we donot have to referesh it again and again it will handle from here.
    const updateUser = (data) => {
        setCurrentUser(data);
    };
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
        }, [currentUser]);
    
    return (
    <AuthContext.Provider value={{currentUser,updateUser}}>
    {children}
    </AuthContext.Provider>
    );
};