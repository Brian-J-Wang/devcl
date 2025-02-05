import { Link, useNavigate } from "react-router-dom"
import { TextButton } from "../../Components/Button/Button"
import { Container } from "../../Components/Container/Container"
import Input from "../../Components/Input"

import "./SignUp.css"
import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"

const SignUp: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userContextConsumer = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = (evt: React.MouseEvent) => {
        const element = (evt.target as HTMLButtonElement)
        element.classList.add("sign-up__submit__state_processing");
        userContextConsumer.api.addNewUser(email, username, password).then(() => {
            element.classList.remove("sign-up__submit__state_processing");
            element.classList.add("sign-up__submit__state_success");
            setTimeout(() => {
                navigate('../signin');
            }, 1000)
        }).catch((err) => {
            console.error(err);
            (evt.target as HTMLButtonElement).classList.remove("sign-up__submit__state_processing");
        })
    }

    return (
        <div className="sign-up">
            <Container className="sign-up__modal">
                <h2 className="sign-up__header">Sign Up</h2>
                <Input.Text name="Email" type="email" stateHandler={setEmail}></Input.Text>
                <Input.Text name="Username" type="text" stateHandler={setUsername}></Input.Text>
                <Input.Text name="Password" type="password" stateHandler={setPassword}></Input.Text>
                <TextButton size="s" radiusStyle="s" style="primary" className="sign-up__submit" onClick={handleSignUp}>Sign Up</TextButton>
                <p className="sign-up__switch"> Already have an account? <Link to="../signin" className="sign-up__switch-link">Sign In</Link></p>
            </Container> 
        </div>
    )
}

export default SignUp