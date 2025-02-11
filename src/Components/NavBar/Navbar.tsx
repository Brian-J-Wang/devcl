import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import icon from "../../assets/icon.svg";
import "./NavBar.css"
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import { useNavigate, Link, useLocation } from "react-router-dom";

const NavBarContext = createContext<{
}>({});

export const NavBarContextProvider: React.FC<{ children: ReactNode}> = (props) => {
    return (
        <NavBarContext.Provider value={{}}>
            { props.children }
        </NavBarContext.Provider>
    )
}

const NavBar: React.FC<{}> = (props) => {
    const location = useLocation();
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
        <div className="nav">
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
    )
}

export default NavBar;