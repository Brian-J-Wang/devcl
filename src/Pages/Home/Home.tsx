import { Link } from "react-router-dom"

import "./Home.css"
import icon from "../../assets/icon.svg";
import iconWhite from "../../assets/icon-white.svg";
import { Container } from "../../Components/Container/Container";

const Home: React.FC<{}> = () => {
    return (
        <div className="home">
            <div className="home__splash">
                <div className="home__splash-container">
                    <img src={iconWhite} alt="" className="home__splash-image"/>
                    <div>
                        <h2 className="home__splash-h2"><span className="home__splash-span">DevCL</span> is here to help <br></br>get my sh*t in order</h2>
                        <p className="home__splash-p">and I guess it can help you as well.</p>
                    </div>
                </div>
            </div>
            <main className="home__main">
                <section className="home__section" id="what-is-devcl">
                    <div>
                        <h3>What is devcl?</h3>
                        <p>
                            devcl is a project management tool for developers. It also comes with  
                            support for community engagement.
                        </p>
                    </div>
                </section>
                <section className="home__section" id="features">
                    <h3>Features</h3>
                    <p>Devcl has a variety of features that developers can toggle. It's a mix and match sandbox for your needs.</p>

                    <div className="home__feature-list">
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                        <Container className="home__feature-card">

                        </Container>
                    </div>
                    
                </section>
            </main>
            <footer className="home__footer">

            </footer>
        </div>
    )
}

export default Home;