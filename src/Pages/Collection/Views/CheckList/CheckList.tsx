import { Container } from "@components/Container/Container";
import TaskItem from "./Task/task";
import { useContext, useEffect } from "react";
import AddItemInput from "./AddItemInput/AddItemInput";
import useTaskAPI from "../../../../Hooks/useTaskAPI";
import { UserContext } from "@context/UserContext";
import { PostTask, Task } from "@app-types/task";
import { useParams } from "react-router-dom";
import useTaskAttributeAPI from "../../../../Features/Attributes/attribute.hook";
import TaskEditor from "./TaskEditor/TaskEditor";
import { PatchNugget } from "@app-types/patchNuggets";
import TaskAttributeAPIContext from "../../../../Contexts/taskAttributeAPIContext";
import Icon from "@components/Icon";
import { CheckBoxState } from "@components/Icon/Checkbox/Checkbox";

import styles from "./checklist.module.css";
import useEditorController from "./controllers/useEditorController";

const CheckListView: React.FC = () => {
	const { id = "undefined" } = useParams();
	const { token } = useContext(UserContext);
	const { tasks, ...api } = useTaskAPI("http://localhost:5081", id ?? "", token);
	const taskAttributeAPI = useTaskAttributeAPI("http://localhost:5081/taskDocs", id ?? "", token);
	const editorController = useEditorController();

	const openEditor = (task: Task) => () => {
		editorController.setCurrentTask(task).withOpenEditor();
	};

	const onCheckboxClick = (task: Task) => () => {
		api.patchTask(task._id, [
			{
				propertyName: "status",
				updateType: "update",
				value: task.status == "complete" ? "incomplete" : "complete"
			}
		]);
	};

	const onDeleteClick = (task: Task) => () => {
		api.deleteTask(task._id);
	};

	const handleSubmit = (postTask: PostTask) => {
		return api.addTask(postTask).then(() => {
			requestAnimationFrame(() => {
				document.querySelector("#addItemRow")!.scrollIntoView({
					behavior: "smooth",
					block: "end"
				});
			});
		});
	};

	const handleTaskSave = (patchNuggets: PatchNugget<Task>[]) => {
		if (patchNuggets.length == 0) {
			return;
		}
	};

	useEffect(() => {}, [tasks]);

	return (
		<>
			<TaskAttributeAPIContext.Provider value={taskAttributeAPI}>
				<Container className={styles.checklist} id="checklistViewport">
					<table className={styles.table}>
						<thead className={styles.tableHeader}>
							<tr>
								<th className={styles.checkBoxSelect}>
									<Icon.CheckBox state={CheckBoxState.unchecked}></Icon.CheckBox>
								</th>
								<th colSpan={2}></th>
							</tr>
						</thead>
						<tbody className={styles.checklistbody}>
							{tasks.map((task) => {
								return (
									<TaskItem
										key={task._id}
										task={task}
										onClick={openEditor(task)}
										onCheckboxClick={onCheckboxClick(task)}
										onDeleteClick={onDeleteClick(task)}
									/>
								);
							})}
							<AddItemInput onSubmit={handleSubmit} />
						</tbody>
					</table>
				</Container>
				<TaskEditor
					focusedTask={editorController.currentTask!}
					onTaskSave={handleTaskSave}
					editorController={editorController}
				/>
			</TaskAttributeAPIContext.Provider>
		</>
	);
};

export default CheckListView;
