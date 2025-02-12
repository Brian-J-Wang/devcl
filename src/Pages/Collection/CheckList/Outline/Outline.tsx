import SubSection from "./SubSection/SubSection";

import "./Outline.css"
import { cloneElement, ReactElement } from "react";

interface OutlineProps {
    children: ReactElement<typeof SubSection> | Array<ReactElement<typeof SubSection>>,
}

const Outline: React.FC<OutlineProps> = (props) => {   
    return (
        <div className="outline">
            {props.children}
        </div>
    )
}

export default Outline