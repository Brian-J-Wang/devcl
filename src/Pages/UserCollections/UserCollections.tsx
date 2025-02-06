import CollectionCard from "./CollectionCard/CollectionCard";

import add from "../../assets/add.svg";
import exit from "../../assets/exit.svg";

import "./UserCollections.css";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import NewCollectionModal from "./NewCollectionModal/NewCollectionModal";
import { UserContext } from "../../Contexts/UserContext";
import { CollectionContext } from "../../Contexts/CollectionAPI/CollectionApiContext";
import { useNavigate } from "react-router-dom";
import { NavBarContext } from "../../Components/NavBar/Navbar";

const UserCollection: React.FC<{}> = () => {
    const [collections, setCollections] = useState<{}[]>([ {}, {}, {}]);
    const modalContextConsumer = useContext(ModalContext);
    const collectionContextConsumer = useContext(CollectionContext);
    const userContextConsumer = useContext(UserContext);
    const navBarContextConsumer = useContext(NavBarContext);
    const navigate = useNavigate();

    useEffect(() => {
        navBarContextConsumer.setVisible(false);

        return () => {
            navBarContextConsumer.setVisible(true);
        }
    }, [])

    const handleCardAdd = () => {
        modalContextConsumer.setModal(
            <NewCollectionModal onSubmit={function (): {} {
                //make an api call to the backend requesting a new collection,
                //expect to get collection id and other data.
                //if fail, return a failed promise, that way I can send a message afterwards.
                console.log(userContextConsumer.user);
                console.log(userContextConsumer.token);

                //should see this fail since there was no token associated with it
                collectionContextConsumer.api.AddNewCollection("Test");

                setCollections([ ...collections, {}]);

                modalContextConsumer.setModal(undefined);
                return 0;
            } }/>
        )
    }

    const handleUserLogOut = () => {
        userContextConsumer.logUserOut().then(() => {
            navigate("../");
        })
    }

    return (
        <div className="user-collection">
            <div className="user-collection__dashboard">
                <div className="user-collection__profile">
                    <div className="user-collection__profile-image">
                    </div>
                    <div className="user-collection__info">
                        <p className="user-collection__profile-name">Brian Wang</p>
                        <p className="user-collection__profile-info">2 collections</p>
                    </div>
                    <button className="user-collection__logout" onClick={handleUserLogOut}>
                        <img src={exit} alt="X" className="user-collection__logout-image"/>
                    </button>
                </div>
                <div className="user-collection__side-info">

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
                    collections.map(() => <CollectionCard/>)
                }
            </div>
        </div>
    )
}

export default UserCollection;