import { createContext, SetStateAction } from "react";

interface popupContext {
    openPopup: SetStateAction<any>
}

//@ts-ignore
const PopupContext = createContext<popupContext>();

export default PopupContext;