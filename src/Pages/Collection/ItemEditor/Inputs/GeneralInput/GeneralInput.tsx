import { ReactNode } from "react"
import "./generalInput.css"

type GeneralInputProps = {
    title: string,
    children: ReactNode,
    className?: string
}

const GeneralInput: React.FC<GeneralInputProps> = (props) => {
    return (
        <div className='general-input'>
            <p className='general-input__header'>
                {props.title}
            </p>
            <div className={props.className ?? ""}>
                {props.children}
            </div>
        </div>
    )
}

export default GeneralInput;