import { Container } from "../../../assets/shared/container/Container"
import generic from "../../../assets/images/light-green-generic.jpeg"

import "./CollectionCard.css"

const CollectionCard: React.FC = () => {
    return (
        <Container className="cc">
            <h2 className="cc__header">Collection Name</h2>
            <img src={generic} alt="background" />
        </Container>
    )
}

export default CollectionCard;