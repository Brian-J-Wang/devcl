import { Link } from "react-router-dom"
import { TextButton } from "../../Components/Button/Button"
import { Container } from "../../Components/Container/Container"
import Input from "../../Components/Input"

import "./SignUp.css"

const SignUp: React.FC<{}> = () => {

    const handleSignUp = () => {

    }

    return (
        <div className="sign-up">
            <Container className="sign-up__modal">
                <h2 className="sign-up__header">Sign Up</h2>
                <Input.Text name="Email" type="email"></Input.Text>
                <Input.Text name="Username" type="text"></Input.Text>
                <Input.Text name="Password" type="password"></Input.Text>
                <TextButton size="s" radiusStyle="s" style="primary" className="sign-up__submit" onClick={handleSignUp}>Sign Up</TextButton>
                <p className="sign-up__switch"> Already have an account? <Link to="../signin" className="sign-up__switch-link">Sign In</Link></p>
            </Container> 
        </div>
    )
}

export default SignUp