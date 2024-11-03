import copyIcon from "../assets/copy.svg"
import undoIcon from "../assets/undo.svg"
import { patchNotes } from "../CheckList/interfaces"
import { IconButton } from "../assets/shared/button/button"
import './patchNotes.css'
import '../assets/DevCL.css'

interface PatchNote {
    patch: patchNotes,
    isLatest: boolean
}

const PatchNotes : React.FC<PatchNote> = ({ patch, isLatest }) => {

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
        <div className="patch">
            <div className="devcl__container patch__container">
                <div className="patch__header">
                    <h2 className="patch__version">{patch.version}</h2>
                    <div className="patch__tool-bar">
                        {isLatest ? <IconButton className="patch__button" onClick={undoPatch} icon={undoIcon}/> : <></>}
                        <IconButton className="patch__button" onClick={copyToClipboard} icon={copyIcon}/>
                    </div>
                </div>
                <div className="patch__notes">
                    {
                        patch.content.map((item) => {
                            return (<p className="patch__update" key={item}>{item}</p>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PatchNotes;