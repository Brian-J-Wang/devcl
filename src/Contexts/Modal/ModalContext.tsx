import { createContext, ReactNode, useEffect, useRef, useState } from "react";

import "./modal.css"

export const ModalContext = createContext<{
    setModal: React.Dispatch<React.SetStateAction<ReactNode>>
}>({
    setModal: () => {}
})

const ModalContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [modal, setModal] = useState<ReactNode>(undefined);
    const app = useRef<HTMLDivElement>();

    useEffect(() => {
        app.current = document.querySelector('#app') as HTMLDivElement;
    }, [])

    useEffect(() => {
        if (!app.current) {
            return;
        }

        if (modal) {
            app.current.classList.add("modal__app-blur");
        } else {
            app.current.classList.remove("modal__app-blur");
        }
    }, [ modal ])

    const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((evt.target as HTMLElement).classList.contains("modal__overlay")) {
            setModal(undefined);
        }
    }

    return (
        <ModalContext.Provider value={{
            setModal: setModal
        }}>
            {props.children}
            <div className={`modal__overlay ${!modal && "modal__overlay_hidden"}`} onClick={handleOverlayClick}>
                {modal}
            </div>
        </ModalContext.Provider>
    )
}

export default ModalContextProvider