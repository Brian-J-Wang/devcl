import './sidebar.css';
import { Container } from '../../../Components/Container/Container';

import collectionIcon from '../../../assets/sidebar-collection-icon.svg';
import personIcon from '../../../assets/person-icon.svg';
import patchIcon from '../../../assets/patch-icon.svg';
import { Project } from '@app-types/project';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import CollectionProfile from './CollectionProfile/CollectionProfile';

interface CollectionSidebarProps {
    project: Project;
}

const CollectionSidebar: React.FC<CollectionSidebarProps> = ({ project = { name: 'error' } }) => {
    const activeState = (state: NavLinkRenderProps) => {
        return 'cl-sidebar__item ' + (state.isActive ? 'cl-sidebar__item_selected' : '');
    };

    return (
        <Container className="cl-sidebar">
            <Container.Header>
                <CollectionProfile name={project.name} />
            </Container.Header>
            <Container.Body>
                <div className="cl-sidebar__menu">
                    <NavLink className={activeState} to="taskDoc">
                        <img src={collectionIcon} alt="missing" className="cl-sidebar__item-image" />
                        <h3 className="cl-sidebar__item-title">CheckList</h3>
                    </NavLink>
                    <NavLink className={activeState} to="collaborators">
                        <img src={personIcon} alt="missing" className="cl-sidebar__item-image" />
                        <h3 className="cl-sidebar__item-title">Collaborators</h3>
                    </NavLink>
                    <NavLink className={activeState} to="patches">
                        <img src={patchIcon} alt="missing" className="cl-sidebar__item-image" />
                        <h3 className="cl-sidebar__item-title">Patches</h3>
                    </NavLink>
                </div>
            </Container.Body>
        </Container>
    );
};

export default CollectionSidebar;
