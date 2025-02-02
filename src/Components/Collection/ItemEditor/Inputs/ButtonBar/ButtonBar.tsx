import { shared } from ".."

type ButtonBarProps = {
    type: "radio" | "checkbox",
    title: string,
    [key: string]: any
}

const ButtonBar: React.FC<ButtonBarProps> = (props) => {
    return (
        <div style={shared.container}>
            <div style={shared.title}>
                {props.title}
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

type ButtonBarChoiceProps = {
    [key: string]: any
}

export const ButtonBarChoice: React.FC<ButtonBarChoiceProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default ButtonBar