import "./Home.css";
import iconWhite from "../../assets/icon-white.svg";
import NavBar from "../../Components/NavBar/Navbar";
import SignUp from "../SignUp/SignUp";
import { useState } from "react";
import SignIn from "../SignIn/SignIn";

const Home: React.FC = () => {
	const [currentModal, setCurrentModal] = useState<"signin" | "signup">("signup");
	return (
		<div className="home">
			<NavBar />
			<div className="home__splash">
				<div className="home__splash-container">
					<img src={iconWhite} alt="" className="home__splash-image" />
					<div className="home__splash-text">
						<h2 className="home__splash-h2">
							<span className="home__splash-span">DevCL</span> is here to help <br></br>get my sh*t in order
						</h2>
						<p className="home__splash-p">and I guess it can help you as well.</p>
					</div>
				</div>
				{currentModal == "signin" ? (
					<SignIn
						className="home__sign-up"
						onSignUnClick={() => {
							setCurrentModal("signup");
						}}></SignIn>
				) : (
					<SignUp
						className="home__sign-up"
						onSignInClick={() => {
							setCurrentModal("signin");
						}}
					/>
				)}
			</div>
			<footer className="home__footer">2024 Brian Wang</footer>
		</div>
	);
};

export default Home;
