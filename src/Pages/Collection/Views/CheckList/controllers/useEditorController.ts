import { Task } from '@app-types/task';
import { useState } from 'react';

export enum EditorState {
    Open,
    Close,
}

const useTaskEditor = () => {
    const [currentTask, _setCurrentTask] = useState<Task>({
        _id: '',
        blurb: 'placeholder',
        status: 'complete',
        attributes: [
            {
                id: '6917f0e68970b5d5e7585429',
                value: 'bug',
            },
        ],
        subTasks: [],
    });
    const [editorState, setEditorState] = useState<EditorState>(EditorState.Close);

    function setCurrentTask(task: Task) {
        _setCurrentTask(task);

        return {
            withOpenEditor() {
                setEditorState(EditorState.Open);
                return this;
            },
        };
    }

    return {
        currentTask,
        setCurrentTask,
        editorState,
        setEditorState,
    };
};

export default useTaskEditor;
