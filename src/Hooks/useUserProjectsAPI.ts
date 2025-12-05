import { useEffect, useRef, useState } from 'react';
import { NewProject, Project } from '../types/project';
import UserProjectsAPI from '../API/userProjectsAPI';

const useUserProjectsAPI = (endpoint: string, authorization: string) => {
    const { current: api } = useRef<UserProjectsAPI>(
        new UserProjectsAPI(endpoint, authorization)
    );
    const [projects, _setProjects] = useState<Project[]>([]);
    const [isLoading, _setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        api.getUserProjects().then((projects) => {
            _setProjects(projects);
            _setIsLoading(false);
        });
    }, []);

    const createNewProject = (projectInfo: Pick<Project, 'name'>) => {
        api.createNewProject(projectInfo).then((newProject) => {
            _setProjects([...projects, newProject]);
        });
    };

    const deleteProject = (projectId: string) => {
        api.deleteProject(projectId).then((deletedProject) => {
            _setProjects(
                projects.filter((project) => project.id != deletedProject.id)
            );
        });
    };

    return {
        projects,
        isLoading,
        createNewProject,
        deleteProject,
    };
};

export default useUserProjectsAPI;
