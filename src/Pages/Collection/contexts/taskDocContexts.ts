import { TaskDoc } from "@/types/taskDoc";
import { createContext } from "react";

type TaskDocContextProps = {
	taskDoc: TaskDoc;
};

const TaskDocContext = createContext<TaskDocContextProps>({
	taskDoc: {
		id: "",
		name: "",
		owner: "",
		version: ""
	}
});

export default TaskDocContext;
