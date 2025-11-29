import { Container } from "@components/Container/Container";
import { ResizeableInput } from "@brwwang/react-components";
import taskEditorContext from "./taskEditorContext";
import { useContext } from "react";
import BoundingBox from "@shared/boundingBox";
import usePatchNuggets from "@hooks/usePatchNuggets";
import { Task } from "@app-types/task";
import { PatchNugget } from "@app-types/patchNuggets";
import Icon from "@components/Icon";
import { CheckBoxState } from "@components/Icon/Checkbox/Checkbox";

import styles from "./TaskEditor.module.css";
import AttributeTag from "../shared/AttributeTag";

type TaskEditorProps = {
	onClose: (updateNuggets: PatchNugget<Task>[]) => void;
};

const TaskEditor: React.FC<TaskEditorProps> = ({ onClose }) => {
	const { activeEditorTask, setActiveEditorTask } = useContext(taskEditorContext);
	const editorUpdater = usePatchNuggets<Task>();

	return (
		<BoundingBox
			onOutOfBound={() => {
				onClose(editorUpdater.getUpdateNuggets());
				setActiveEditorTask(null);
			}}>
			<Container className={styles.body}>
				<div className={styles.header}>
					<Icon.CheckBox
						className={styles.checkBox}
						state={activeEditorTask?.status == "complete" ? CheckBoxState.checked : CheckBoxState.unchecked}
					/>
					<ResizeableInput
						value={activeEditorTask?.blurb}
						className={styles.blurb}
						onTextChange={(value) => {
							editorUpdater.addNugget({
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
				{activeEditorTask?.attributes.map((attribute) => {
					return (
						<AttributeTag id={attribute.id} value={attribute.value as string} onDeleteClick={() => {}}></AttributeTag>
					);
				})}
				<h3> Subtasks </h3>
			</Container>
		</BoundingBox>
	);
};

export default TaskEditor;
