import { useState } from "react"
import "./TextInput.css"
import BaseInput from "../BaseInput";

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
        <BaseInput title={props.name} isFocused={isFocus}>
            <input type={props.type} className="text-input" 
                onFocus={() => {setIsFocus(true)}} 
                onBlur={() => {setIsFocus(false)}}
                onChange={(evt) => {handleTextChange(evt)}}
                value={input}
            ></input>
        </BaseInput>
    )
}

export default TextInput;