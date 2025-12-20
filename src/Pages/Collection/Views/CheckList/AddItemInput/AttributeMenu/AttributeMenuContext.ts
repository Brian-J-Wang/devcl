import { createContext } from "react";
import useAttributeMenu from "./useAttributeMenuHook";

const AttributeMenuContext = createContext<ReturnType<typeof useAttributeMenu>>(Object.assign([]));

export default AttributeMenuContext;
