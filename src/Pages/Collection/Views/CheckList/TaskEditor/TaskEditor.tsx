import { Container } from "@components/Container/Container";

import styles from "./TaskEditor.module.css";
import { ResizeableInput } from "@brwwang/react-components";
import taskEditorContext from "./taskEditorContext";
import { useContext } from "react";

const TaskEditor = () => {
	const { activeEditorTask, setActiveEditorTask } = useContext(taskEditorContext);
	return (
		<Container className={styles.body}>
			<ResizeableInput value={activeEditorTask?.blurb} className={styles.blurb} />
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
		</Container>
	);
};

export default TaskEditor;
