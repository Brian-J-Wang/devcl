import { useEffect } from "react"
import { Container } from "../../Components/Container/Container"

import "./NotFound.css"
import { Link, useNavigate } from "react-router-dom";

const NotFound: React.FC<{}> = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const id = setTimeout(() => {
            navigate("/");
        }, 2000)

        return () => {
            clearInterval(id)
        }
    }, []);

    return (
        <div className="not-found">
            <Container className="not-found__container">
                <div className="not-found__header">
                    <h1 className="not-found__header-text">404</h1>
                    <p className="not-found__header-p">Page not found</p>
                </div>
                <div className="not-found__body">
                    <h2>
                        How did you get here?
                    </h2>
                    <div className="loading">
                        <div className="dot" id="dot-1"></div>
                        <div className="dot" id="dot-2"></div>
                        <div className="dot" id="dot-3"></div>
                    </div>
                    <p>Redirecting...</p>
                    <small>If this doesn't automatically move you back, click <Link to={"/"}>here</Link></small>
                </div>
            </Container>
        </div>
        
    )
}

export default NotFound;