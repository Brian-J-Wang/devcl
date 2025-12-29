import usePublisher from '@hooks/usePublisher';

const useListController = () => {
    const shiftDownEvent = usePublisher();
    const shiftUpEvent = usePublisher();

    const shiftDown = () => {
        shiftDownEvent.publish();
    };

    const shiftUp = () => {
        shiftUpEvent.publish();
    };

    return {
        events: {
            shiftDownEvent,
            shiftUpEvent,
        },
    };
};

export default useListController;
