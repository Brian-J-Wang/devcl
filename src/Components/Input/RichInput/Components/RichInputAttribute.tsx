import { ReactNode, useEffect } from "react";
import { requireContext } from "../../../../utils/helpers";
import { RichInputContext } from "../RichInput";

export interface RichInputAttributeProps {
    children: ReactNode,
    name: string,
    menuDisplay: ReactNode,
}

const RichInputAttribute: React.FC<RichInputAttributeProps> = (props) => {
    const richInputContext = requireContext(RichInputContext);

    useEffect(() => {
        richInputContext.addAttribute(props.name);

        return () => {
            richInputContext.removeAttribute(props.name);
        }
    }, []);
    
    if (richInputContext.menuState == "attributeMenu") {
        return props.menuDisplay;
    } else if (richInputContext.cursor?.name == props.name) {
        return props.children;
    } else {
        return <></>
    }
}

export default RichInputAttribute;