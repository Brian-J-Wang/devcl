import ProjectCard from '../UserCollections/ProjectCard/ProjectCard';

import add from '../../assets/add.svg';

import './UserProjects.css';
import { useContext } from 'react';
import { ModalContext } from '../../Contexts/Modal/ModalContext';
import NewCollectionModal from '../UserCollections/NewProjectModal/NewProjectModal';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';
import { Container } from '../../Components/Container/Container';
import UserProfileCard from '../UserCollections/UserProfileCard/UserProfileCard';
import userProjectContext from '@context/userProjectContext';

const UserProjects: React.FC = () => {
    const modalContextConsumer = useContext(ModalContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const { projects, isLoading, ...api } = useContext(userProjectContext);

    const handleCardAdd = () => {
        modalContextConsumer.setModal(
            <NewCollectionModal
                onSubmit={(name) => {
                    api.createNewProject({
                        name: name,
                    });
                }}
            />
        );
    };

    const handleUserLogOut = () => {
        userContext.logUserOut().then(() => {
            navigate('../');
        });
    };

    const deleteProject = (projectId: string) => {
        api.deleteProject(projectId);
    };

    return (
        <div className="user-collection">
            <BreadCrumb />
            <div className="user-collection__dashboard">
                <UserProfileCard
                    taskDocCount={0}
                    onLogOutClick={handleUserLogOut}
                />
                <Container className="user-collection__side-info"></Container>
            </div>
            <div className="user-collection__header">
                <h2 className="user-collection__header-title">Collections</h2>
                <button
                    className="user-collection__add-collection"
                    onClick={handleCardAdd}
                >
                    <img
                        src={add}
                        alt="+"
                        className="user-collection__add-image"
                    />
                </button>
            </div>
            <div className="user-collection__collection-list">
                {isLoading ? (
                    <></>
                ) : (
                    projects.map((project) => {
                        return (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                handleDelete={deleteProject}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default UserProjects;
