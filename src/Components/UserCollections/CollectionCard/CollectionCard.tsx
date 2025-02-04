import { Container } from "../../Container/Container"
import { UserCollection } from "../UserCollections"

import "./CollectionCard.css"

type CollectionCardProps = {
    collection: UserCollection
    handleDelete: (id: string) => void
}

const CollectionCard: React.FC<CollectionCardProps> = ({collection, handleDelete}) => {
    return (
        <Container className="cc">
            <div className="cc__content-left">
                <p className="cc__collection-details cc__collection-title">{collection.name}</p>
                <p className="cc__collection-details">{collection.currentVersion}</p>
                <p className="cc__collection-details">{collection.lastModified}</p>
            </div>
            <div className="cc__content-right">
                <button type="button" onClick={() => {handleDelete(collection.id)}}>Delete</button>
            </div>
            
        </Container>
    )
}

export default CollectionCard;