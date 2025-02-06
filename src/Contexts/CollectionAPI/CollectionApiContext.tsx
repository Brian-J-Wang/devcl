import { createContext, useEffect, useRef } from "react";
import CollectionAPI from "../../utils/collectionAPI";
import { Outlet } from "react-router-dom";

interface CollectionContextProps {
    api: CollectionAPI
}

export const CollectionContext = createContext<CollectionContextProps>({
    api: new CollectionAPI()
});

const CollectionContextProvider: React.FC<any> = () => {
    const collectionAPI = useRef<CollectionAPI>(new CollectionAPI("http://localhost:5081"));

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            collectionAPI.current.token = token;
        }
    }, [])

    return (
        <CollectionContext.Provider value={{
            api: collectionAPI.current
        }}>
            <Outlet/>
        </CollectionContext.Provider>
    )
}

export default CollectionContextProvider;