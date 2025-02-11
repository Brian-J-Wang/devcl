import CollectionCard from "./CollectionCard/CollectionCard";

import add from "../../assets/add.svg";
import exit from "../../assets/exit.svg";

import "./UserCollections.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import NewCollectionModal from "./NewCollectionModal/NewCollectionModal";
import { User, UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { CLCollection } from "../Collection/interfaces";
import UserCollectionAPI from "../../utils/userCollectionAPI";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

const UserCollection: React.FC<{}> = () => {
    const [collections, setCollections] = useState<CLCollection[]>([]);
    const modalContextConsumer = useContext(ModalContext);
    const userContextConsumer = useContext(UserContext);
    const navigate = useNavigate();
    const userCollectionApi = useRef<UserCollectionAPI>(new UserCollectionAPI("http://localhost:5081", localStorage.getItem("jwt") ?? ""));
    
    const [ user, setUser] = useState<User>();

    useEffect(() => {
        userCollectionApi.current.GetUserCollections()
        .then((res) => {
            setCollections(res);
        })
    }, []);

    useEffect(() => {
        setUser(userContextConsumer.user);
    }, [userContextConsumer.user])

    const handleCardAdd = () => {
        modalContextConsumer.setModal(
            <NewCollectionModal onSubmit={function (name: string): {} {
                userCollectionApi.current.AddNewCollection(name).then((res) => {
                    console.log(res);
                    setCollections([ ...collections, res]);
                });

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

    const handleDelete = (id: string) => {
        userCollectionApi.current.deleteUserCollections(id).then(() => {
            setCollections(collections.filter((collection) => collection._id != id));
        })
    }

    return (
        <div className="user-collection">
            <BreadCrumb/>
            <div className="user-collection__dashboard">
                <div className="user-collection__profile">
                    <div className="user-collection__profile-image">
                    </div>
                    <div className="user-collection__info">
                        <p className="user-collection__profile-name">{ user?.username }</p>
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
                {collections.map((collection) => {
                    return <CollectionCard key={collection._id} collection={collection as CLCollection} handleDelete={handleDelete}/>
                })}
            </div>
        </div>
    )
}

export default UserCollection;