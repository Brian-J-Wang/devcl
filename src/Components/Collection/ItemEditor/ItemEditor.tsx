import "./ItemEditor.css"
import { RefObject, useContext, useEffect, useRef, useState } from "react"
import ItemEditorContext from "./itemEditorContext"
import BoundingBox, { OutofBoundsHandle } from "../../../shared/boundingBox";
import cross from "../../../assets/cross.svg";
import Input from "./Inputs";
import { CLItem } from "../DBCollection";

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
            <div className={`item-editor ${!editorContext.activeItem && 'item-editor_hidden'}`} id="item-editor">
                <div className="item-editor__title-bar">
                    <h2 className="item-editor__header">Item Editor</h2>
                    <button className="item-editor__cross-button" type="button">
                        <img src={cross} alt="X" className="item-editor__cross-image"/>
                    </button>
                </div>
                <div className="item-editor__content">
                    <Input.Text title={"Task: "} initialInput={item?.blurb ?? ""}/>
                    <Input.General title={"Priority: "} className="item-priority">
                        <input type="radio" name="priority" hidden id="priority-high"></input>
                        <label className="item-priority__label" htmlFor="priority-high">
                            !!!    
                        </label>
                        <input type="radio" name="priority" hidden id="priority-med"></input>
                        <label className="item-priority__label" htmlFor="priority-med">
                            !!
                        </label>
                        <input type="radio" name="priority" hidden id="priority-low"></input>
                        <label className="item-priority__label" htmlFor="priority-low">
                            !
                        </label>
                        <input type="radio" name="priority" hidden id="priority-none" checked></input>
                        <label className="item-priority__label" htmlFor="priority-none">
                            
                        </label>
                    </Input.General>
                    <Input.General title={"Assignee: "}>
                        <div className="item-assignee">
                            test
                        </div>
                    </Input.General>
                </div>
            </div>
        </BoundingBox>
        
    )
}

