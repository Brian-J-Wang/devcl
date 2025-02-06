import { Link } from "react-router-dom"

import "./Home.css"
import icon from "../../assets/icon.svg";
import iconWhite from "../../assets/icon-white.svg";

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

            </main>
            
            <footer className="home__footer">

            </footer>
        </div>
    )
}

export default Home;