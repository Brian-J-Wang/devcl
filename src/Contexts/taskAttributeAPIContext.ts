import { Attribute } from "src/Features/Attributes/attribute.types";
import { createContext } from "react";
import useTaskAttributeAPI from "src/Features/Attributes/attribute.hook";

const TaskAttributeAPIContext = createContext<ReturnType<typeof useTaskAttributeAPI>>({
	attributes: [],
	isLoading: false,
	getAttributeById: function (): Attribute {
		throw new Error("Function not implemented.");
	}
});

export default TaskAttributeAPIContext;
