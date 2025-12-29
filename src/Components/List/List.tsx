import { useEffect, useState } from 'react';
import ListItem, { ListItemProps } from './ListItem';
import ListContext from './List.context';
import useListController from './List.controller';
import React from 'react';

type ListProps<T> = {
    items: T[];
    render: (item: T, isActive: boolean) => React.ReactElement<ListItemProps, typeof ListItem>;
    controller?: ReturnType<typeof useListController>;
};

const List = <T,>({ items, render, controller }: ListProps<T>) => {
    const [currentIndex, _setIndex] = useState<number>(0);

    useEffect(() => {
        if (!controller) {
            return;
        }

        const onShiftDown = () => {
            _setIndex((prev) => {
                if (prev < items.length - 1) {
                    return prev + 1;
                } else {
                    return prev;
                }
            });
        };
        controller.events.shiftDownEvent.subscribe(onShiftDown);

        const onShiftUp = () => {
            _setIndex((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    return prev;
                }
            });
        };
        controller.events.shiftUpEvent.subscribe(onShiftUp);

        return () => {
            controller.events.shiftDownEvent.unsubscribe(onShiftDown);
            controller.events.shiftUpEvent.unsubscribe(onShiftUp);
        };
    }, []);

    return (
        <ListContext.Provider value={{ setIndex: _setIndex }}>
            {items.map((item, index) => React.cloneElement(render(item, index == currentIndex), { index: index }))}
        </ListContext.Provider>
    );
};

export default List;
