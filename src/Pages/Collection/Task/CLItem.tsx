import "./CLItem.css"
import { ReactNode, useContext, useState} from "react"
import { CheckBoxState } from "../../../Components/Icon/Checkbox/Checkbox"
import Icon from "../../../Components/Icon"
import { ItemApiContext } from "../Collection"
import { Task } from "../../../utils/collectionAPI"
import AttributeTag from "../CheckList/AddItemInput/AttributeTag"

import style from "./CLItem.module.css";

type itemProps = {
    task: Task,
    onClick: () => void,
}

const CLItemElement: React.FC<itemProps> = (props) => {
    const itemApi = useContext(ItemApiContext);
    const checked = props.task.status == "complete"

    const handleCheckboxClick = () => {
        itemApi.updateItem({
            _id: props.task._id,
            status: checked ? "incomplete" : "complete"
        });
    }

    const onClick = (evt: React.MouseEvent) => {
        //does not open popup if element that was clicked on includes data-editorIgnore
        if ((evt.target as HTMLElement).hasAttribute('data-editorIgnore')) {
            return;
        }
        props.onClick();
    }

    return (
        <div className="clitem" onClick={onClick}>
            <div className="clitem__top">
                <div className="clitem__left-container">
                    <Icon.CheckBox state={checked ? CheckBoxState.checked : CheckBoxState.unchecked} onClick={handleCheckboxClick} data-editorIgnore className="clitem__checkbox"/>
                    <p className={`clitem__label ${checked && "clitem__strike"}`}>
                        {props.task.blurb}
                    </p>
                </div>
                <div className="clitem__right-container">
                    <Icon.TrashCan onClick={() => { itemApi.deleteItem({ _id: props.task._id })}} data-editorIgnore/>
                </div>
            </div>
            {
                props.task.attributes.length != 0 && (        
                    <div className={style.bottom}>
                        {
                            props.task.attributes.map((attribute) => (
                                <AttributeTag attribute={attribute} className={style.attributeTag}/>
                            ))
                        }
                    </div>
                )
            }
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
