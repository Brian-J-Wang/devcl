import { useState } from "react";

type TaskAttribute = {
	id: string;
	value: unknown;
};

const useAttributeHook = () => {
	const [taskAttribute, _setTaskAttribute] = useState<TaskAttribute[]>([]);
	const setTaskAttribute = (id: string, value: unknown) => {
		if (taskAttribute.some((value) => value.id == id)) {
			_setTaskAttribute(
				taskAttribute.map((attribute) => {
					return attribute.id == id
						? {
								id: id,
								value: value
						  }
						: attribute;
				})
			);
		} else {
			const newAttribute = {
				id: id,
				value: value
			};
			_setTaskAttribute([newAttribute, ...taskAttribute]);
		}
	};

	const removeTaskAttribute = (id: string) => {
		_setTaskAttribute(
			taskAttribute.filter((attribute) => {
				return attribute.id != id;
			})
		);
	};

	const clearTaskAttributes = () => {
		_setTaskAttribute([]);
	};

	return {
		taskAttribute,
		setTaskAttribute,
		removeTaskAttribute,
		clearTaskAttributes
	};
};

export default useAttributeHook;
