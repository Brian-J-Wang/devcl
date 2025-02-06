import CollectionCard from "./CollectionCard/CollectionCard";

import add from "../../assets/add.svg"
import "./UserCollections.css"
import { useContext, useState } from "react";
import { ModalContext } from "../../Contexts/Modal/ModalContext";

const UserCollection: React.FC<{}> = () => {
    const [collections, setCollections] = useState<{}[]>([ {}, {}, {}]);
    const modalContextConsumer = useContext(ModalContext);

    const handleCardAdd = () => {
        modalContextConsumer.setModal(
            <div>
                test
            </div>
        )
    }

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

            <div className="user-collection__header">
                <h2 className="user-collection__header-title">Collections</h2>
                <button className="user-collection__add-collection" onClick={handleCardAdd}>
                    <img src={add} alt="+" className="user-collection__add-image" />
                </button>
            </div>
            
            <div className="user-collection__collection-list">
                {
                    collections.map((collection) => <CollectionCard/>)
                }
            </div>
        </div>
    )
}

export default UserCollection;