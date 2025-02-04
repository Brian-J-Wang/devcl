import { createContext, ReactNode, useState } from "react"
import "./Popup.css"
import { Container } from "../Container/Container"

interface PopupContextProps {
    children: ReactNode
}

interface PopupContextValues {
    openPopup: (element: ReactNode) => void,
    closePopup: () => void
} 

export const popupContext = createContext<PopupContextValues>({
    openPopup: function (): void {
        throw new Error("Function not implemented.");
    },
    closePopup: function (): void {
        throw new Error("Function not implemented.");
    }
})

const PopupContext: React.FC<PopupContextProps> = ({children}) => {
    const [popup, setPopup] = useState<ReactNode | null>(null);

    const onOverlayClick = (evt: any) => {
        if (evt.target.id == "overlay") {
            closePopup();
        }
    }

    const openPopup = (element: ReactNode) => {
        console.log(element)
        setPopup(element);
    }

    const closePopup = () => {
        setPopup(null);
    }

    return (
        <popupContext.Provider value={{openPopup, closePopup}}>
            {children}
            {
                popup &&
                (
                    <div className="popup" id="overlay" onClick={onOverlayClick}>
                        <Container className="popup__container">
                            {popup}
                        </Container>
                    </div>
                )
            }
        </popupContext.Provider>
    )
}

export default PopupContext;