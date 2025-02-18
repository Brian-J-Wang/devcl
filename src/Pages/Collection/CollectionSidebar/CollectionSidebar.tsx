import "./CollectionSidebar.css"
import { Container } from "../../../Components/Container/Container"
import { useContext } from "react"
import { CollectionContext } from "../Collection"

import collectionIcon from "../../../assets/sidebar-collection-icon.svg"
import personIcon from "../../../assets/person-icon.svg"
import patchIcon from "../../../assets/patch-icon.svg"

import RadioGroup from "../../../Components/Input/Radio/RadioGroup"
import Radio from "../../../Components/Input/Radio/Radio"

interface CollectionSidebarProps {
    setActivePage: React.Dispatch<React.SetStateAction<string>>
}

const CollectionSidebar: React.FC<CollectionSidebarProps> = (props) => {
    const collectionContext = useContext(CollectionContext);

    const generatePlaceHolder = () => {
        const names = collectionContext.name.split(" ").map((word) => {
            return word.charAt(0);
        });

        return `${names[0] ?? ""}${names[1] ?? ""}`;
    }

    return (
        <Container className="cl-sidebar">
            <div className="cl-sidebar__profile">
                <div className="cl-sidebar__profile-left">
                    <p>{ generatePlaceHolder() }</p>
                </div>
                <div className="cl-sidebar__profile-right">
                    <h1>{collectionContext.name}</h1>
                    <small>owner name</small>
                </div>
            </div>
            <RadioGroup className="cl-sidebar__menu" styles={{
                selected: "cl-sidebar__item_selected"
            }} onChange={(value) => { props.setActivePage(value); }}>
                <Radio name="checklist" className="cl-sidebar__item" initial>
                    <img src={collectionIcon} alt="missing" className="cl-sidebar__item-image"/>
                    <h2 className="cl-sidebar__item-title">CheckList</h2>
                </Radio>
                <Radio name="collaborators" className="cl-sidebar__item">
                    <img src={personIcon} alt="missing" className="cl-sidebar__item-image"/>
                    <h2 className="cl-sidebar__item-title">Collaborators</h2>
                </Radio>
                <Radio name="patches" className="cl-sidebar__item">
                    <img src={patchIcon} alt="missing" className="cl-sidebar__item-image"/>
                    <h2 className="cl-sidebar__item-title">Patches</h2>
                </Radio>
            </RadioGroup>
        </Container>
    )
}

export default CollectionSidebar