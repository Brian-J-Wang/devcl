import { Link } from "react-router-dom"
import { TextButton } from "../../Components/Button/Button"
import { Container } from "../../Components/Container/Container"
import Input from "../../Components/Input"

import "./SignIn.css"

const SignIn: React.FC<{}> = () => {
    return (
        <div className="sign-in">
            <Container className="sign-in__modal">
                <h2 className="sign-in__header">Sign In</h2>
                <Input.Text name="Username"></Input.Text>
                <Input.Text name="Password"></Input.Text>
                <TextButton size="s" radiusStyle="s" style="primary" className="sign-in__submit">Sign In</TextButton>
                <p className="sign-in__switch"> Need have an account? <Link to="../signin" className="sign-in__switch-link">Sign Up</Link></p>
            </Container> 
        </div>
    )
}

export default SignIn