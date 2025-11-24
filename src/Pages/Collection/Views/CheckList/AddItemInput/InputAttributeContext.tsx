import { createContext } from "react";

type InputAttributeContextProps = {
	setTaskAttribute: (id: string, value: unknown) => void;
};

const InputAttributeContext = createContext<InputAttributeContextProps>({
	setTaskAttribute: () => {
		throw new Error("Not Implemented");
	}
});

export default InputAttributeContext;
