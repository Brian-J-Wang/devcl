import { Container } from "../../../Components/Container/Container";
import CLItemElement from "../Task/task";
import { useContext } from "react";

import style from "./checklist.module.css";
import AddItemInput from "./AddItemInput/AddItemInput";
import useTaskAPI from "./Hooks/useTaskAPI";
import { UserContext } from "../../../Contexts/UserContext";
import { PostTask, Task } from "@app-types/task";
import { useParams } from "react-router-dom";

const CheckList: React.FC = () => {
	const { id } = useParams();
	const { token } = useContext(UserContext);
	const { tasks, isLoading, ...api } = useTaskAPI("http://localhost:5081", id ?? "", token);

	const openPopup = () => {};

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

	console.log(tasks);

	return (
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
								<CLItemElement
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

			<AddItemInput onSubmit={onSubmit} />
		</Container>
	);
};

export default CheckList;
