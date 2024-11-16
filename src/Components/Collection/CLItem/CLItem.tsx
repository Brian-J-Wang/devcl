import "./CLItem.css"
import { useContext} from "react"
import { CLItem, CLItemPatch, id } from "../DBCollection"
import PopupContext from "../../Popup/PopupContext"
import { CLItemPopup  } from "./CLItem-Popup"
import { DBContext } from "../CollectionContext/collectionContext"


type itemProps = {
    clItem: CLItem
    category: string
}

const CLItemElement: React.FC<itemProps> = ({ clItem, category }) => {
    const database = useContext(DBContext);
    const popupContext = useContext(PopupContext);


    //in the end, I'll have to update the collection at the top to keep a consistent state
    
    const updateCheckbox = (evt: any) => {
        if (evt.target.id != clItem._id) {
            return;
        }

        const itemId: id = {
            item: clItem._id,
            category: category
        };

        console.log(clItem);

        const update: CLItemPatch = {
            checked: !clItem.checked
        };

        database.shared.patchItem(itemId, update)
        .then((newItem) => {
            console.log(newItem);
        })
    }

    const openPopup = (evt: any) => {
        if (evt.target.id != clItem._id) {
            popupContext.openPopup(<CLItemPopup item={clItem}></CLItemPopup>);
        }
    }

    return (
        <div className="clitem" onClick={openPopup}>
            <input className="clitem__checkbox" type="checkbox" id={clItem._id} checked={clItem.checked} onClick={updateCheckbox} readOnly/>
            <label className="clitem__label" htmlFor={clItem._id}>{(clItem.checked) ? (<s>{clItem.blurb}</s>) : (<>{clItem.blurb}</>)}</label>
        </div>
    )
}

export default CLItemElement;
