import { ReactNode, useContext, useState } from "react";
import { RadioGroupContext } from "./RadioGroup";
import { generateMongoID } from "../../../utils/dummyGenerators";

import "./Radio.css";

export interface RadioProps {
    children: ReactNode,
    className?: string
}

const getRadioGroupContext = () => {
    const radioContext = useContext(RadioGroupContext);

    if (!radioContext) {
        console.error("radio component is not nested within a radio context group");
    }

    return radioContext;
}

const Radio: React.FC<RadioProps> = (props) => {
    const [ id ] = useState<string>(generateMongoID());
    const radioContext = getRadioGroupContext();

    const updateRadio = () => {
        if (!radioContext) {
            return;
        }

        radioContext.setSelected(id);
    }

    return (
        <div className={`
            radio
            ${radioContext?.selected == id && `radio_selected`}
            ${props.className}
        `} onClick={updateRadio}>
            {props.children}
        </div>
    )
}

export default Radio;