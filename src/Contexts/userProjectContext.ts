import { createContext } from 'react';
import useUserProjectsAPI from '@hooks/useUserProjectsAPI';

const userProjectContext = createContext<ReturnType<typeof useUserProjectsAPI>>(
    {
        taskDocs: [],
        isLoading: false,
        getTaskDoc: () => undefined,
        addTaskDoc: () => undefined,
        deleteTaskDoc: () => undefined,
    }
);

export default userProjectContext;
