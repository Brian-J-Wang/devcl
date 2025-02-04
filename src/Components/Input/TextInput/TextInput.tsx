import { useState } from "react"
import "./TextInput.css"

export interface TextInputProps {
    name: string
    type: "text" | "password" | "email"
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    return (
        <div className="text-input">
            <div className={`text-input__name ${(isFocus || input.length != 0) && "text-input__name-focused"}`}>{props.name}</div>
            <input type={props.type} className="text-input__input" 
                onFocus={() => {setIsFocus(true)}} 
                onBlur={() => {setIsFocus(false)}}
                onChange={(evt) => {setInput(evt.target.value)}}
                value={input}
            >
            </input>        
        </div>
    )
}

export default TextInput;