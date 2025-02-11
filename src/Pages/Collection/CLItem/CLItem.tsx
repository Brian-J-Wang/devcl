import "./CLItem.css"
import { useContext, useState} from "react"
import { CLItem, CLItemPatch } from "../../../Pages/Collection/interfaces"
import ItemEditorContext from "../../../Pages/Collection/ItemEditor/itemEditorContext"
import CheckBox, { CheckBoxState } from "../../../Components/Checkbox/Checkbox"
import Icon from "../../../Components/Icon"

type itemProps = {
    clItem: CLItem,
    updateItem: (itemId: string, update: CLItemPatch) => Promise<any>
    deleteItem: (itemId: string) => Promise<any>
}

const CLItemElement: React.FC<itemProps> = ({ clItem, updateItem, deleteItem}) => {
    const itemEditorContext = useContext(ItemEditorContext);

    const handleCheckboxClick = () => {
        updateItem(clItem._id, {
            checked: !clItem.checked
        })
    }

    const openPopup = (evt: React.MouseEvent) => {
        //does not open popup if element that was clicked on includes data-editorIgnore
        console.log((evt.target as HTMLElement), (evt.target as HTMLElement).hasAttribute('data-editorIgnore'))
        if ((evt.target as HTMLElement).hasAttribute('data-editorIgnore')) {
            console.log("here");
            return;
        }

        itemEditorContext.setActiveItem(clItem);
    }

    return (
        <div className="clitem" onClick={openPopup}>
            <div className="clitem__left-container">
                <CheckBox state={clItem.checked ? CheckBoxState.checked : CheckBoxState.unchecked} onClick={handleCheckboxClick} data-editorIgnore className="clitem__checkbox"/>
                <p className={`clitem__label ${clItem.checked && "clitem__strike"}`}>
                    {clItem.blurb}
                </p>
            </div>
            <div className="clitem__right-container">
                <Icon.TrashCan onClick={() => { deleteItem( clItem._id )}} data-editorIgnore/>
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
