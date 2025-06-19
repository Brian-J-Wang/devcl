import { Attribute, RichInputContext, SecondaryInput } from "@brwwang/react-components";

import sharedStyles from "../attributes.module.css";
import { requireContext } from "../../../../../../utils/helpers";
import { CollectionContext } from "../../../../Collection";

import styles from "./TagAttribute.module.css"

export const TagAttribute = () => {
    const { categories } = requireContext(CollectionContext);
    const { setAttributeValue } = requireContext(RichInputContext);

    const filterDisplay = (isSelected: boolean) => {
        return (
            <div className={isSelected ? sharedStyles.filterSelected : sharedStyles.filter }>
                Tag
            </div>
        )
    }

    const addTag = (name: string) => () => {
        setAttributeValue(name);
    }

    return (
        <Attribute name={"tag"} filterDisplay={filterDisplay} >
            <div className={styles.title}>
                User Tags
            </div>
            {
                categories.map((category) => (
                    <div className={styles.category} onClick={addTag(category.name)}>
                        {category.name}
                    </div>
                ))
            }
        </Attribute>
    )
}