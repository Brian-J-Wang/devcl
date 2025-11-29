import { Attribute } from "@app-types/attributes";
import { createContext } from "react";
import useTaskAttributeAPI from "@hooks/useTaskAttributeAPI";

const TaskAttributeAPIContext = createContext<ReturnType<typeof useTaskAttributeAPI>>({
	attributes: [],
	isLoading: false,
	getAttributeById: function (): Attribute {
		throw new Error("Function not implemented.");
	}
});

export default TaskAttributeAPIContext;
