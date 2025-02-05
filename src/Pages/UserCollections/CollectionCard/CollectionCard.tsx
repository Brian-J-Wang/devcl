import "./CollectionCard.css"

const CollectionCard: React.FC = () => {
    return (
        <div className="collection-card">
            <div className="collection-card__header">
                <p className="collection-card__title">
                    Collection Name
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