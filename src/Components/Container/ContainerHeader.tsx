import { PropsWithChildren } from 'react';

const ContainerHeader: React.FC<PropsWithChildren> = ({ children }) => {
    return <div>{children}</div>;
};

export default ContainerHeader;
