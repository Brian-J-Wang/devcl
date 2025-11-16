import { useEffect, useRef, useState } from "react";
import { TaskDoc } from "../../types/taskDoc";
import UserTaskDocAPI from "../../API/userTaskDocAPI";

const useUserTaskDocAPI = (endpoint: string, authorization: string) => {
	const api = useRef<UserTaskDocAPI>(new UserTaskDocAPI(endpoint, authorization));
	const [taskDocs, _setTaskDocs] = useState<TaskDoc[]>([]);
	const [isLoading, _setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		api.current.GetUserTaskDocs().then((taskDocs) => {
			console.log(taskDocs);
			_setTaskDocs(taskDocs);
			_setIsLoading(false);
		});
	}, []);

	const getTaskDoc = (id: string) => {
		return taskDocs.find((doc) => doc.id == id);
	};

	const addTaskDoc = () => {};

	const deleteTaskDoc = () => {};

	return {
		taskDocs,
		isLoading,
		getTaskDoc,
		addTaskDoc,
		deleteTaskDoc
	};
};

export default useUserTaskDocAPI;
