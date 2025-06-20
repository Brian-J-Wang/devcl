import { Attribute } from "@brwwang/react-components/dist/RichInput/Hooks";
import style from "./AttributeTag.module.css";
import { stringToColour } from "../../../../utils/stringToColor";

type AttributeTagProps = {
    attribute: Attribute,
    hidden?: boolean,
    className?: string,
    showKey?: boolean
}

const AttributeTag: React.FC<AttributeTagProps> = (props) => {
    return (
        <div style={{backgroundColor: `rgba(${stringToColour(props.attribute.key, 0.5)})`}} 
        className={`${props.className ?? ""} ${style.body}`} hidden={props.hidden ?? false}>
            {props.showKey && props.attribute.key + " -- "}  {props.attribute.value}
        </div>
    )
}

export default AttributeTag;