import { useRef } from "react";

function usePublisher<T = void>() {
	const { current: subscribers } = useRef<Set<(value: T) => void>>(new Set());

	const publish = (value: T) => {
		subscribers.forEach((subscriber) => {
			subscriber(value);
		});
	};

	const subscribe = (fn: (value: T) => void) => {
		subscribers.add(fn);
	};

	const unsubscribe = (fn: (value: T) => void) => {
		subscribers.delete(fn);
	};

	const clear = () => {
		subscribers.clear();
	};

	return {
		subscribe,
		unsubscribe,
		clear,
		publish
	};
}

export default usePublisher;
