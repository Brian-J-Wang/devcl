import { forwardRef, PropsWithChildren, ReactNode, RefObject, useEffect, useRef } from 'react';
import { Position } from '../utils/math/position';

type BoundingBoxProps = PropsWithChildren &
    React.HTMLAttributes<HTMLDivElement> & {
        children: ReactNode;
        onBound?: (evt: MouseEvent) => void;
        onOutOfBound?: (evt: MouseEvent) => void;
        disabled?: boolean;
    };

export type OutofBoundsHandle = {
    setListen: (value: boolean) => void;
};

const BoundingBox = forwardRef<OutofBoundsHandle, BoundingBoxProps>(
    ({ children, onBound = () => {}, onOutOfBound = () => {}, disabled, ...props }, ref) => {
        const boundingElement = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
        const activationTimeStamp = useRef<number>(0.0);

        //cleans up event listeners in case this component gets unmounted.
        useEffect(() => {
            if (disabled) {
                return;
            } else {
                activationTimeStamp.current = performance.now();
            }

            document.addEventListener('click', handleMouseDown);

            return () => {
                document.removeEventListener('click', handleMouseDown);
            };
        }, [disabled]);

        function handleMouseDown(evt: MouseEvent) {
            if (disabled || evt.button != 0) {
                return;
            }

            //prevents bounding from triggering on events that happens before the bounding box is triggered
            if (evt.timeStamp <= activationTimeStamp.current) {
                return;
            }

            const clientRect = getBounds();
            if (
                clientRect &&
                withinBounds(clientRect, {
                    x: evt.clientX,
                    y: evt.clientY,
                })
            ) {
                onBound(evt);
            } else {
                onOutOfBound(evt);
            }

            function getBounds() {
                const element = boundingElement.current?.querySelector('[data-bounding-element]');

                if (element) {
                    return element.getBoundingClientRect();
                } else {
                    return boundingElement.current?.getBoundingClientRect();
                }
            }

            function withinBounds(clientRect: DOMRect, position: Position) {
                if (position.x < clientRect.left || position.x > clientRect.right) {
                    return false;
                }

                if (position.y < clientRect.top || position.y > clientRect.bottom) {
                    return false;
                }

                return true;
            }
        }

        return (
            <div ref={boundingElement} {...props}>
                {children}
            </div>
        );
    }
);

export default BoundingBox;
