import { ReactNode, useContext } from "react"
import { Container } from "../../assets/shared/container/Container"
import "./Popup.css"
import PopupContext from "./PopupContext"

interface popup {
    activePopup?: ReactNode
}

export const Popup: React.FC<popup> = ({ activePopup }) => {
    const popupContext = useContext(PopupContext);

    const overlayExit = (evt : any) => {
        if (evt.target.id === "overlay") {
            popupContext.openPopup(null);
        }
    }

    return (
        <div id="overlay" className={`popup ${activePopup == null? 'popup__hidden': ''}`} onClick={overlayExit}>
            <Container className="popup__container">
                {activePopup ?? (<></>)}
            </Container>
        </div>
    )
}