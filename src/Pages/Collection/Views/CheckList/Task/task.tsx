import { ReactNode, useState } from 'react';
import { CheckBoxState } from '../../../../../Components/Icon/Checkbox/Checkbox';
import Icon from '../../../../../Components/Icon';
import { Task } from '@app-types/task';

import styles from './Task.module.css';
import AttributeTag from '../shared/AttributeTag';

type itemProps = {
    task: Task;
    onClick?: (task: Task) => void;
    onCheckboxClick?: () => void;
    onDeleteClick?: () => void;
};

const TaskItem: React.FC<itemProps> = (props) => {
    return (
        <tr className={styles.root}>
            <td className={styles.checkboxCell}>
                <Icon.CheckBox
                    state={props.task.status == 'complete' ? CheckBoxState.checked : CheckBoxState.unchecked}
                    onClick={props.onCheckboxClick}
                    data-clickignore
                    className={styles.checkbox}
                />
            </td>
            <td>
                <div className={styles.blurbCell}>
                    <p className={`${styles.label} ${props.task.status == 'complete' && styles.labelStrike}`}>
                        {props.task.blurb}
                    </p>
                    {props.task.attributes.length != 0 && (
                        <div className={styles.attributeBar}>
                            {props.task.attributes.map((attribute) => (
                                <AttributeTag
                                    key={attribute.id}
                                    id={attribute.id}
                                    value={attribute.value as string}
                                ></AttributeTag>
                            ))}
                        </div>
                    )}
                </div>
            </td>
            <td>
                <Icon.TrashCan onClick={props.onDeleteClick} className={styles.trashCan} data-clickIgnore />
            </td>
        </tr>
    );
};

export const CLItemTag: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    return <div className="clitem__tag">{children}</div>;
};

export const FakeCLItemElement: React.FC<{
    blurb: string;
    checked: boolean;
}> = (props) => {
    const [checked, setChecked] = useState<boolean>(props.checked);
    return (
        <div className="clitem">
            <div className="clitem__left-container">
                <input
                    className="clitem__checkbox"
                    type="checkbox"
                    checked={checked}
                    onClick={() => {
                        setChecked(!checked);
                    }}
                    readOnly
                    data-editorIgnore
                />
                <p className="clitem__label">{props.blurb}</p>
            </div>
        </div>
    );
};

export default TaskItem;
