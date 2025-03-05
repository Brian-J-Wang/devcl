import { requireContext } from "../../../../utils/helpers";
import { RichInputContext } from "../RichInput";

interface RichInputInputProps {
    className: string
}

const RichInputInput: React.FC<RichInputInputProps> = (props) => {
    const { input, setInput, moveCursor } = requireContext(RichInputContext)
    
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();
            moveCursor(evt.key == "ArrowUp" ? "prev" : "next");
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    }

    return (
        <input value={input} onKeyDown={handleKeyDown} onChange={handleChange} className={props.className} />
    )
}

export default RichInputInput;