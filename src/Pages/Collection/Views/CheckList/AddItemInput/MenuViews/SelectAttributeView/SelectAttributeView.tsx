import { Container } from '@components/Container/Container';
import { PropsWithChildren } from 'react';

const SelectAttributeView: React.FC<PropsWithChildren> = () => {
    return (
        <>
            <Container.Header>
                <input type="text" placeholder="Filter attributes" id="attributeFilter" />
            </Container.Header>
            <Container.Body></Container.Body>
        </>
    );
};

export default SelectAttributeView;
