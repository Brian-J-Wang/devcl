import { Container } from '@components/Container/Container';
import TaskAttributeAPIContext from '@context/taskAttributeAPIContext';
import { PropsWithChildren, RefObject, useContext, useEffect, useRef } from 'react';

import shared from '@styles/shared.module.css';
import styles from '../MenuViews.module.css';
import useAttributeMenu from '../../useAttributeMenuHook';
import { Attribute } from '@app-types/attributes';

type SelectAttributeViewProps = PropsWithChildren & {
    attributeMenu: ReturnType<typeof useAttributeMenu>;
};

const SelectAttributeView: React.FC<SelectAttributeViewProps> = ({ attributeMenu }) => {
    const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    const { attributes, isLoading } = useContext(TaskAttributeAPIContext);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        });
    }, []);

    const handleClick = (attribute: Attribute) => () => {
        attributeMenu.setActiveAttribute(attribute);
    };

    return (
        <>
            <Container.Header>
                <input
                    type="text"
                    placeholder="Filter attributes"
                    id="attributeFilter"
                    ref={inputRef}
                    className={styles.filterInput}
                />
            </Container.Header>
            <Container.Body>
                {attributes.map((attribute) => {
                    return (
                        <div className={shared.listItem} onClick={handleClick(attribute)}>
                            {attribute.name}
                        </div>
                    );
                })}
            </Container.Body>
        </>
    );
};

export default SelectAttributeView;
