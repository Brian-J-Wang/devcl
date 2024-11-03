import copyIcon from "../assets/copy.svg"
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
            <div className="devcl__container patch__container">
                <div className="patch__header">
                    <h2 className="patch__version">{patch.version}</h2>
                    <button className="patch__button devcl__icon-button" onClick={copyToClipboard}>
                        <img src={copyIcon} alt="copy" className="patch__button-image"/>
                    </button>
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