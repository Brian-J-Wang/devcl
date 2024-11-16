import { createContext, useContext } from "react"
import DBCollection from "./DBCollection";

const CollectionContext = createContext<DBCollection | null>(null);

export function UseCollectionContext() {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("collection context does not exist");
    } else {
        return context;
    }
}

export default CollectionContext;