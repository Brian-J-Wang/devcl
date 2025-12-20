import { useEffect, useRef, useState } from "react";
import TaskAPI from "../API/taskAPI";
import { PostTask, Task } from "@app-types/task";
import { PatchNugget } from "@app-types/patchNuggets";

const useTaskAPI = (endpoint: string, taskDocId: string, authorization: string) => {
	const { current: api } = useRef(new TaskAPI(endpoint, taskDocId, authorization));
	const [tasks, _setTasks] = useState<Task[]>([]);
	const [isLoading, _setIsLoading] = useState(true);

	useEffect(() => {
		api.getTasks().then((res) => {
			_setTasks(res);
			_setIsLoading(false);
		});
	}, []);

	const addTask = (task: PostTask) => {
		return api.addTask(task).then((res) => {
			_setTasks([...tasks, res]);
		});
	};

	const replaceTask = (taskId: string, replacementTask: Task) => {
		return api.replaceTask(taskId, replacementTask).then(() => {
			_setTasks(tasks.map((task) => (task._id != taskId ? task : replacementTask)));
		});
	};

	const patchTask = (taskId: string, nuggets: PatchNugget<Task>[]) => {
		console.log(nuggets);
		return api.patchTask(taskId, nuggets).then((newTask) => {
			_setTasks(tasks.map((task) => (task._id != taskId ? task : newTask)));
		});
	};

	const deleteTask = (id: string) => {
		return api.deleteTask(id).then(() => {
			_setTasks(tasks.filter((task) => task._id != id));
		});
	};

	return {
		tasks,
		isLoading,
		addTask,
		replaceTask,
		patchTask,
		deleteTask
	};
};

export default useTaskAPI;
