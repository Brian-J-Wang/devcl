import "./CLItem.css"
import { useContext, useState} from "react"
import { CLItem, CLItemPatch } from "../../../Pages/Collection/interfaces"
import ItemEditorContext from "../../../Pages/Collection/ItemEditor/itemEditorContext"

type itemProps = {
    clItem: CLItem,
    updateItem: (itemId: string, update: CLItemPatch) => Promise<any>
    deleteItem: (itemId: string) => Promise<any>
}

const CLItemElement: React.FC<itemProps> = ({ clItem, updateItem, deleteItem}) => {
    const itemEditorContext = useContext(ItemEditorContext);

    //in the end, I'll have to update the collection at the top to keep a consistent state
    
    const updateCheckbox = (evt: any) => {
        if (evt.target.id != clItem._id) {
            return;
        }

        updateItem(clItem._id, {
            checked: !clItem.checked
        });
    }

    const openPopup = (evt: React.MouseEvent) => {
        //does not open popup if element that was clicked on includes data-editorIgnore
        if ((evt.target as HTMLElement).hasAttribute('data-editorIgnore')) {
            return;
        }

        itemEditorContext.setActiveItem(clItem);
    }

    return (
        <div className="clitem" onClick={openPopup}>
            <div className="clitem__left-container">
                <input className="clitem__checkbox" type="checkbox" id={clItem._id} checked={clItem.checked} onClick={updateCheckbox} readOnly data-editorIgnore />
                <p className="clitem__label">{(clItem.checked) ? (<s>{clItem.blurb}</s>) : (<>{clItem.blurb}</>)}</p>
            </div>
            <div className="clitem__right-container"  >
                <button onClick={() => { deleteItem( clItem._id )}} data-editorIgnore>Delete</button>
            </div>
        </div>
    )
}

export const FakeCLItemElement: React.FC<{blurb: string, checked: boolean}> = (props) => {
    const [checked, setChecked] = useState<boolean>(props.checked)
    return(
        <div className="clitem">
            <div className="clitem__left-container">
                <input className="clitem__checkbox" type="checkbox" checked={checked} onClick={() => { setChecked(!checked)}} readOnly data-editorIgnore />
                <p className="clitem__label">{props.blurb}</p>
            </div>
        </div>
    )
}

export default CLItemElement;
