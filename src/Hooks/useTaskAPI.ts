import { useEffect, useRef, useState } from "react";
import TaskAPI from "../API/taskAPI";
import { PostTask, Task } from "@app-types/task";
import { PatchNugget } from "@app-types/patchNuggets";

const useTaskAPI = (endpoint: string, taskDocId: string, authorization: string) => {
	const api = useRef(new TaskAPI(endpoint, taskDocId, authorization));
	const [tasks, _setTasks] = useState<Task[]>([]);
	const [isLoading, _setIsLoading] = useState(true);

	useEffect(() => {
		api.current.getTasks().then((res) => {
			_setTasks(res);
			_setIsLoading(false);
		});
	}, []);

	const addTask = (task: PostTask) => {
		return api.current.addTask(task).then((res) => {
			_setTasks([...tasks, res]);
		});
	};

	const patchTask = (taskId: string, patchNuggets: PatchNugget<Task>[]) => {
		return api.current.patchTask(taskId, patchNuggets).then((res) => {
			_setTasks(tasks.map((task) => (task._id != taskId ? task : Object.assign(task, res))));
		});
	};

	const deleteTask = (id: string) => {
		return api.current.deleteTask(id).then(() => {
			_setTasks(tasks.filter((task) => task._id != id));
		});
	};

	return {
		tasks,
		isLoading,
		addTask,
		patchTask,
		deleteTask
	};
};

export default useTaskAPI;
