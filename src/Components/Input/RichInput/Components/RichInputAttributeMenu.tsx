import { ReactElement, useEffect } from "react"
import { RichInputAttributeProps } from "./RichInputAttribute"

interface RichInputAttributeMenuProps {
    children: ReactElement<RichInputAttributeProps> | Array<ReactElement<RichInputAttributeProps>>,
    className: string
}

const RichInputAttributeMenu: React.FC<RichInputAttributeMenuProps> = (props) => {

    useEffect(() => {
        
    }, []);

    return (<></>)
}