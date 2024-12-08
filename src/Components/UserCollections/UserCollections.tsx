import { Container } from "../../assets/shared/container/Container"
import CollectionCard from "./CollectionCard/CollectionCard"
import "./UserCollections.css"

export const UserCollection: React.FC = () => {
    return(
        <div className="uc">
            <Container className="uc__header">
                <h1 className="uc__header-title">Your Collections</h1>
            </Container>
            <div className="uc__cc-container">
                <CollectionCard/>
                <CollectionCard/>
                <CollectionCard/>
                <CollectionCard/>
            </div>
        </div>
    )
}