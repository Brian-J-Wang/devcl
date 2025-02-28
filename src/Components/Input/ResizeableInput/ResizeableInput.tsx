import {  useState, forwardRef, useRef, RefObject } from "react";

import "./ResizeableInput.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onInputChange: (evt: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => void;
};

const ResizeableInput = forwardRef<HTMLInputElement, InputProps>(({ style, className, onChange, onInputChange, ...props}, ref) => {
    const [defaultValue, setDefaultValue] = useState<string>("");
    const [width, setWidth] = useState<number>(0);
    const hiddenSpan = useRef<HTMLSpanElement>() as RefObject<HTMLSpanElement>;

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (hiddenSpan.current) {
            hiddenSpan.current.innerHTML = `${evt.target.value}`;
        }
        
        setWidth(hiddenSpan.current?.getBoundingClientRect().width ?? 10);

       
        if (onInputChange) {
            onInputChange(evt, setDefaultValue);
        } else {
            setDefaultValue(evt.target.value);
        }
    }

    console.log(style);

    return (
        <div className="flex flex-col">
            <span ref={hiddenSpan} className={`w-min resizeable__span ${className}`}></span>
            <input style={{ ...style, width: width}} className={className} ref={ref} onChange={handleChange} value={defaultValue} {...props}/>
        </div>
    )
})

export default ResizeableInput;