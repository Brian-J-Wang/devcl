import { Link } from "react-router-dom"

import "./Home.css"

const Home: React.FC<{}> = () => {

    return (
        <div className="home">
            <Link className="home__tab" to={"./signin"}>
                Log In
            </Link>
            <Link className="home__tab" to={"./signup"}>
                Sign Up
            </Link>
        </div>
    )
}

export default Home;