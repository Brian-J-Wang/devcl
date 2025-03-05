import { ReactNode, useEffect } from "react";
import { requireContext } from "../../../../utils/helpers";
import { RichInputContext } from "../RichInput";

interface RichInputAttributeProps {
    children: ReactNode,
    name: string,
    menuDisplay: ReactNode,
}

const RichInputAttribute: React.FC<RichInputAttributeProps> = (props) => {
    const richInputContext = requireContext(RichInputContext);

    useEffect(() => {
        richInputContext.registerAttribute({
            name: props.name,
            attributeDisplay: props.menuDisplay,
            children: props.children
        })
    }, []);

    return (<></>);
}