import { useContext} from "react";
import icon from "../../assets/icon.svg";
import "./NavBar.css"
import { ModalContext } from "../../Contexts/Modal/ModalContext";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import { useNavigate, Link} from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const NavBar: React.FC<{}> = () => {
    const userContext = useContext(UserContext);
    const modalContextConsumer = useContext(ModalContext);
    const navigate = useNavigate();

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
                <Link to={"/"} className="nav__tab">
                    Home
                </Link>
                <Link to={"/roadmap"} className="nav__tab">
                    Road Map
                </Link>
            </div>

            <div className="nav__right">
                {
                    userContext.isLoggedIn
                    ? (
                        <>
                            <Link to={"/collections"} className="nav__tab">
                                Dashboard
                            </Link>
                            <h2 className="nav__name">
                                {userContext.user.username}
                            </h2>
                            <div className="nav__profile">
                            </div>
                        </>
                    )
                    : (
                        <>
                            <button onClick={openSignInModal} className="nav__tab">
                                Sign In
                            </button>
                            <button onClick={openSignUpModal} className="nav__tab">
                                Register
                            </button>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}

export default NavBar;