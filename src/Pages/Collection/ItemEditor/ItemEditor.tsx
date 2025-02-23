import "./ItemEditor.css"
import { RefObject, useContext, useEffect, useRef, useState } from "react"
import ItemEditorContext from "./itemEditorContext"
import BoundingBox, { OutofBoundsHandle } from "../../../shared/boundingBox";
import { CLItem } from "../interfaces";
import { Container } from "../../../Components/Container/Container";

export const ItemEditor: React.FC<any> = (props) => {
    const editorContext = useContext(ItemEditorContext);
    const boundingBoxController = useRef<OutofBoundsHandle>() as RefObject<OutofBoundsHandle>;
    const [item, setItem] = useState<CLItem>();

    useEffect(() => {
        if (editorContext.activeItem) {
            boundingBoxController.current?.setListen(true);
            setItem(editorContext.activeItem);
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
            <Container className={`item-editor ${!editorContext.activeItem && 'item-editor_hidden'}`} id="item-editor">

            </Container>
        </BoundingBox>
        
    )
}

