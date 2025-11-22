import { Container } from "../../../../Components/Container/Container";

import "./InvalidView.css";

const InvalidView: React.FC = () => {
	return (
		<Container className="invalid-view">
			<h3>I don't know how you got here</h3>
			<p>but you're not supposed to.</p>
		</Container>
	);
};

export default InvalidView;
