import { Attribute } from "@brwwang/react-components";

import sharedStyles from "../attributes.module.css";
import { requireContext } from "../../../../../../utils/helpers";
import { CollectionContext } from "../../../../Collection";

export const AssigneeAttribute = () => {
    const { collaborators } = requireContext(CollectionContext);

    const filterDisplay = (isSelected: boolean) => {
        return (
            <div className={isSelected ? sharedStyles.filterSelected : sharedStyles.filter }>
                Assignee
            </div>
        )
    }

    return (
        <Attribute name={"assignee"} filterDisplay={filterDisplay} className="">
            {
                collaborators.length == 0 ? (
                    <div>

                    </div>
                ) : 
                collaborators.map((collaborator) => {
                    return (
                        <div>
                            { collaborator.alias }
                        </div>
                    )
                })
            }
        </Attribute>
    )
}