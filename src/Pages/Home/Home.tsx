import { Link } from "react-router-dom"

import "./Home.css"

const Home: React.FC<{}> = () => {

    return (
        <div className="home">
            <Link to={"/collections"}>
                Go To Collections
            </Link>
        </div>
    )
}

export default Home