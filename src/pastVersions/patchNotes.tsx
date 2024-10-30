import { patchNotes } from "../CheckList/interfaces"
import './patchNotes.css'
import '../assets/DevCL.css'

interface PatchNote {
    patch : patchNotes
}

const PatchNotes : React.FC<PatchNote> = ({ patch }) => {

    const copyToClipboard = () => {
        let message = '';

        message += `version - ${patch.version}\r\r`;

        patch.content.forEach((item) => {
            message += `${item}\r`;
        })

        navigator.clipboard.writeText(message);
    }

    return (
        <div className="patch">
            <div className="devcl__container patch__toolbar">
                <button className="patch__toolbar-button" onClick={copyToClipboard}>C</button>
            </div>
            <div className="devcl__container patch__container">
                <h2 className="patch__header">{patch.version}</h2>
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