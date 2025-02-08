import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import icon from "../../assets/icon.svg";
import "./NavBar.css"
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import { useNavigate, Link, useLocation } from "react-router-dom";

export const NavBarContext = createContext<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    setProfileVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
    setVisible: () => {},
    setProfileVisible: () => {}
});

const NavBar: React.FC<{ children: ReactNode}> = (props) => {
    const location = useLocation();
    const [ visible, setVisible ] = useState<boolean>(true);
    const [ profileVisibile, setProfileVisible] = useState<boolean>(true);

    const modalContextConsumer = useContext(ModalContext);
    const navigate = useNavigate();

    //resets navbar on change, in case any page makes changes to it.
    useEffect(() => {
        setProfileVisible(true);

    }, [location.pathname])

    const openSignInModal = () => {
        modalContextConsumer.setModal(<SignIn/>)
    }

    const openSignUpModal = () => {
        modalContextConsumer.setModal(<SignUp/>)
    }

    return (
        <NavBarContext.Provider value={{
            setVisible: setVisible,
            setProfileVisible: setProfileVisible
        }}>
            <div className="nav" hidden={!visible}>
                <div className="nav__left">
                    <img src={icon} alt="[]" className="nav__icon" onClick={() => {navigate("/")}}/>
                    <Link to={"/"}>
                        Home
                    </Link>
                    <Link to={"/Collections"}>
                        Collections
                    </Link>
                </div>

                <div className="nav__right" hidden={!profileVisibile}>
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