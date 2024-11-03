import './Button.css'

interface Button {
    size?: "s" | "m" | "l",
    className?: string,
    onClick?: () => void,
}

interface ITextButton extends Button {
    children?: React.ReactNode
}

export const TextButton : React.FC<ITextButton> = (props) => {
    return (
        <button className={`button button__size_${props.size ?? "s"} text-button ${props.className ?? ''}`} onClick={props.onClick}>
            <p>{props.children}</p>
        </button>
    )
}

interface IIconButton extends Button {
    icon: string
}

export const IconButton : React.FC<IIconButton> = (props) => {
    return (
        <button className={`button button__size_${props.size ?? "s"} icon-button ${props.className ?? ''}`} onClick={props.onClick}>
            <img src={props.icon} alt={props.icon}/>
        </button>
    )
}