import { Container } from "../../../../Components/Container/Container";
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
            <Input.RadioGroup name="Patch Type" onChange={() => {}}>
                <Input.Radio name="release">
                    Release
                </Input.Radio>
                <Input.Radio name="major">
                    Major
                </Input.Radio>
                <Input.Radio name="minor">
                    Minor
                </Input.Radio>
            </Input.RadioGroup>
            <Input.Button style="primary">Create Patch</Input.Button>
        </Container>
    )
}

export default CreateNewPatchModal;