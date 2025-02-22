import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { requireContext } from "../../../utils/helpers";

import "./Radio.css"
import BaseInput from "../BaseInput";

interface RadioGroupContextProps {
    active: string,
    setActive: (value: string) => void,
    selectedClass: string
}

export const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(undefined);

export interface RadioGroupProps {
    name?: string,
    className?: string,
    children: ReactElement<typeof Radio> | Array<ReactElement<typeof Radio>>,
    onChange: (name: string) => void,
    selectedStyle?: string,
    childrenStyle?: string
}

function Radio(props: RadioGroupProps) {
    const [active, setActive] = useState<string>("");
    const [ selected ] = useState(props.selectedStyle ?? "");

    const onChange = (value: string) => {
        setActive(value);
        props.onChange(value);
    }

    return (
        <RadioGroupContext.Provider value={{
            active,
            setActive: onChange,
            selectedClass: selected
        }}>
            <BaseInput title={props.name ?? ""} noBorder>
                <div className={`${props.className}`}>
                    {
                        props.children
                    }
                </div>
            </BaseInput>
        </RadioGroupContext.Provider>
    )
}

interface RadioProps {
    name: string,
    children: ReactNode,
    className?: string,
    initial?: boolean
}

const RadioOption: React.FC<RadioProps> = (props) => {
    const radioContext = requireContext(RadioGroupContext);

    const updateRadio = () => {
        if (!radioContext) {
            return;
        }

        radioContext.setActive(props.name);
    }

    useEffect(() => {
        if (props.initial) {
            radioContext.setActive(props.name);
        }
    }, [])

    return (
        <div className={`
            radio
            ${radioContext?.active == props.name && radioContext.selectedClass}
            ${props.className}
        `} onClick={updateRadio}>
            {props.children}
        </div>
    )
}

Radio.Option = RadioOption;

export default Radio;