import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    //Now where using the UseState

    const [rest, setRest] = useState([]);

    return(
        <UserContext.Provider value = {{rest, setRest }}>
            {children}
        </UserContext.Provider>
    )
}