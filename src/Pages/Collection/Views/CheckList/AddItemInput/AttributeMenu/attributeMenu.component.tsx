import styles from './attributeMenu.module.css';
import { Container } from '@components/Container/Container';
import { requireContext } from '@utils/helpers';
import AttributeMenuContext from './attributeMenu.context';
import { useLayoutEffect, useState } from 'react';
import menuViews from './MenuViews/menuViews.factory';
import BoundingBox from '@shared/boundingBox';
import useListController from '@components/List/List.controller';

type AttributeMenuProps = {
    listController: ReturnType<typeof useListController>;
};

const AttributeMenu: React.FC<AttributeMenuProps> = ({ listController }) => {
    const attributeMenu = requireContext(AttributeMenuContext);
    const [position, setPosition] = useState<'above' | 'below'>('below');

    useLayoutEffect(() => {
        const menu = document.querySelector('#menu');
        const viewport = document.querySelector<HTMLDivElement>('#checklistViewport');

        if (!menu || !viewport) {
            return;
        }

        const { bottom: menuBottom } = menu.getBoundingClientRect();
        const { bottom: viewportBottom } = viewport.getBoundingClientRect();

        if (menuBottom > viewportBottom) {
            setPosition('above');
        }
    }, [attributeMenu.menuState, setPosition]);

    let View = menuViews[attributeMenu.menuState];

    return (
        <BoundingBox disabled={attributeMenu.menuState == 'closed'}>
            <Container
                className={`${styles.container} ${attributeMenu.menuState == 'closed' && styles.containerHidden} ${
                    position == 'below' ? styles.containerPositionBottom : styles.containerPositionAbove
                }`}
                id="menu"
            >
                <View controller={listController} />
            </Container>
        </BoundingBox>
    );
};

export default AttributeMenu;
