import { useContext, useState } from "react"

import { TextButton } from "../../Components/Button/Button"
import { Container } from "../../Components/Container/Container"
import { UserContext } from "../../Contexts/UserContext"
import { ModalContext } from "../../Contexts/Modal/ModalContext"
import Input from "../../Components/Input"
import SignIn from "../SignIn/SignIn"

import "./SignUp.css"
import icon from "../../assets/icon-white.svg"

const SignUp: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userContextConsumer = useContext(UserContext);
    const modalContextConsumer = useContext(ModalContext);

    const handleSignUp = (evt: React.MouseEvent) => {
        const element = (evt.target as HTMLButtonElement)
        element.classList.add("sign-up__submit__state_processing");
        userContextConsumer.api.addNewUser(email, username, password).then(() => {
            element.classList.remove("sign-up__submit__state_processing");
            element.classList.add("sign-up__submit__state_success");
            setTimeout(() => {
                modalContextConsumer.setModal(<SignIn/>);
            }, 1000)
        }).catch((err) => {
            console.error(err);
            (evt.target as HTMLButtonElement).classList.remove("sign-up__submit__state_processing");
        })
    }

    const handleModalChange = () => {
        modalContextConsumer.setModal(<SignIn/>);
    }

    return (
        <Container className="sign-up__modal">
            <div className="sign-up__splash">
                <img src={icon} alt="[]" className="sign-up"/>
            </div>
            <div className="sign-up__form">
                <h2 className="sign-up__header">Sign Up</h2>
                <div className="sign-up__inputs">
                    <Input.Text name="Email" type="email" stateHandler={setEmail}></Input.Text>
                    <Input.Text name="Username" type="text" stateHandler={setUsername}></Input.Text>
                    <Input.Text name="Password" type="password" stateHandler={setPassword}></Input.Text>
                </div>
                <div className="sign-up__controls">
                    <TextButton size="s" radiusStyle="s" style="primary" className="sign-up__submit" onClick={handleSignUp}>Sign Up</TextButton>
                    <p className="sign-up__switch"> Already have an account? 
                        <button className="sign-up__switch-link" onClick={handleModalChange}>Sign In</button>
                    </p>
                </div>
            </div>
        </Container> 
    )
}

export default SignUp