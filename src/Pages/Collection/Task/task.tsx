import { ReactNode, useState} from "react"
import { CheckBoxState } from "../../../Components/Icon/Checkbox/Checkbox"
import Icon from "../../../Components/Icon"
import { Task } from "../../../utils/collectionAPI"
import AttributeTag from "../CheckList/AddItemInput/AttributeTag"

import styles from "./task.module.css";

type itemProps = {
    task: Task,
    onClick?: () => void,
    onCheckboxClick?: () => void
    onDeleteClick?: () => void
}

const CLItemElement: React.FC<itemProps> = (props) => {
    const onClick = (evt: React.MouseEvent) => {
        //does not open popup if element that was clicked on includes data-editorIgnore
        if ((evt.target as HTMLElement).hasAttribute('data-editorIgnore') || !props.onClick) {
            return;
        }
        props.onClick();
    }

    return (
        <div className={styles.root} onClick={onClick}>
            <Icon.CheckBox state={props.task.status == "complete" ? CheckBoxState.checked : CheckBoxState.unchecked} onClick={props.onCheckboxClick} data-editorIgnore className={styles.checkbox}/>
            <div className={styles.middle}>
                <p className={`${ styles.label } ${ props.task.status == "complete" && styles.labelStrike }`}>
                    {props.task.blurb}
                </p>
                {
                    props.task.attributes.length != 0 && (        
                        <div className={styles.bottom}>
                            {
                                props.task.attributes.map((attribute) => (
                                    <AttributeTag attribute={attribute} className={styles.attributeTag}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <Icon.TrashCan onClick={props.onDeleteClick} className={styles.trashCan} data-editorIgnore/>
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
