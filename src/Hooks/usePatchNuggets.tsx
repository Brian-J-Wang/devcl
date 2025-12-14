import { PatchNugget } from "@app-types/patchNuggets";
import { useEffect, useRef, useState } from "react";

function usePatchNuggets<T>(baseValue: T) {
	console.log(baseValue);
	const { current: nuggets } = useRef<Map<keyof T, PatchNugget<T>>>(new Map());
	const [value, setValue] = useState<T>(baseValue);

	useEffect(() => {
		setValue(baseValue);
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

		setValue((prev) => {
			return {
				...prev,
				[propertyName]: nuggets.get(propertyName)?.value
			};
		});
	};

	const removeNugget = (propertyName: keyof T) => {
		nuggets.delete(propertyName);

		setValue((prev) => {
			return {
				...prev,
				[propertyName]: baseValue[propertyName]
			};
		});
	};

	const clearAll = () => {
		nuggets.clear();

		setValue(baseValue);
	};

	const hasNugget = (propertyName: keyof T) => {
		return nuggets.has(propertyName);
	};

	const getNuggets = (propertyName?: keyof T, updateType?: PatchNugget<T>["updateType"]) => {
		let arr = Array.from(nuggets.values());
		if (propertyName != undefined) {
			arr = arr.filter((nugget) => nugget.propertyName == propertyName);
		}
		if (updateType != undefined) {
			arr = arr.filter((nugget) => nugget.updateType == updateType);
		}
		return arr;
	};

	return {
		value,
		setValue,
		setNugget,
		removeNugget,
		hasNugget,
		getNuggets,
		clearAll
	};
}

export default usePatchNuggets;
