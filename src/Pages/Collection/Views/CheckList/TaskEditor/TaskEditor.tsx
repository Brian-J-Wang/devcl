import { Container } from "@components/Container/Container";
import { ResizeableInput } from "@brwwang/react-components";
import BoundingBox from "@shared/boundingBox";
import usePatchNuggets from "@hooks/usePatchNuggets";
import { Attribute, Task } from "@app-types/task";
import Icon from "@components/Icon";
import { CheckBoxState } from "@components/Icon/Checkbox/Checkbox";

import styles from "./TaskEditor.module.css";
import AttributeTag from "../shared/AttributeTag";
import { PatchNugget } from "@app-types/patchNuggets";
import { useState } from "react";

type TaskEditorProps = {
	task: Task;
	onTaskSave: (patchNuggets: PatchNugget<Task>[]) => void;
};

const TaskEditor: React.FC<TaskEditorProps> = ({ task, onTaskSave }) => {
	const patchNugget = usePatchNuggets<Task>(task);

	const handleCheckBoxClick = () => {
		patchNugget.setNugget("status", (prev) => {
			return {
				...prev,
				value: prev.value == "complete" ? "incomplete" : "complete"
			};
		});
	};

	const [addSubTaskInput, setAddSubTaskInput] = useState<string>("");
	const handleSubTaskInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		const { value } = evt.target as HTMLInputElement;
		if (evt.key == "Enter") {
			patchNugget.setNugget("subTasks", (nugget) => {
				return {
					...nugget,
					value: [
						...nugget.value,
						{
							state: "incomplete",
							blurb: value
						}
					] as Attribute[]
				};
			});
			setAddSubTaskInput("");
		}
	};

	const handleSubTaskInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setAddSubTaskInput(evt.target.value);
	};

	return (
		<BoundingBox
			onOutOfBound={() => {
				onTaskSave(patchNugget.getNuggets());
				patchNugget.clearAll();
			}}>
			<Container className={styles.body}>
				<div className={styles.header}>
					<Icon.CheckBox
						onClick={handleCheckBoxClick}
						className={styles.checkBox}
						state={patchNugget.state.status == "complete" ? CheckBoxState.checked : CheckBoxState.unchecked}
					/>
					<ResizeableInput
						value={patchNugget.state.blurb}
						className={styles.blurb}
						onTextChange={(value) => {
							patchNugget.setNugget("blurb", {
								propertyName: "blurb",
								updateType: "update",
								value: value
							});
						}}
					/>
				</div>

				<hr />
				<div>
					<h3> Attributes </h3>
				</div>
				{patchNugget.state.attributes.map((attribute) => {
					return (
						<AttributeTag id={attribute.id} value={attribute.value as string} onDeleteClick={() => {}}></AttributeTag>
					);
				})}
				<h3> Subtasks </h3>
				{
					<div className={styles.subTask}>
						<Icon.CheckBox state={CheckBoxState.unchecked} className={styles.checkBox} />
						Do some task here
					</div>
				}
				{patchNugget.state.subTasks.map((subTask) => {
					return (
						<div className={styles.subTask} key={subTask.blurb}>
							<Icon.CheckBox
								className={styles.checkBox}
								state={subTask.state == "incomplete" ? CheckBoxState.unchecked : CheckBoxState.checked}
							/>
							<span>{subTask.blurb}</span>
						</div>
					);
				})}
				<div className={`${styles.subTask} ${styles.addSubTask}`}>
					<Icon.CheckBox className={styles.checkBox} state={CheckBoxState.unchecked} />
					<input
						type="text"
						name="addSubTask"
						id="addSubTask"
						value={addSubTaskInput}
						className={styles.addSubTask}
						placeholder="Click here to add subTask"
						onKeyDown={handleSubTaskInput}
						onChange={handleSubTaskInputChange}
					/>
				</div>
			</Container>
		</BoundingBox>
	);
};

export default TaskEditor;
