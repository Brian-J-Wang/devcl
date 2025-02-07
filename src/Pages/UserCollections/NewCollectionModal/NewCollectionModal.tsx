import { useState } from "react";
import { TextButton } from "../../../Components/Button/Button";
import Input from "../../../Components/Input";
import "./NewCollectionModal.css"

interface NewCollectionModalProps {
    onSubmit: (name: string) => {
        
    }
}

const NewCollectionModal: React.FC<NewCollectionModalProps> = (props) => {
    const [ collectionName, setCollectionName ] = useState<string>("")

    const handleSubmit = () => {
        props.onSubmit(collectionName);
    }

    return (
        <div className="new-collection">
            <h2 className="new-collection__header">New Collection</h2>
            <div className="new-collection__inputs">
                <Input.Text type="text" name="Collection Name" stateHandler={setCollectionName}/>
            </div>
            <TextButton size="s" radiusStyle="s" style="primary" className="new-collection__submit" onClick={handleSubmit}>Create</TextButton>
        </div>
    )
}

export default NewCollectionModal;