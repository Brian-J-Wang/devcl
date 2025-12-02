import {
	forwardRef,
	PropsWithChildren,
	ReactNode,
	RefObject,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from "react";
import { Position } from "../utils/math/position";

type BoundingBoxProps = PropsWithChildren &
	React.HTMLAttributes<HTMLDivElement> & {
		children: ReactNode;
		onBound?: (evt: MouseEvent) => void;
		onOutOfBound?: (evt: MouseEvent) => void;
		active?: boolean;
	};

export type OutofBoundsHandle = {
	setListen: (value: boolean) => void;
};

const BoundingBox = forwardRef<OutofBoundsHandle, BoundingBoxProps>(
	({ children, onBound = () => {}, onOutOfBound = () => {}, active = true, ...props }, ref) => {
		const [listen, setListen] = useState<boolean>(false);
		const boundingElement = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;

		useImperativeHandle(ref, () => ({
			setListen: (value) => {
				setListen(value);
			}
		}));

		//cleans up event listeners in case this component gets unmounted.
		useEffect(() => {
			if (listen) {
				document.addEventListener("click", handleMouseDown);
			} else {
				document.removeEventListener("click", handleMouseDown);
			}

			return () => {
				document.removeEventListener("click", handleMouseDown);
			};
		}, [listen]);

		//setActive is set to listen after the component mounts to prevent early triggering of mouseclicks;
		useEffect(() => {
			setListen(active);
		}, []);

		function handleMouseDown(evt: MouseEvent) {
			if (!listen || evt.button != 0) {
				return;
			}

			const clientRect = getBounds();

			if (
				clientRect &&
				withinBounds(clientRect, {
					x: evt.clientX,
					y: evt.clientY
				})
			) {
				onBound(evt);
			} else {
				onOutOfBound(evt);
			}

			function getBounds() {
				const element = boundingElement.current?.querySelector("[data-bounding-element]");

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
