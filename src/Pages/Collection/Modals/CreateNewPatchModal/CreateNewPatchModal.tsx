import { Container } from "../../../../Components/Container/Container"
import { TextButton } from "../../../../Components/Button/Button";
import Input from "../../../../Components/Input";

import "./CreateNewPatchModal.css"
import { useState } from "react";

interface CreateNewPatchModalProps {
    version: string
}

const CreateNewPatchModal: React.FC<CreateNewPatchModalProps> = (props) => {
    const [patchName, setPatchName] = useState<string>("");

    return (
        <Container className="new-patch">
            <h2>Patch - {props.version}</h2>
            <Input.Text name="Name" initialValue="" type="text" stateHandler={setPatchName}/>
            <Input.RadioGroup name="Patch Type">
                <Input.Radio>
                    Release
                </Input.Radio>
                <Input.Radio>
                    Major
                </Input.Radio>
                <Input.Radio>
                    Minor
                </Input.Radio>
            </Input.RadioGroup>
            <TextButton size="s" radiusStyle="s" style="primary"> Create New Patch</TextButton>
        </Container>
    )
}

export default CreateNewPatchModal;