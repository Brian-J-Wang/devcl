import "./CLItem.css"
import { useContext} from "react"
import { CLItem, CLItemPatch } from "../DBCollection"
import { DBContext } from "../CollectionContext/collectionContext"
import ItemEditorContext from "../ItemEditor/itemEditorContext"

type itemProps = {
    clItem: CLItem
}

const CLItemElement: React.FC<itemProps> = ({ clItem }) => {
    const database = useContext(DBContext);
    const itemEditorContext = useContext(ItemEditorContext);

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

    const deleteItem = () => {
        database.shared.deleteItem(clItem);
    }

    const openPopup = () => {
        itemEditorContext.setActiveItem(clItem);
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
