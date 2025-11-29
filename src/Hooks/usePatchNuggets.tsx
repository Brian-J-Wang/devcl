import { PatchNugget } from "@app-types/patchNuggets";
import { useRef } from "react";

function usePatchNuggets<T>() {
	const { current: nuggets } = useRef<Map<keyof T, PatchNugget<T>>>(new Map());

	const addNugget = (nugget: PatchNugget<T>) => {
		nuggets.set(nugget.propertyName, nugget);
	};

	const removeNugget = (propertyName: keyof T) => {
		nuggets.delete(propertyName);
	};

	const clearAll = () => {
		nuggets.clear();
	};

	const getUpdateNuggets = () => {
		return Array.from(nuggets.values());
	};

	return {
		addNugget,
		removeNugget,
		clearAll,
		getUpdateNuggets
	};
}

export default usePatchNuggets;
