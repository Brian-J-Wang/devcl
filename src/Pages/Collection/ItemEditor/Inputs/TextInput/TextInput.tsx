import { RefObject, useEffect, useRef, useState } from "react"
import "./TextInput.css"

type TextInputProps = {
    title: string,
    initialInput: string,
}

export const TextInput: React.FC<TextInputProps> = (props) => {
    const containerSize = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
    const titleSize = useRef<HTMLParagraphElement>() as RefObject<HTMLParagraphElement>;
    const [maxBlurbSize, setMaxBlurbSize] = useState<number>(0);

    useEffect(() => {
        recalculateBlurbSize();

        document.addEventListener('resize', recalculateBlurbSize);

        return () => {
            document.removeEventListener('resize', recalculateBlurbSize);
        }
    }, [])

    const recalculateBlurbSize = () => {
        const newSize = (containerSize.current?.getBoundingClientRect().width ?? 0) - (titleSize.current?.getBoundingClientRect().width ?? 0);
        setMaxBlurbSize(newSize - 12);
    }

    return (
        <div className="text-input" ref={containerSize}>
            <p className="text-input__title" ref={titleSize}>
                {props.title}
            </p>
            <p className="text-input__blurb" contentEditable style={{maxWidth: maxBlurbSize}}>
                {props.initialInput}
            </p>
        </div>
    )
}