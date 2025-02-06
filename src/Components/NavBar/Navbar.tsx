import { createContext, ReactNode, useContext, useState } from "react";
import { Link } from "react-router-dom";

import icon from "../../assets/icon.svg";
import "./NavBar.css"
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";

export const NavBarContext = createContext<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
    setVisible: () => {}
});

const NavBar: React.FC<{ children: ReactNode}> = (props) => {
    const [ visible, setVisible ] = useState<boolean>(true);

    const modalContextConsumer = useContext(ModalContext);

    const openSignInModal = () => {
        modalContextConsumer.setModal(<SignIn/>)
    }

    const openSignUpModal = () => {
        modalContextConsumer.setModal(<SignUp/>)
    }

    return (
        <NavBarContext.Provider value={{
            setVisible: setVisible
        }}>
            <div className="nav" hidden={!visible}>
                <img src={icon} alt="[]" className="nav__icon"/>

                <div className="nav__right">
                    <button onClick={openSignInModal} className="nav__tab">
                        Sign In
                    </button>
                    <button onClick={openSignUpModal} className="nav__tab">
                        Register
                    </button>
                    <div className="nav__profile"></div>
                </div>
            </div>
            {props.children}
        </NavBarContext.Provider>
    )
}

export default NavBar;