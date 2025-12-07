import { RefObject, useContext, useMemo, useRef, useState } from 'react';
import { Container } from '@components/Container/Container';
import TaskAttributeAPIContext from '@context/taskAttributeAPIContext';
import { Attribute } from '@app-types/attributes';
import AttributeBuilder from './AttributeBuilder';
import useAttributeHook from './useAttributeHook';

import styles from './AddItemInput.module.css';
import menuStyles from './attributeMenu.module.css';
import { PostTask } from '@app-types/task';
import AttributeTag from '../shared/AttributeTag';

type AddItemInputProps = {
    onSubmit: (task: PostTask) => void;
};

const AddItemInput: React.FC<AddItemInputProps> = ({ onSubmit }) => {
    const [blurb, setBlurb] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const attributeFilter = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    const [filter, setFilter] = useState<string>('');
    const { attributes, isLoading } = useContext(TaskAttributeAPIContext);
    const visibleAttributes = useMemo(() => {
        if (filter.length == 0) {
            console.log();
            return attributes;
        } else {
            return attributes.filter((attribute) => {
                return attribute.name.substring(0, filter.length).toLowerCase() == filter;
            });
        }
    }, [filter, isLoading]);
    const [activeAttribute, setActiveAttribute] = useState<Attribute | null>(null);
    const attributeHook = useAttributeHook();

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
            setMenuOpened(false);
            setActiveAttribute(null);
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
        setMenuOpened(true);
        attributeFilter.current?.focus();
    };

    const onAttributeValueAdd = (attribute: Attribute) => (value: unknown) => {
        attributeHook.setTaskAttribute(attribute.id, value);
        setActiveAttribute(null);
        setMenuOpened(false);
    };

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == 'Enter') {
            console.log(blurb);
            onSubmit({
                blurb: blurb,
                attributes: attributeHook.taskAttributes,
            });
            setBlurb('');
            setActiveAttribute(null);
            attributeHook.clearTaskAttributes();
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
                    onKeyDown={handleKeyDown}
                />
                <div className={styles.attributeBar}>
                    {attributeHook.taskAttributes.map((taskAttribute) => (
                        <AttributeTag
                            key={taskAttribute.id}
                            id={taskAttribute.id}
                            value={taskAttribute.value as string}
                        ></AttributeTag>
                    ))}
                    {focused && (
                        <button className={styles.addAttributesButton} onClick={onAddAttributeClick}>
                            + Add Attributes
                        </button>
                    )}
                </div>

                {focused && (
                    <Container className={`${styles.attributeMenu} ${!menuOpened && styles.attributeMenuHidden}`}>
                        {activeAttribute != null ? (
                            AttributeBuilder(activeAttribute, onAttributeValueAdd(activeAttribute))
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Filter attributes"
                                    id="attributeFilter"
                                    ref={attributeFilter}
                                    value={filter}
                                    onChange={(evt) => {
                                        setFilter(evt.target.value);
                                    }}
                                    className={styles.attributeFilterInput}
                                />
                                {visibleAttributes.map((attribute) => {
                                    return (
                                        <div
                                            className={menuStyles.listItem}
                                            onClick={() => setActiveAttribute(attribute)}
                                        >
                                            <p>{attribute.name}</p>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </Container>
                )}
            </td>
        </tr>
    );
};

export default AddItemInput;
