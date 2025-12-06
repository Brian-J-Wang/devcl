import ProjectCard from './ProjectCard/ProjectCard';

import add from '../../assets/add.svg';

import './UserProjects.css';
import { useContext } from 'react';
import { ModalContext } from '../../Contexts/Modal/ModalContext';
import NewCollectionModal from './NewProjectModal/NewProjectModal';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';
import userProjectContext from '@context/userProjectContext';

import { Container } from '@components/Container/Container';

import styles from './UserProjects.module.css';

const UserProjects: React.FC = () => {
    const modalContextConsumer = useContext(ModalContext);
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

    const handleCardClick = (projectId: string) => {
        navigate(`./${projectId}`);
    };

    return (
        <div className={styles.page}>
            <BreadCrumb />
            <div className={styles.header}>
                <h1 className={styles.title}>Projects</h1>
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
            <Container className={styles.projectList}>
                <table className={styles.table}>
                    <thead>
                        <tr
                            className={`${styles.listRow} ${styles.listRowHeader}`}
                        >
                            <th> Project name </th>
                            <th> Owner </th>
                            <th> Date Created </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onCardClicked={handleCardClick}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default UserProjects;
