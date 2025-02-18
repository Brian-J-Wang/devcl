import { ReactNode, useContext, useEffect } from "react";
import { RadioGroupContext } from "./RadioGroup";

import "./Radio.css";

export interface RadioProps {
    name: string,
    children: ReactNode,
    className?: string,
    initial?: boolean
}

const getRadioGroupContext = () => {
    const radioContext = useContext(RadioGroupContext);

    if (!radioContext) {
        throw new Error("radio component is not nested within a radio context group");
    }

    return radioContext;
}

const Radio: React.FC<RadioProps> = (props) => {
    const radioContext = getRadioGroupContext();

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

export default Radio;