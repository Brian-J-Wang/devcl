import { PatchNugget } from "@app-types/patchNuggets";
import { useEffect, useRef, useState } from "react";

function usePatchNuggets<T>(baseValue: T) {
	const { current: nuggets } = useRef<Map<keyof T, PatchNugget<T>>>(new Map());
	const [state, setState] = useState<T>(baseValue);

	useEffect(() => {
		setState(baseValue);
		nuggets.clear();
	}, [baseValue]);

	const setNugget = (propertyName: keyof T, nugget: PatchNugget<T> | ((prev: PatchNugget<T>) => PatchNugget<T>)) => {
		if (typeof nugget == "function") {
			nuggets.set(
				propertyName,
				nugget(
					nuggets.get(propertyName) ?? {
						propertyName: propertyName,
						updateType: "update",
						value: baseValue[propertyName]
					}
				)
			);
		} else {
			nuggets.set(propertyName, nugget);
		}

		setState((prev) => {
			return {
				...prev,
				[propertyName]: nuggets.get(propertyName)?.value
			};
		});
	};

	const removeNugget = (propertyName: keyof T) => {
		nuggets.delete(propertyName);

		setState((prev) => {
			return {
				...prev,
				[propertyName]: baseValue[propertyName]
			};
		});
	};

	const clearAll = () => {
		nuggets.clear();

		setState(baseValue);
	};

	const hasNugget = (propertyName: keyof T) => {
		return nuggets.has(propertyName);
	};

	const getNuggets = (propertyName?: keyof T, updateType?: PatchNugget<T>["updateType"]) => {
		console.log(nuggets);
		let arr = Array.from(nuggets.values());
		console.log(arr);
		if (propertyName != undefined) {
			console.log(arr);
			arr = arr.filter((nugget) => nugget.propertyName == propertyName);
		}
		if (updateType != undefined) {
			console.log(arr);
			arr = arr.filter((nugget) => nugget.updateType == updateType);
		}
		return arr;
	};

	return {
		state,
		setState,
		setNugget,
		removeNugget,
		hasNugget,
		getNuggets,
		clearAll
	};
}

export default usePatchNuggets;
