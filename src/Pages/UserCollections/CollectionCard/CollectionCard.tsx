import { useEffect } from "react";
import { CLCollection } from "../../../Components/Collection/DBCollection";
import "./CollectionCard.css"

interface CollectionCardTypes {
    collection: CLCollection
}

const CollectionCard: React.FC<CollectionCardTypes> = ({ collection }) => {

    useEffect(() => {
        
    }, [])

    return (
        <div className="collection-card">
            <div className="collection-card__header">
                <p className="collection-card__title">
                    {collection.name}
                </p>

                <div className="collection-card__progress-container">
                    <p className="collection-card__progress-counter"> 8/10 </p>
                    <div className="collection-card__progress-bar"></div>
                </div>
            </div>
            
        </div>
    )
}

export default CollectionCard;