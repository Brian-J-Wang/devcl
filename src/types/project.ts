export type Project = {
    id: string;
    name: string;
    owner: string;
    version: string;
};

export type NewProject = Pick<Project, 'name'>;
