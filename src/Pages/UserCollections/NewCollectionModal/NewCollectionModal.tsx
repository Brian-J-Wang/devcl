import { TextButton } from "../../../Components/Button/Button";
import Input from "../../../Components/Input";
import "./NewCollectionModal.css"

interface NewCollectionModalProps {
    onSubmit: () => {
        
    }
}

const NewCollectionModal: React.FC<NewCollectionModalProps> = (props) => {
    return (
        <div className="new-collection">
            <h2 className="new-collection__header">New Collection</h2>
            <div className="new-collection__inputs">
                <Input.Text type="text" name="Collection Name"/>
            </div>
            <TextButton size="s" radiusStyle="s" style="primary" className="new-collection__submit" onClick={props.onSubmit}>Create</TextButton>
        </div>
    )
}

export default NewCollectionModal;