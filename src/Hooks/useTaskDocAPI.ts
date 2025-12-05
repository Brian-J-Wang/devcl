import TaskDocAPI from '@api/taskDocAPI';
import { TaskDoc } from '@app-types/project';
import { useEffect, useRef, useState } from 'react';

const useTaskDocAPI = (
    endpoint: string,
    taskDocId: string,
    authorization: string
) => {
    const api = useRef(new TaskDocAPI(endpoint, authorization));
    const [taskDoc, _setTaskDoc] = useState<TaskDoc>({
        name: '',
        id: '',
        owner: '',
        version: '',
    });
    const [isLoading, _setIsLoading] = useState(true);

    useEffect(() => {
        api.current.getTaskDoc(taskDocId).then((res) => {
            _setTaskDoc(res);
            _setIsLoading(false);
        });
    }, [taskDocId]);

    return {
        taskDoc,
        isLoading,
    };
};

export default useTaskDocAPI;
