import { createContext, ReactNode, SetStateAction } from 'react';

type AttributeMenuContextProps = {
    setHeader: React.Dispatch<SetStateAction<ReactNode>>;
    setBody: React.Dispatch<SetStateAction<ReactNode>>;
};

const AttributeMenuContext = createContext<AttributeMenuContextProps>({
    setHeader: function (value: SetStateAction<ReactNode>): void {
        throw new Error('Function not implemented.');
    },
    setBody: function (value: SetStateAction<ReactNode>): void {
        throw new Error('Function not implemented.');
    },
});

export { AttributeMenuContext };
