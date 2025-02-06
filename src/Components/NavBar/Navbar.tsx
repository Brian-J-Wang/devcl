import { createContext, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import icon from "../../assets/icon.svg";
import "./NavBar.css"

const NavBarContext = createContext<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
    setVisible: () => {}
});

const NavBar: React.FC<{ children: ReactNode}> = (props) => {
    const [ visible, setVisible ] = useState<boolean>(true);

    return (
        <NavBarContext.Provider value={{
            setVisible: setVisible
        }}>
            <div className="nav" hidden={!visible}>
                <img src={icon} alt="[]" className="nav__icon"/>

                <div className="nav__right">
                    <Link className="nav__tab" to={"./signin"}>
                        Log In
                    </Link>
                    <Link className="nav__tab" to={"./signup"}>
                        Sign Up
                    </Link>
                    <div className="nav__profile"></div>
                </div>
            </div>
            {props.children}
        </NavBarContext.Provider>
    )
}

export default NavBar;