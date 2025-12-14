import { Task } from "@app-types/task";
import { useState } from "react";

const useEditorController = () => {
	const [currentTask, _setCurrentTask] = useState<Task>({
		_id: "",
		blurb: "placeholder",
		status: "complete",
		attributes: [
			{
				id: "6917f0e68970b5d5e7585429",
				value: "bug"
			}
		],
		subTasks: []
	});
	const [editorOpen, _setEditorOpen] = useState<boolean>(false);

	function setCurrentTask(task: Task) {
		_setCurrentTask(task);

		return {
			withOpenEditor() {
				_setEditorOpen(true);
				return this;
			}
		};
	}

	return {
		currentTask,
		setCurrentTask,
		editorOpen
	};
};

export default useEditorController;
