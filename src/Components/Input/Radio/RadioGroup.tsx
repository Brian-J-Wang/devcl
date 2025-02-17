import { createContext, ReactElement, useState } from "react"
import Radio from "./Radio"

import "./Radio.css"

interface RadioGroupContextProps {
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(undefined);

export interface RadioGroupProps {
    name: string,
    className?: string,
    children: ReactElement<typeof Radio> | Array<ReactElement<typeof Radio>>
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const [selected, setSelected] = useState<string>("");

    return (
        <RadioGroupContext.Provider value={{
            selected,
            setSelected
        }}>
            <div className={`${props.className} radio__group`}>
                <h2 className="radio__name">{props.name}</h2>
                <div className="radio__group-items" >
                    {
                        props.children
                    }
                </div>
            </div>
            
        </RadioGroupContext.Provider>
    )
}

export default RadioGroup;