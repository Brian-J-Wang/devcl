import { useState } from "react";
import { CLCollection } from "../../Collection/interfaces";
import "./CollectionCard.css"
import "./ContentPanel.css"
import arrow from "../../../assets/Arrow.svg";
import popout from "../../../assets/pop-out.svg";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../Components/Container/Container";
import Input from "../../../Components/Input";

interface CollectionCardTypes {
    collection: CLCollection
    handleDelete: (id: string) => void
}

const CollectionCard: React.FC<CollectionCardTypes> = ({ collection, handleDelete }) => {
    const [ hidden, setHidden ] = useState<boolean>(true);
    const [ activeTab, setActiveTab ] = useState<"Info" | "People" | "Settings">("Info");
    const navigate = useNavigate();

    const goToCollectionsPage = () => {
        navigate(`./${collection._id}`);
    }

    const deleteCollection = (id: string) => {
        return () => {
            handleDelete(id);
        }
    }

    return (
        <div className={`collection-card ${hidden ? "" : "collection-card_extended"}`}>
            <Container className="collection-card__header">
                <div className="collection-card__left">
                    <button className={`collection-card__left-drop ${!hidden && 'collection-card__left-drop_active'}`} onClick={() => { setHidden(!hidden) }}>
                        <img src={arrow} alt="" />
                    </button>
                    <p className="collection-card__title">
                        {collection.name}
                    </p>
                    <button className="collection-card__left-popout" onClick={goToCollectionsPage}>
                        <img src={popout} alt="Popout" />
                    </button>
                </div>
                
                <div className="collection-card__progress-container">
                    <p className="collection-card__progress-counter"> 8/10 </p>
                    <div className="collection-card__progress-bar"></div>
                </div>
            </Container>
            <div className="content-panel">
                <div className="content-panel__tab-bar">
                    <div className={`content-panel__tab ${activeTab == 'Info' && "content-panel__tab_active"}`}
                        onClick={() => setActiveTab("Info")}
                    >
                        Info
                    </div>
                    <div className={`content-panel__tab ${activeTab == 'People' && "content-panel__tab_active"}`}
                        onClick={() => setActiveTab("People")}
                    >
                        People
                    </div>
                    <div className={`content-panel__tab ${activeTab == 'Settings' && "content-panel__tab_active"}`}
                        onClick={() => setActiveTab("Settings")}
                    >
                        Settings
                    </div>
                </div>
                <div hidden={activeTab != "People"} className="content-panel__people-tab">

                </div>
                <div hidden={activeTab != "Settings"} className="content-panel__setting-tab">
                    <div className="content-panel__setting">
                        <div>
                            <h3>Public Commenting</h3>
                            <small>Allow anonymous users to comment on current tasks</small>
                        </div>
                    </div>
                    <div className="content-panel__setting">
                        <div>
                            <h3>Visibility</h3>
                            <small>Change who can see this collection</small>
                        </div>
                    </div>
                    <hr />
                    <div className="content-panel__setting">
                        <div>
                            <h3> Delete Collection</h3>
                            <small>Removes this collection and all relevant data. This action CANNOT be undone.</small>
                        </div>
                        <Input.Button style="negative" onClick={deleteCollection(collection._id)}>Delete</Input.Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard;