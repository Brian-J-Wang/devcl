import { Attribute } from "@brwwang/react-components";

import sharedStyles from "../attributes.module.css";
import { requireContext } from "../../../../../../utils/helpers";
import { CollectionContext } from "../../../../Collection";

import styles from "../attributes.module.css"

export const TagAttribute = () => {
    const { categories } = requireContext(CollectionContext);

    const filterDisplay = (isSelected: boolean) => {
        return (
            <div className={isSelected ? sharedStyles.filterSelected : sharedStyles.filter }>
                Tag
            </div>
        )
    }

    return (
        <Attribute name={"tag"} filterDisplay={filterDisplay}>
            {
                categories.map((category) => (
                    <div>
                        {category.name}
                    </div>
                ))
            }
        </Attribute>
    )
}