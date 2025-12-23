import styles from './AddItemInput.module.css';

import { useEffect, useState } from 'react';
import { PostTask } from '@app-types/task';
import { AttributeTag } from '@features/Attributes';
import AttributeMenu from './AttributeMenu/AttributeMenu';
import useAttributeMenu from './AttributeMenu/useAttributeMenuHook';
import AttributeMenuContext from './AttributeMenu/AttributeMenuContext';

type AddItemInputProps = {
    /** submits the new task and expects a boolean for whether or not to close the menu */
    onSubmit: (task: PostTask) => Promise<boolean>;
};

const AddItemInput: React.FC<AddItemInputProps> = ({ onSubmit }) => {
    const [blurb, setBlurb] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const attributeMenu = useAttributeMenu();

    useEffect(() => {
        function handleAttributeAdd() {
            attributeMenu.setActiveAttribute(null);
        }
        attributeMenu.onTaskAttributeSelect.subscribe(handleAttributeAdd);

        return () => {
            attributeMenu.onTaskAttributeSelect.unsubscribe(handleAttributeAdd);
        };
    }, [attributeMenu]);

    const handleFocus = (evt: React.FocusEvent<HTMLTableRowElement, Element>) => {
        const element = evt.target.querySelector('#blurbInput') as HTMLInputElement;
        if (element) {
            element.focus();
            setFocused(true);
            document.addEventListener('mousedown', onMouseClick);
        }
    };

    const onMouseClick = (evt: MouseEvent) => {
        if ((evt.target as HTMLElement).closest('#addItemRow') == null) {
            setFocused(false);
            attributeMenu.setMenuVisible(false);
            attributeMenu.setActiveAttribute(null);
            document.removeEventListener('mousedown', onMouseClick);
        } else {
            setFocused(true);
        }
    };

    const handleOnClick = (evt: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (focused) {
            return;
        }

        const element = (evt.currentTarget as HTMLElement).querySelector('#blurbInput') as HTMLInputElement;
        if (element) {
            element.focus();
            setFocused(true);
            document.addEventListener('mousedown', onMouseClick);
        }
    };

    const onAddAttributeClick = () => {
        attributeMenu.setMenuVisible(true);
    };

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == 'Enter') {
            onSubmit({
                blurb: blurb,
                attributes: attributeMenu.taskAttributes,
            });
            setBlurb('');
            attributeMenu.taskAttributes.clear();
            attributeMenu.setActiveAttribute(null);
        }
    };

    return (
        <tr
            tabIndex={1}
            onFocus={handleFocus}
            id="addItemRow"
            onClick={handleOnClick}
            className={`${styles.row} ${focused && styles.rowFocused}`}
        >
            <td></td>
            <td className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Click here or press tab to add task"
                    id="blurbInput"
                    value={blurb}
                    onChange={(evt) => {
                        setBlurb(evt.target.value);
                    }}
                    className={styles.blurbInput}
                    autoComplete={'off'}
                    onKeyDown={handleKeyDown}
                />
                <div className={styles.attributeBar}>
                    {attributeMenu.taskAttributes.map((taskAttribute) => (
                        <AttributeTag
                            key={taskAttribute.id}
                            id={taskAttribute.id}
                            value={taskAttribute.value as string}
                        ></AttributeTag>
                    ))}
                    <button
                        className={`${styles.addAttributesButton} ${!focused && styles.hiddenAttributesButton}`}
                        onClick={onAddAttributeClick}
                    >
                        + Add Attributes
                    </button>
                </div>
                <AttributeMenuContext.Provider value={attributeMenu}>
                    <AttributeMenu />
                </AttributeMenuContext.Provider>
            </td>
        </tr>
    );
};

export default AddItemInput;
