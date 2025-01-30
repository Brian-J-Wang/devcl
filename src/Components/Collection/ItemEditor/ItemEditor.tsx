import "./ItemEditor.css"
import { RefObject, useContext, useEffect, useRef } from "react"
import ItemEditorContext from "./itemEditorContext"
import BoundingBox, { OutofBoundsHandle } from "../../../shared/boundingBox";

export const ItemEditor: React.FC<any> = (props) => {
    const editorContext = useContext(ItemEditorContext);
    const boundingBoxController = useRef<OutofBoundsHandle>() as RefObject<OutofBoundsHandle>;

    useEffect(() => {
        if (editorContext.activeItem) {
            boundingBoxController.current?.setListen(true);
        } else {
            boundingBoxController.current?.setListen(false);
        }
    }, [editorContext.activeItem]);

    const handleOutOfBounds = (evt: MouseEvent) => {
        if (!(evt.target as HTMLElement).closest('#item-editor')) {
            editorContext.setActiveItem(undefined);
        }
    }

    return (
        <BoundingBox ref={boundingBoxController} onOutOfBound={handleOutOfBounds}>
            <div className={`item-editor ${!editorContext.activeItem && 'item-editor_hidden'}`} id="item-editor">
                <div>

                </div>
            </div>
        </BoundingBox>
        
    )
}