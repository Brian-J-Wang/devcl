import { Attribute } from "src/Features/Attributes/attribute.class";
import usePublisher from "@hooks/usePublisher";
import { useMemo, useState } from "react";

type TaskAttribute = {
	id: string;
	value: unknown;
};

type TaskAttributeMemo = Array<TaskAttribute> & {
	set: (id: string, value: unknown) => void;
	delete: (id: string) => void;
	clear: () => void;
};

const useAttributeMenu = () => {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [activeAttribute, setActiveAttribute] = useState<Attribute | null>(null);
	const [_taskAttributes, _setTaskAttributes] = useState<Map<string, unknown>>(new Map());
	const onTaskAttributeSelect = usePublisher<TaskAttribute>();

	const taskAttributes = useMemo<TaskAttributeMemo>(() => {
		const arr = Array.from(_taskAttributes.entries()).map(([id, value]) => ({
			id: id,
			value: value
		}));

		return Object.assign(arr, {
			set(id: string, value: unknown) {
				const newMap = new Map(_taskAttributes);
				newMap.set(id, value);
				_setTaskAttributes(newMap);
				onTaskAttributeSelect.publish({
					id: id,
					value: value
				});
			},
			delete(id: string) {
				const newMap = new Map(_taskAttributes);
				newMap.delete(id);
				_setTaskAttributes(newMap);
			},
			clear() {
				const newMap = new Map(_taskAttributes);
				newMap.clear();
				_setTaskAttributes(newMap);
			}
		});
	}, [_taskAttributes, onTaskAttributeSelect]);

	return {
		menuVisible,
		setMenuVisible,
		activeAttribute,
		setActiveAttribute,
		taskAttributes,
		onTaskAttributeSelect
	};
};

export default useAttributeMenu;
