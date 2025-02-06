import CollectionCard from "./CollectionCard/CollectionCard";

import add from "../../assets/add.svg"
import "./UserCollections.css"
import { useContext, useState } from "react";
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import NewCollectionModal from "./NewCollectionModal/NewCollectionModal";
import { DBContext } from "../../Components/Collection/CollectionContext/collectionContext";
import { UserContext } from "../../Contexts/UserContext";

const UserCollection: React.FC<{}> = () => {
    const [collections, setCollections] = useState<{}[]>([ {}, {}, {}]);
    const modalContextConsumer = useContext(ModalContext);
    const collectionContextConsumer = useContext(DBContext);
    const userContextConsumer = useContext(UserContext);

    const handleCardAdd = () => {
        modalContextConsumer.setModal(
            <NewCollectionModal onSubmit={function (): {} {
                //make an api call to the backend requesting a new collection,
                //expect to get collection id and other data.
                //if fail, return a failed promise, that way I can send a message afterwards.
                console.log(userContextConsumer.user);
                console.log(userContextConsumer.token);

                //should see this fail since there was no token associated with it
                collectionContextConsumer.shared.createNewCollection({
                    user: "test",
                    name: "test"
                });

                setCollections([ ...collections, {}]);

                modalContextConsumer.setModal(undefined);
                return 0;
            } }/>
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