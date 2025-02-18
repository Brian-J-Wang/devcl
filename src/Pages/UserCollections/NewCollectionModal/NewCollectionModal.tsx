import { useState } from "react";
import Input from "../../../Components/Input";
import "./NewCollectionModal.css"

interface NewCollectionModalProps {
    onSubmit: (name: string) => void
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
            <Input.Button onClick={handleSubmit}>Create</Input.Button>
        </div>
    )
}

export default NewCollectionModal;