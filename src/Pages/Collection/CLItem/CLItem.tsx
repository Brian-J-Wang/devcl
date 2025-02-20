import "./CLItem.css"
import { ReactNode, useContext, useState} from "react"
import { CLItem } from "../../../Pages/Collection/interfaces"
import { CheckBoxState } from "../../../Components/Icon/Checkbox/Checkbox"
import Icon from "../../../Components/Icon"
import { ItemApiContext } from "../Collection"

type itemProps = {
    clItem: CLItem,
    onClick: () => void,
    tags?: ReactNode,
}

const CLItemElement: React.FC<itemProps> = ({ clItem, tags = (<></>), onClick }) => {
    const itemApi = useContext(ItemApiContext);

    const handleCheckboxClick = () => {
        itemApi.updateItem(clItem._id, {
            checked: !clItem.checked
        })
    }

    const openPopup = (evt: React.MouseEvent) => {
        //does not open popup if element that was clicked on includes data-editorIgnore
        if ((evt.target as HTMLElement).hasAttribute('data-editorIgnore')) {
            return;
        }
        onClick();
    }

    return (
        <div className="clitem" onClick={openPopup}>
            <div className="clitem__top">
                <div className="clitem__left-container">
                    <Icon.CheckBox state={clItem.checked ? CheckBoxState.checked : CheckBoxState.unchecked} onClick={handleCheckboxClick} data-editorIgnore className="clitem__checkbox"/>
                    <p className={`clitem__label ${clItem.checked && "clitem__strike"}`}>
                        {clItem.blurb}
                    </p>
                </div>
                <div className="clitem__right-container">
                    <Icon.TrashCan onClick={() => { itemApi.deleteItem( clItem._id )}} data-editorIgnore/>
                </div>
            </div>
            <div className="clitem__bottom">
                { tags }
            </div>
        </div>
    )
}

export const CLItemTag: React.FC<{
    children: ReactNode
}> = ({ children }) => {
    return (
        <div className="clitem__tag">
            {children}
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
