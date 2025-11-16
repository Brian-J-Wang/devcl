import useTaskAttributeAPI from "@/Pages/Collection/CheckList/Hooks/useTaskAttributeAPI";
import { createContext } from "react";

const attributeContext = createContext<typeof useTaskAttributeAPI>(() => {
	return {
		attributes: [],
		isLoading: true
	};
});

export default attributeContext;
