import { ReactNode } from "react";

export interface RichInputAttributeProps {
    children: ReactNode,
    name: string,
    menuDisplay: ReactNode,
}

const RichInputAttribute: React.FC<RichInputAttributeProps> = (props) => {
    return (
        <>
            {props.children}
        </>
    );
}

export default RichInputAttribute;