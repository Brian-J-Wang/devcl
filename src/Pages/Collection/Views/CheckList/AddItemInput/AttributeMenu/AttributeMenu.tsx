import { Container } from '@components/Container/Container';

import styles from './AttributeMenu.module.css';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { AttributeMenuContext } from './AttributeMenuContext';
import AttributeMenuHeader from './AttributeMenuHeader';
import AttributeMenuBody from './AttributeMenuBody';

export type AttributeMenuProps = React.FC<{}> & {
    Header: React.FC<PropsWithChildren>;
    Body: React.FC<PropsWithChildren>;
};

const AttributeMenu: AttributeMenuProps = () => {
    const [header, setHeader] = useState<ReactNode>(null);
    const [body, setBody] = useState<ReactNode>();

    return (
        <AttributeMenuContext.Provider value={{ setHeader, setBody }}>
            <Container className={styles.container}>
                <div className={styles.header} hidden={header == null}>
                    {header}
                </div>
                <div className={styles.body}>{body}</div>
            </Container>
        </AttributeMenuContext.Provider>
    );
};

AttributeMenu.Header = AttributeMenuHeader;
AttributeMenu.Body = AttributeMenuBody;

export default AttributeMenu;
