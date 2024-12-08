import { useEffect, useState } from "react"
import { Container } from "../../assets/shared/container/Container"
import CollectionCard from "./CollectionCard/CollectionCard"
import "./UserCollections.css"
import { generateMongoID } from "../../utils/dummyGenerators"

export type UserCollection = {
    id: string
    name: string,
    currentVersion: string,
    lastModified: string
}

export const UserCollection: React.FC = () => {
    const [userCollections, setUserCollections] = useState<UserCollection[]>([
        {
            id: generateMongoID(),
            name: "Pumpkin Carver",
            currentVersion: "0.21.1",
            lastModified: "12/6/24"
        },
        {
            id: generateMongoID(),
            name: "Chicken Eater",
            currentVersion: "1.1.1",
            lastModified: "1/27/24"
        },
        {
            id: generateMongoID(),
            name: "Dog Walker",
            currentVersion: "2.1.45",
            lastModified: "11/6/24"
        },
    ])

    useEffect(() => {
        //get the collections from the database.
    }, [])

    const deleteCollection = (id: string) => {
        //make call to db, remove collection
            //collection can only be removed by the owner
        setUserCollections(userCollections.filter((collection) => collection.id != id));
    }

    return(
        <div className="uc">
            <Container className="uc__header">
                <h1 className="uc__header-title">Your Projects</h1>
            </Container>
            <div className="uc__bar">
                <p className="uc__bar-items">Name</p>
                <p className="uc__bar-items">Current Version</p>
                <p className="uc__bar-items">Last Modified</p>
            </div>
            <div className="uc__cc-container">
                {
                    userCollections.map((collection) => {
                        return <CollectionCard collection={collection} handleDelete={deleteCollection}/>
                    })
                }
            </div>
        </div>
    )
}