import { createContext } from "react"
import { CLItem } from "../interfaces"

type itemEditorContextProps = {
    activeItem?: CLItem
    setActiveItem: React.Dispatch<React.SetStateAction<CLItem | undefined>>
}

const ItemEditorContext = createContext<itemEditorContextProps>({
    activeItem: undefined,
    setActiveItem: () => {}
})

export default ItemEditorContext;