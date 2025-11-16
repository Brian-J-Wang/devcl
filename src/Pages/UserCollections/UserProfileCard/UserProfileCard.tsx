import { useContext } from "react";
import { Container } from "../../../Components/Container/Container";
import exit from "../../../assets/exit.svg";
import { UserContext } from "../../../Contexts/UserContext";

type UserProfileCardProps = {
	taskDocCount: number;
	onLogOutClick: () => void;
};

const UserProfileCard: React.FC<UserProfileCardProps> = (props) => {
	const { user } = useContext(UserContext);

	return (
		<Container className="user-collection__profile">
			<div className="user-collection__profile-image"></div>
			<div className="user-collection__info">
				<p className="user-collection__profile-name">{user.username}</p>
				<p className="user-collection__profile-info">{props.taskDocCount} collections</p>
			</div>
			<button className="user-collection__logout" onClick={props.onLogOutClick}>
				<img src={exit} alt="X" className="user-collection__logout-image" />
			</button>
		</Container>
	);
};

export default UserProfileCard;
