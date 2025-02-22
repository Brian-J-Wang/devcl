import { ReactNode, RefObject, useEffect, useRef } from "react"
import "./BaseInput.css"
import BoundingBox, { OutofBoundsHandle } from "../../shared/boundingBox"

interface BaseInputProps {
    title: string,
    isFocused?: boolean,
    onClick?: () => void,
    onBlur?: () => void,
    noBorder?: boolean,
    className?: string,
    children: ReactNode
}

const BaseInput: React.FC<BaseInputProps> = (props) => {
    const boundsHandle = useRef<OutofBoundsHandle>() as RefObject<OutofBoundsHandle>;

    useEffect(() => {
        if (props.isFocused) {
            boundsHandle.current?.setListen(true);
        } else {
            boundsHandle.current?.setListen(false);
        }
    }, [props.isFocused])

    return (
            <div className={`base-input ${props.className}`} >
                <h3 className="base-input__title">{props.title}</h3>
                <BoundingBox ref={boundsHandle} onOutOfBound={props.onBlur}>
                    {
                        props.noBorder
                        ? (
                            <div className="base-input__content_no-border">
                                {props.children}
                            </div>
                        ) : (
                            <div className={`base-input__content ${props.isFocused && "base-input__content_focused"}`} onClick={props.onClick}>
                                {props.children}
                            </div>
                        )
                    }
                    
                </BoundingBox>
            </div>
    )
}

export default BaseInput;