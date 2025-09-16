import "./Home.css"
import "../Collection/CheckList/CheckList.css"
import iconWhite from "../../assets/icon-white.svg";
import { Container } from "../../Components/Container/Container";
import { FakeCLItemElement } from "../Collection/Task/task";
import NavBar from "../../Components/NavBar/Navbar";
import SignUp from "../SignUp/SignUp";
import { useState } from "react";
import SignIn from "../SignIn/SignIn";

const Home: React.FC<{}> = () => {
    const [currentModal, setCurrentModal] = useState<"signin" | "signup">("signup");
    return (
        <div className="home">
            <NavBar/>
            <div className="home__splash">
                <div className="home__splash-container">
                    <img src={iconWhite} alt="" className="home__splash-image"/>
                    <div className="home__splash-text">
                        <h2 className="home__splash-h2"><span className="home__splash-span">DevCL</span> is here to help <br></br>get my sh*t in order</h2>
                        <p className="home__splash-p">and I guess it can help you as well.</p>
                    </div>
                    <Container className="home__clutter">
                        <div className='check-list__header'>
                            <h2 id="check-list__name" className='check-list__name'> 
                                Project DevCL
                            </h2>
                        </div>
                        <FakeCLItemElement checked blurb="Stay on top of your project"/>
                        <FakeCLItemElement checked blurb="Collaborate with others"/>
                        <FakeCLItemElement checked blurb="Share your progress with your community"/>
                        <FakeCLItemElement checked={false} blurb="Actually finish a project"/>
                    </Container>
                </div>
                {
                    (currentModal == "signin")
                    ? <SignIn className="home__sign-up" onSignUnClick={() => { setCurrentModal("signup")}}></SignIn>
                    : <SignUp className="home__sign-up" onSignInClick={() => { setCurrentModal("signin") }}/>
                }
                
            </div>
            <footer className="home__footer">
                2024 Brian Wang
            </footer>
        </div>
    )
}

export default Home;