import { createContext, ReactNode, useEffect, useRef, useState } from "react";
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
    api: apiFunctions,
    token: string,
    isLoggedIn: boolean
    logUserOut: () => Promise<any>
}>({
    user: undefined,
    api: {
        addNewUser: function () {
            throw new Error("Function not implemented.");
        },
        logInUser: function () {
            throw new Error("Function not implemented.");
        },
        getUser: function () {
            throw new Error("Function not implemented.");
        }
    },
    token: "",
    isLoggedIn: false,
    logUserOut: function (): Promise<any> {
        throw new Error("Function not implemented.");
    }
})



const UserContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const userAPI = useRef<UserAPI>(new UserAPI("http://localhost:5081"));
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            return;
        }

        setToken(jwt);
        userAPI.current.getUser(jwt);
        
    }, [])

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
        logInUser: function (email: string, password: string): Promise<any> {
            return userAPI.current.logInUser(email, password).then((res: { jwt: string, _id: string, username: string }) => {
                setIsLoggedIn(true);
                
                setUser({
                    _id: res._id,
                    username: res.username
                });
                setToken(res.jwt);

                localStorage.setItem("jwt", res.jwt);
            });
        },
        getUser: function (): Promise<any> {
            throw new Error("Function not implemented.");
        }
    }

    const logUserOut = () => {
        setUser(undefined);
        setIsLoggedIn(false);
        setToken("");

        localStorage.removeItem("jwt");

        return Promise.resolve();
    }

    return (
        <UserContext.Provider value={{
            user: user,
            api: api,
            token: token,
            isLoggedIn: isLoggedIn,
            logUserOut: logUserOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider