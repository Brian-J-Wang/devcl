import { PropsWithChildren, ReactNode, useState, createContext } from "react";
import BaseInput from "../BaseInput";
import "./DropDown.css";
import { requireContext } from "../../../utils/helpers";

const DropDownContext = createContext<{
    setSelected: React.Dispatch<React.SetStateAction<string>>
}>({
    setSelected: () => {}
});

type DropDownProps = {
    children: ReactNode,
    title: string,
    placeholder: string,
}

function DropDown(props: DropDownProps) {
    const [ focused, setFocused ] = useState<boolean>(false);
    const [ selected, setSelected ] = useState<string>("");

    return (
        <BaseInput title={props.title} onClick={() => { setFocused(true)}} onBlur={() => { setFocused(false) }} isFocused={focused} className="drop-down">
            <div className="drop-down__left">
                { selected == ""
                    ? props.placeholder
                    : selected }
            </div>
            <div className="drop">

            </div>
            
            <DropDownContext.Provider value={{ setSelected }}>
                <div className={`drop-down__menu ${focused && "drop-down__menu_visible"}`} onClick={(evt) => { evt.stopPropagation }}>
                    {props.children}
                </div>
            </DropDownContext.Provider>
        </BaseInput>
    )
}

type DropDownOptionProps = PropsWithChildren & {
    value: string
}



const DropDownOption: React.FC<DropDownOptionProps> = (props) => {
    const dropDownContext = requireContext(DropDownContext);

    return (
        <div className="drop-down__option" onClick={() => { dropDownContext.setSelected(props.value)}}>
            {props.children}
        </div>
    )
}

DropDown.Option = DropDownOption;

export default DropDown;