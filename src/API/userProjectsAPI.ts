import { NewProject, Project } from '../types/project';

class UserProjectAPI {
    endpoint: string;
    jwt: string;

    constructor(endpoint: string, jwt: string) {
        this.endpoint = endpoint;
        this.jwt = jwt;
    }

    getUserProjects(): Promise<Project[]> {
        return fetch(`${this.endpoint}/taskDocs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.jwt}`,
            },
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        });
    }

    createNewProject(projectInfo: NewProject): Promise<Project> {
        return fetch(`${this.endpoint}/taskDocs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.jwt}`,
            },
            body: JSON.stringify(projectInfo),
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        });
    }

    getProject(projectId: string) {
        return fetch(`${this.endpoint}/taskDocs/${projectId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    deleteProject(projectId: string): Promise<Project> {
        console.log(projectId, `Bearer ${this.jwt}`);

        return fetch(`${this.endpoint}/taskDocs/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.jwt}`,
            },
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject();
        });
    }
}

export default UserProjectAPI;
