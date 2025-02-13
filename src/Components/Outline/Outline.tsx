import SubSection from "./SubSection/SubSection";

import "./Outline.css"
import { ReactElement } from "react";
import { Container } from "../Container/Container";

interface OutlineProps {
    children: ReactElement<typeof SubSection> | Array<ReactElement<typeof SubSection>>,
}

const Outline: React.FC<OutlineProps> = (props) => {   
    return (
        <Container className="outline">
            {props.children}
        </Container>
    )
}

export default Outline