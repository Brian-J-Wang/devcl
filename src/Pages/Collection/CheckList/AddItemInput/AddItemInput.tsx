import { AttributeMenu, PrimaryInput, RenderAttributes, RichInput, SecondaryInput, SubmissionItem } from "@brwwang/react-components"

import styles from "./AddItemInput.module.css";
import { AssigneeAttribute } from "./Attributes";
import { TagAttribute } from "./Attributes/TagAttribute/TagAttribute";
import { requireContext } from "../../../../utils/helpers";
import { ItemApiContext } from "../../Collection";
import { TaskRequest } from "../../../../utils/collectionAPI";
import AttributeTag from "./AttributeTag";

const AddItemInput: React.FC = () => {
    const { postItem } = requireContext(ItemApiContext);

    const handleSubmit = (submission: SubmissionItem) => {
        const request: TaskRequest = {
            blurb: submission.input,
            attributes: { ...submission.attributes }
        }

        console.log(request);
        
        return postItem(request).then(() => {
            return Promise.resolve();
        });
    }

    return (
        <RichInput onSubmit={handleSubmit} className={styles.main}>
            <AttributeMenu className={styles.menu}>
                <AssigneeAttribute/>
                <TagAttribute/>
            </AttributeMenu>
            <div className={styles.inputContainer}>
                <div className={styles.input}>
                    <SecondaryInput className={styles.secondaryInput}/>
                    <PrimaryInput placeholder="Begin typing or use '/' to add attributes." className={styles.primaryInput}/>
                </div>
                <div className={styles.attributeRenderer}>
                    <RenderAttributes render={(attribute, context) => (
                        <AttributeTag attribute={attribute}/>
                    )}/>
                </div>
            </div>
            
            
        </RichInput>
    )
}

export default AddItemInput;