import "./Button.css"

export interface ButtonProps {
    className?: string,
    style?: "primary" | "positive" | "negative" | "neutral"
    onClick?: (evt: React.MouseEvent) => void
    children?: React.ReactNode
}

export const Button : React.FC<ButtonProps> = (props) => {
    return (
        <button className={`${props.className ?? ''} button button__${props.style ?? "primary"}`} onClick={(evt) => { props.onClick && props.onClick(evt)}}>
            {props.children ?? "Button"}
        </button>
    )
}

export default Button;