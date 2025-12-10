import { Container } from '@components/Container/Container';
import TaskItem from './Task/Task';
import { useContext, useState } from 'react';
import AddItemInput from './AddItemInput/AddItemInput';
import useTaskAPI from '../../../../Hooks/useTaskAPI';
import { UserContext } from '@context/UserContext';
import { PostTask, Task } from '@app-types/task';
import { useParams } from 'react-router-dom';
import useTaskAttributeAPI from '../../../../Hooks/useTaskAttributeAPI';
import TaskEditor from './TaskEditor/TaskEditor';
import { PatchNugget } from '@app-types/patchNuggets';
import TaskAttributeAPIContext from '../../../../Contexts/taskAttributeAPIContext';
import Icon from '@components/Icon';
import { CheckBoxState } from '@components/Icon/Checkbox/Checkbox';

import styles from './checklist.module.css';

const CheckListView: React.FC = () => {
	const { id = "undefined" } = useParams();
	const { token } = useContext(UserContext);
	const { tasks, isLoading, ...api } = useTaskAPI("http://localhost:5081", id ?? "", token);
	const taskAttributeAPI = useTaskAttributeAPI("http://localhost:5081/taskDocs", id ?? "", token);
	const [activeEditorTask, setActiveEditorTask] = useState<Task | null>(null);

	const openEditor = (task: Task) => {
		setActiveEditorTask(task);
	};

	const onCheckboxClick = (task: Task) => () => {
		let newStatus: Task["status"] = "incomplete";

		if (task.status == "incomplete") {
			newStatus = "complete";
		} else {
			newStatus = "incomplete";
		}

		api.patchTask(task._id, [
			{
				propertyName: "status",
				value: newStatus,
				updateType: "update"
			}
		]);
	};

	const onDeleteClick = (task: Task) => () => {
		api.deleteTask(task._id);
	};

	const handleSubmit = (postTask: PostTask) => {
		return api.addTask(postTask).then(() => true);
	};

	const handleTaskSave = (patchNuggets: PatchNugget<Task>[]) => {
		if (patchNuggets.length != 0) {
			api.patchTask(activeEditorTask?._id ?? "", patchNuggets);
		}

		setActiveEditorTask(null);
	};

    return (
        <>
            <TaskAttributeAPIContext.Provider value={taskAttributeAPI}>
                <Container className={styles.checklist}>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.checkBoxSelect}>
                                    <Icon.CheckBox state={CheckBoxState.unchecked}></Icon.CheckBox>
                                </th>
                                <th colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((item) => {
                                return (
                                    <TaskItem
                                        key={item._id}
                                        task={item}
                                        onClick={openEditor}
                                        onCheckboxClick={onCheckboxClick(item)}
                                        onDeleteClick={onDeleteClick(item)}
                                    />
                                );
                            })}
                            <AddItemInput onSubmit={handleSubmit} />
                        </tbody>
                    </table>
                </Container>

				{activeEditorTask != null && <TaskEditor onTaskSave={handleTaskSave} task={activeEditorTask} />}
			</TaskAttributeAPIContext.Provider>
		</>
	);
};

export default CheckListView;
