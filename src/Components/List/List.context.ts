import { createContext } from 'react';

type ListContextProps = {
    setIndex: (index: number) => void;
};

const ListContext = createContext<ListContextProps>({
    setIndex: function (number: any): void {
        throw new Error('Function not implemented.');
    },
});

export default ListContext;
