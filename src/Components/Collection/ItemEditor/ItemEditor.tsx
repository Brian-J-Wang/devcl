import "./ItemEditor.css"
import { useContext } from "react"
import ItemEditorContext from "./itemEditorContext"

export const ItemEditor: React.FC<any> = (props) => {
    const editorContext = useContext(ItemEditorContext);

    return (
        <div className={`item-editor ${editorContext.activeItem && 'item-editor_hidden'}`}>
            
        </div>
    )
}