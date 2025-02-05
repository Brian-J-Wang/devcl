import CollectionCard from "./CollectionCard/CollectionCard";
import "./UserCollections.css"

const UserCollection: React.FC<{}> = () => {
    return (
        <div className="user-collection">
            <div className="user-collection__profile">
                <div className="user-collection__profile-image">
                </div>
                <div className="user-collection__info">
                    <p className="user-collection__profile-name">Brian Wang</p>
                    <p className="user-collection__profile-info">2 collections</p>
                </div>
            </div>

            <h2 className="user-collection__header">Collections</h2>
            <div className="user-collection__collection-list">
                <CollectionCard/>
            </div>
        </div>
    )
}

export default UserCollection;