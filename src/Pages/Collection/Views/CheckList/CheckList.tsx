import { Container } from "@components/Container/Container";
import TaskItem from "./Task/task";
import { useContext, useState } from "react";

import style from "./checklist.module.css";
import AddItemInput from "./AddItemInput/AddItemInput";
import useTaskAPI from "../../../../Hooks/useTaskAPI";
import { UserContext } from "@context/UserContext";
import { PostTask, Task } from "@app-types/task";
import { useParams } from "react-router-dom";
import useTaskAttributeAPI from "../../../../Hooks/useTaskAttributeAPI";
import TaskEditor from "./TaskEditor/TaskEditor";
import taskEditorContext from "./TaskEditor/TaskEditorContext";

const CheckListView: React.FC = () => {
	const { id } = useParams();
	const { token } = useContext(UserContext);
	const { tasks, isLoading, ...api } = useTaskAPI("http://localhost:5081", id ?? "", token);
	const taskAttributeAPI = useTaskAttributeAPI("http://localhost:5081/taskDocs", id ?? "", token);

	const [activeEditorTask, setActiveEditorTask] = useState<Task | null>(null);

	const openPopup = (task: Task) => {
		setActiveEditorTask(task);
	};

	const onCheckboxClick = (task: Task) => () => {
		let newStatus: Task["status"] = "incomplete";

		if (task.status == "incomplete") {
			newStatus = "complete";
		} else {
			newStatus = "incomplete";
		}

		api.patchTask({
			_id: task._id,
			status: newStatus
		});
	};

	const onDeleteClick = (task: Task) => () => {
		api.deleteTask(task._id);
	};

	const onSubmit = (postTask: PostTask) => {
		return api.addTask(postTask).then(() => true);
	};

	return (
		<>
			<taskEditorContext.Provider value={{ activeEditorTask, setActiveEditorTask }}>
				<Container className={style.checklist}>
					{isLoading ? (
						<h1 className={style.noContentBlurb}> Loading... </h1>
					) : (
						<div className={tasks.length == 0 ? style.noContent : style.content}>
							{tasks.length == 0 ? (
								<h1 className={style.noContentBlurb}>You don't have any active tasks.</h1>
							) : (
								tasks.map((item) => {
									return (
										<TaskItem
											key={item._id}
											task={item}
											onClick={openPopup}
											onCheckboxClick={onCheckboxClick(item)}
											onDeleteClick={onDeleteClick(item)}
										/>
									);
								})
							)}
						</div>
					)}

					<AddItemInput onSubmit={onSubmit} attributeApi={taskAttributeAPI} />
				</Container>

				{activeEditorTask != null && <TaskEditor />}
			</taskEditorContext.Provider>
		</>
	);
};

export default CheckListView;
