import { Task } from "@app-types/task";
import { createContext } from "react";

type taskEditorContext = {
	activeEditorTask: Task | null;
	setActiveEditorTask: (task: Task | null) => void;
};

const taskEditorContext = createContext<taskEditorContext>({
	activeEditorTask: null,
	setActiveEditorTask: () => {}
});

export default taskEditorContext;
