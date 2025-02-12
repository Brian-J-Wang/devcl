import { useState } from "react"
import "./TextInput.css"

export interface TextInputProps {
    name: string,
    type: "text" | "password" | "email",
    stateHandler?: React.Dispatch<React.SetStateAction<string>>,
    initialValue?: string,
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [input, setInput] = useState<string>(props.initialValue ?? "");

    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
        props.stateHandler && props.stateHandler(evt.target.value);
    }

    return (
        <div className="text-input">
            <div className={`text-input__name ${(isFocus || input.length != 0) && "text-input__name-focused"}`}>{props.name}</div>
            <input type={props.type} className="text-input__input" 
                onFocus={() => {setIsFocus(true)}} 
                onBlur={() => {setIsFocus(false)}}
                onChange={(evt) => {handleTextChange(evt)}}
                value={input}
            >
            </input>        
        </div>
    )
}

export default TextInput;