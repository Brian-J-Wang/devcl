import { Container } from '@components/Container/Container';
import useAttributeMenu from '../useAttributeMenuHook';
import SelectAttributeView from '../MenuViews/SelectAttributeView/SelectAttributeView';
import SelectAttributeValueView from '../MenuViews/SelectAttributeValueView/SelectAttributeValueView';

import styles from './AttributeMenu.module.css';

type AttributeMenuProps = {
    attributeMenu: ReturnType<typeof useAttributeMenu>;
};

const AttributeMenu: React.FC<AttributeMenuProps> = ({ attributeMenu }) => {
    if (attributeMenu.menuVisible) {
        return (
            <Container className={styles.container}>
                {attributeMenu.activeAttribute != null ? (
                    <SelectAttributeValueView />
                ) : (
                    <SelectAttributeView attributeMenu={attributeMenu} />
                )}
            </Container>
        );
    } else {
        return <></>;
    }
};

export default AttributeMenu;
