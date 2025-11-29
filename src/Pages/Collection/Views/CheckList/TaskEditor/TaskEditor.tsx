import { Container } from "@components/Container/Container";

import styles from "./TaskEditor.module.css";
import { ResizeableInput } from "@brwwang/react-components";
import taskEditorContext from "./taskEditorContext";
import { useContext } from "react";
import BoundingBox from "@shared/boundingBox";
import usePatchNuggets from "@hooks/usePatchNuggets";
import { Task } from "@app-types/task";
import { PatchNugget } from "@app-types/patchNuggets";

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
				<hr />
				<div>
					<h3> Attributes </h3>
				</div>
				{activeEditorTask?.attributes.map((attribute) => {
					return (
						<div>
							{" "}
							{attribute.id} :: {attribute.value as string}
						</div>
					);
				})}
				<h3> Subtasks </h3>
				{}
			</Container>
		</BoundingBox>
	);
};

export default TaskEditor;
