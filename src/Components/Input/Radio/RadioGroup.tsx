import { Children, cloneElement, createContext, ReactElement, useState } from "react"
import Radio from "./Radio"

import "./Radio.css"

interface RadioGroupContextProps {
    active: string,
    setActive: React.Dispatch<React.SetStateAction<string>>,
    selectedClass: string
}

export const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(undefined);

export interface RadioGroupProps {
    name?: string,
    className?: string,
    children: ReactElement<typeof Radio> | Array<ReactElement<typeof Radio>>,
    styles?: {
        group?: string
        selected?: string
    }
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const [active, setActive] = useState<string>("");
    const [ selected ] = useState(props.styles?.selected ?? "");

    return (
        <RadioGroupContext.Provider value={{
            active,
            setActive,
            selectedClass: selected
        }}>
            <div className={props.className}>
                {
                    props.name && <h2 className="radio__name">{props.name}</h2>
                }
                <div className={`${props.styles?.group}`}>
                    {
                        props.children
                    }
                </div>
            </div>
            
        </RadioGroupContext.Provider>
    )
}

export default RadioGroup;