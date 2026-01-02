import usePublisher from '@hooks/usePublisher';
import { useState } from 'react';

const useListController = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const shiftDownEvent = usePublisher();
    const shiftUpEvent = usePublisher();

    const shiftDown = () => {
        shiftDownEvent.publish();
    };

    const shiftUp = () => {
        shiftUpEvent.publish();
    };

    return {
        currentIndex,
        setCurrentIndex,
        events: {
            shiftDownEvent,
            shiftUpEvent,
        },
    };
};

export default useListController;
