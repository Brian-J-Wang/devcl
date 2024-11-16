import './Button.css'

interface Button {
    size?: "s" | "m" | "l",
    radiusStyle?: "s" | "m" | "l",
    style?: "primary" | "positive" | "negative" | "neutral"
    shape?: "circle" | "rectangle" | "square",
    className?: string,
    onClick?: () => void,
}

interface ITextButton extends Button {
    children?: React.ReactNode
}

export const TextButton : React.FC<ITextButton> = (props) => {
    return (
        <button className={`button ${StyleFactory(props)} text-button ${props.className ?? ''}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

interface IIconButton extends Button {
    icon: string
}

export const IconButton : React.FC<IIconButton> = (props) => {
    return (
        <button className={`button ${StyleFactory(props)} icon-button ${props.className ?? ''}`} onClick={props.onClick}>
            <img src={props.icon} alt={props.icon}/>
        </button>
    )
}

function StyleFactory(Input: Button): string {
    let output = '';

    //size
    if (Input.size) {
        output += `button__size_${Input.size} `
    }

    //radius
    if (Input.radiusStyle) {
        output += `button__r-style_${Input.radiusStyle} `
    }

    //style
    if (Input.style) {
        output += `button__style_${Input.style} `
    }

    //shape
    if (Input.shape) {

        if (Input.size) {
            output += `button__shape_${Input.shape}_${Input.size} `
        } else {
            output += `button__shape_${Input.shape} `
        }
        
    }


    return output;
}