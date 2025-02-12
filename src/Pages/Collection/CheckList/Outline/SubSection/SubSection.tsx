import { Children, cloneElement, ReactNode, useState } from "react";
import arrow from "../../../../../assets/Arrow.svg"
import "./SubSection.css"

interface SubSectionProps {
    name: string
    expanded: boolean;
    onPlusClick?: () => void; 
    children: ReactNode;
}

const SubSection: React.FC<SubSectionProps> = (props) => {
    const [ expanded, setExpanded ] = useState<boolean>(props.expanded);

    return (
        <div>
            <div className="subsection__header" onClick={() => setExpanded(!expanded)}>
                <img src={arrow} alt="" className={`subsection__drop-down ${expanded && "subsection__drop-down_expanded"}`}/>
                <div>{props.name}</div>
                <div className="subsection__add-more" hidden={!props.onPlusClick}  onClick={props.onPlusClick}>+</div>
            </div>
            <div className="subsection__content" hidden={!expanded}>
                <div className="subsection__list">
                    {
                        Children.map(props.children, ( child: ReactNode ) => 
                            //@ts-ignore
                            cloneElement(child, {
                                className: `${(child! as any).props.classNames} subsection__list-item`
                            })
                        )
                    }
                </div>
            </div>
        </div>
        
    )
}

export default SubSection;