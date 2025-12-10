import { PropsWithChildren } from 'react';

type ContainerFooterProps = PropsWithChildren & {};

const ContainerFooter: React.FC<ContainerFooterProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default ContainerFooter;
