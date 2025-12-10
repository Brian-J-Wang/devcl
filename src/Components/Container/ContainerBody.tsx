import { PropsWithChildren } from 'react';

const ContainerBody: React.FC<PropsWithChildren> = ({ children }) => {
    return <div>{children}</div>;
};

export default ContainerBody;
