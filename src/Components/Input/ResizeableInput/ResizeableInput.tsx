import {  useState, forwardRef, useRef, RefObject, useEffect } from "react";

import "./ResizeableInput.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onInputChange: (evt: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => void;
};

const ResizeableInput = forwardRef<HTMLInputElement, InputProps>(({ style, className, onChange, onInputChange, value, ...props}, ref) => {
    const [defaultValue, setDefaultValue] = useState<string>("");
    const [width, setWidth] = useState<number>(0);
    const hiddenSpan = useRef<HTMLSpanElement>() as RefObject<HTMLSpanElement>;

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {       
        if (onInputChange) {
            onInputChange(evt, setDefaultValue);
        } else {
            setDefaultValue(evt.target.value);
        }
    }

    useEffect(() => {
        if (!hiddenSpan.current) return;

        hiddenSpan.current.innerHTML = value as string ?? "";
        setWidth(hiddenSpan.current.getBoundingClientRect().width + 1);
    })

    useEffect(() => {
        
    }, [value]);

    const calculateWidth = () => {
        if (!hiddenSpan.current) return 0;
        return hiddenSpan.current.getBoundingClientRect().width + 1;
    }

    return (
        <>
            <span ref={hiddenSpan} className={`w-min resizeable__span pointer-events-none absolute ${className}`}></span>
            <input style={{ ...style, width: calculateWidth()}} className={`box-border ${className}`} ref={ref} onChange={handleChange} value={value ?? defaultValue} {...props}/>
        </>
    )
})

export default ResizeableInput;