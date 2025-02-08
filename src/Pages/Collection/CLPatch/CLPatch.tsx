import copyIcon from "../../../assets/copy.svg"
import undoIcon from "../../../assets/undo.svg"
//@ts-ignore
import { IconButton } from "../../../Components/Button/Button"
import './CLPatch.css'
import '../../../assets/DevCL.css'
import { Container } from "../../../Components/Container/Container"
import { CLPatch } from "../interfaces"

interface PatchNote {
    patch: CLPatch,
    isLatest: boolean
}

const CLPatchElement : React.FC<PatchNote> = ({ patch, isLatest }) => {

    const copyToClipboard = () => {
        let message = '';

        message += `version - ${patch.version}\r\r`;

        patch.content.forEach((item) => {
            message += `${item}\r`;
        })

        navigator.clipboard.writeText(message);
    }

    const undoPatch = () => {
        console.error("Not Implemented");
    }

    return (
        <Container className="patch">
            <div className="patch__header">
                <h2 className="patch__version">{patch.version}</h2>
                <div className="patch__tool-bar">
                    {isLatest ? <IconButton shape="circle" size="m" onClick={undoPatch} icon={undoIcon}/> : <></>}
                    <IconButton shape="circle" size="m" className="patch__button" onClick={copyToClipboard} icon={copyIcon}/>
                </div>
            </div>
            <div className="patch__notes">
                {
                    patch.content.map((item) => {
                        return (<p className="patch__update" key={item}>{item}</p>)
                    })
                }
            </div>
        </Container>
    )
}

export default CLPatchElement;