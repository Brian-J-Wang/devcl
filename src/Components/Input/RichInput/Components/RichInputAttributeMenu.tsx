import { ReactElement } from "react"
import { RichInputAttributeProps } from "./RichInputAttribute"

//responsible for showing the menu items and whatever other items are available
interface RichInputAttributeMenuProps {
    children: ReactElement<RichInputAttributeProps> | Array<ReactElement<RichInputAttributeProps>>,
    className: string
}

const RichInputAttributeMenu: React.FC<RichInputAttributeMenuProps> = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default RichInputAttributeMenu;