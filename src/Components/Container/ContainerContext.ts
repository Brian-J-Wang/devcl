import { createContext, ReactNode, SetStateAction } from 'react';

type ContainerContextProps = {
    setHeader: React.Dispatch<SetStateAction<ReactNode>>;
    setBody: React.Dispatch<SetStateAction<ReactNode>>;
};

const ContainerContext = createContext<ContainerContextProps>({
    setHeader: function (): void {
        throw new Error('Function not implemented.');
    },
    setBody: function (): void {
        throw new Error('Function not implemented.');
    },
});

export { ContainerContext };
