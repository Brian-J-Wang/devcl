import { createContext, ReactNode, useRef, useState } from "react";
import UserAPI from "../utils/userAPI";

interface User {
    _id: string,
    username: string,
}

interface apiFunctions {
    addNewUser(email: string, username: string, password: string): Promise<any>,
    logInUser(username: string, password: string): Promise<any>,
    getUser(jwt: string): Promise<any>
}

export const UserContext = createContext<{
    user?: any
    api: apiFunctions
}>({
    user: undefined,
    api: {
        addNewUser: function (email: string, username: string, password: string) {
            throw new Error("Function not implemented.");
        },
        logInUser: function (username: string, password: string) {
            throw new Error("Function not implemented.");
        },
        getUser: function (jwt: string) {
            throw new Error("Function not implemented.");
        }
    }
})



const UserContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const userAPI = useRef<UserAPI>(new UserAPI("http://localhost:5081"));
    const [user, setUser] = useState<User | undefined>(undefined);

    const api: apiFunctions = {
        addNewUser: function (email: string, username: string, password: string): Promise<any> {
            return userAPI.current.addNewUser({
                email: email,
                username: username,
                password: password
            }).then((res: User) => {
                setUser(res);
                return Promise.resolve();
            })
        },
        logInUser: function (username: string, password: string): Promise<any> {
            throw new Error("Function not implemented.");
        },
        getUser: function (jwt: string): Promise<any> {
            throw new Error("Function not implemented.");
        }
    }

    return (
        <UserContext.Provider value={{
            user: user,
            api: api
        }}>
            {props.children}
        </UserContext.Provider>
    )
}