import styles from './AddItemInput.module.css';

import { useEffect, useState } from 'react';
import { PostTask } from '@app-types/task';
import { AttributeTag } from '@features/Attributes';
import AttributeMenu from './AttributeMenu/attributeMenu.component';
import useAttributeMenu from './AttributeMenu/attributeMenu.hook';
import AttributeMenuContext from './AttributeMenu/attributeMenu.context';
import useListController from '@components/List/List.controller';

type AddItemInputProps = {
    /** submits the new task and expects a boolean for whether or not to close the menu */
    onSubmit: (task: PostTask) => Promise<boolean>;
};

const AddItemInput: React.FC<AddItemInputProps> = ({ onSubmit }) => {
    const [blurb, setBlurb] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const attributeMenu = useAttributeMenu();
    const listController = useListController();

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
            attributeMenu.setMenuState('closed');
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

    const inputRouter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (attributeMenu.menuState) {
            case 'closed':
                handleStandardInput(evt);
                break;
            case 'selectAttribute':
            case 'selectAttributeValue':
            case 'typeAttribute':
                handleTypeAttributeInput(evt);
                break;
            case 'typeAttributeValue':
        }
    };

    const handleStandardInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (evt.key) {
            case 'Enter':
                onSubmit({
                    blurb: blurb,
                    attributes: attributeMenu.taskAttributes,
                });
                setBlurb('');
                attributeMenu.taskAttributes.clear();
                attributeMenu.setActiveAttribute(null);
                break;
            case '/':
                setBlurb('');
                attributeMenu.setMenuState('typeAttribute');
                break;
        }
    };

    const handleTypeAttributeInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (evt.key) {
            case 'ArrowUp':
                evt.preventDefault();
                listController.events.shiftUpEvent.publish();
                break;
            case 'ArrowDown':
                evt.preventDefault();
                listController.events.shiftDownEvent.publish();
                break;
            case 'Enter':
                //get the current attribute from the list controller and set menuState to
                // 'typeAttributeValue'
                break;
            case 'Backspace':
                if (evt.currentTarget.value.length == 1) {
                    attributeMenu.setMenuState('closed');
                }
                break;
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
                    onKeyDown={inputRouter}
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
                        onClick={() => {
                            attributeMenu.setMenuState('selectAttribute');
                        }}
                    >
                        + Add Attributes
                    </button>
                </div>
                <AttributeMenuContext.Provider value={attributeMenu}>
                    <AttributeMenu listController={listController} />
                </AttributeMenuContext.Provider>
            </td>
        </tr>
    );
};

export default AddItemInput;
