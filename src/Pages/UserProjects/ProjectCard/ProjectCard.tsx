import { Project } from '../../../types/project';

import './ProjectCard.css';

import styles from '../UserProjects.module.css';

type TaskDocProps = React.ComponentProps<'tr'> & {
    project: Project;
    onCardClicked: (projectId: string) => void;
};

const ProjectCard: React.FC<TaskDocProps> = ({
    project,
    onCardClicked,
    ...props
}) => {
    const handleCardClicked = () => {
        onCardClicked(project.id);
    };

    return (
        <tr {...props} className={styles.listRow} onClick={handleCardClicked}>
            <td>{project.name}</td>
            <td> Me </td>
            <td> 12/5/2025</td>
        </tr>
    );
};

export default ProjectCard;
