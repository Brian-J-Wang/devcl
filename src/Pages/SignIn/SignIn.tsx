import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"

import { TextButton } from "../../Components/Button/Button"
import { Container } from "../../Components/Container/Container"
import { UserContext } from "../../Contexts/UserContext"
import { ModalContext } from "../../Contexts/Modal/ModalContext"
import Input from "../../Components/Input"

import "./SignIn.css"
import icon from "../../assets/icon-white.svg"

interface SignInProps {
    noBanner?: boolean,
    className?: string,
    onSignUnClick?: () => void,
}

const SignIn: React.FC<SignInProps> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userContextConsumer = useContext(UserContext);
    const modalContextConsumer = useContext(ModalContext);
    const navigate = useNavigate();

    const handleSubmit = (evt: React.MouseEvent) => {
        const element = (evt.target as HTMLButtonElement);
        element.classList.add("sign-in__submit__state_processing");

        userContextConsumer.api.logInUser(email, password).then(() => {
            element.classList.remove("sign-up__submit__state_processing");
            element.classList.add("sign-up__submit__state_success");
            setTimeout(() => {
                navigate('../collections');
                modalContextConsumer.setModal(undefined);
            }, 1000)
        })

        setTimeout(() => {
            (evt.target as HTMLButtonElement).classList.remove("sign-in__submit__state_processing");
        }, 2000)
    }

    return (
        <Container className= {`${props.className} sign-in__modal`}>
            <div className="sign-in__splash">
                <img src={icon} alt="[]" className="sign-in__image"/>
            </div>
            <div className="sign-up__form">
                <h2 className="sign-in__header">Sign In</h2>
                <div className="sign-in__inputs">
                    <Input.Text name="Email" type="email" stateHandler={setEmail}></Input.Text>
                    <Input.Text name="Password" type="password" stateHandler={setPassword}></Input.Text>
                </div>
                <div className="sign-in__controls"> 
                    <TextButton size="s" radiusStyle="s" style="primary" className="sign-in__submit" onClick={handleSubmit}>Sign In</TextButton>
                    <p className="sign-in__switch"> Need an account? <button className="sign-in__switch-link" onClick={props.onSignUnClick}>Register</button>
                    </p>
                </div>
            </div>
        </Container> 
    )
}

export default SignIn