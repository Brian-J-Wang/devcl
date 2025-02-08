import { createContext, useEffect, useRef } from "react";
import UserCollectionAPI from "./userCollectionAPI";
import { Outlet } from "react-router-dom";

interface UserCollectionContextProps {
    api: UserCollectionAPI
}

export const UserCollectionContext = createContext<UserCollectionContextProps>({
    api: new UserCollectionAPI()
});

const UserCollectionContextProvider: React.FC<any> = () => {
    const collectionAPI = useRef<UserCollectionAPI>(new UserCollectionAPI("http://localhost:5081"));

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            collectionAPI.current.token = token;
        }

        console.log(collectionAPI.current);
    }, [])

    return (
        <UserCollectionContext.Provider value={{
            api: collectionAPI.current
        }}>
            <Outlet/>
        </UserCollectionContext.Provider>
    )
}

export default UserCollectionContextProvider;