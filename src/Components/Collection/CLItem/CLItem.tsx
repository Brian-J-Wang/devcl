import "./CLItem.css"
import { useContext} from "react"
import { CLItem, CLItemPatch, id } from "../DBCollection"
import { popupContext } from "../../Contexts/Popup"
import { CLItemPopup  } from "./CLItem-Popup"
import { DBContext } from "../CollectionContext/collectionContext"


type itemProps = {
    clItem: CLItem
    category: string
}

const CLItemElement: React.FC<itemProps> = ({ clItem, category }) => {
    const database = useContext(DBContext);
    const popup = useContext(popupContext);


    //in the end, I'll have to update the collection at the top to keep a consistent state
    
    const updateCheckbox = (evt: any) => {
        if (evt.target.id != clItem._id) {
            return;
        }

        const update: CLItemPatch = {
            checked: !clItem.checked
        };

        database.shared.patchItem(clItem._id, update)
        .then((newItem) => {
            console.log(newItem);
        })
    }

    const deleteItem = (evt: any) => {
        database.shared.deleteItem(clItem);
    }

    const openPopup = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).closest(".clitem__right-container") == null) { //ensures that the area clicked does not include action buttons on the right
            popup.openPopup(<CLItemPopup item={clItem}></CLItemPopup>);
        }
    }

    return (
        <div className="clitem" onClick={openPopup}>
            <div className="clitem__left-container">
                <input className="clitem__checkbox" type="checkbox" id={clItem._id} checked={clItem.checked} onClick={updateCheckbox} readOnly/>
                <p className="clitem__label">{(clItem.checked) ? (<s>{clItem.blurb}</s>) : (<>{clItem.blurb}</>)}</p>
            </div>
            <div className="clitem__right-container" >
                <button onClick={deleteItem}>Delete</button>
            </div>
        </div>
    )
}

export default CLItemElement;
