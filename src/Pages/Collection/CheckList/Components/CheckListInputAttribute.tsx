import { AttributeComponentProps } from "../../../../Components/Input/RichInput/RichInput";
import crossSVG from "../../../../assets/cross.svg"

import "./CheckListInputAttribute.css"

const CheckListInputAttribute: React.FC<AttributeComponentProps> = (props) => {
    const handleClick = () => {
        props.onDeleteClick(props.name);
    }

    return (
        <div className="input-attribute">
            <span className="input-attribute__text">{props.name}: {props.value}</span>
            <img src={crossSVG} alt="x" onClick={handleClick} className="input-attribute__delete"/>
        </div>
    )
}

export default CheckListInputAttribute;