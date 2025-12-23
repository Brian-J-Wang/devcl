import { Container } from '@components/Container/Container';
import { ResizeableInput } from '@brwwang/react-components';
import BoundingBox from '@shared/boundingBox';
import { Task } from '@app-types/task';
import Icon from '@components/Icon';
import { CheckBoxState } from '@components/Icon/Checkbox/Checkbox';

import styles from './TaskEditor.module.css';
import { PatchNugget } from '@app-types/patchNuggets';
import { useEffect, useState } from 'react';
import useTaskEditor, { EditorState } from '../controllers/useEditorController';
import { generateMongoID } from '@utils/dummyGenerators';

type TaskEditorProps = {
    focusedTask: Task;
    onTaskSave: (patchNuggets: PatchNugget<Task>[]) => void;
    editorController: Omit<ReturnType<typeof useTaskEditor>, 'value'>;
};

const TaskEditor: React.FC<TaskEditorProps> = ({ editorController: editor }) => {
    const [task, setTask] = useState<Task>(editor.currentTask);

    useEffect(() => {
        setTask(editor.currentTask);
    }, [editor.currentTask]);

    const handleCheckBoxClick = () => {
        setTask((prev) => ({
            ...prev,
            status: prev.status == 'complete' ? 'incomplete' : 'complete',
        }));
    };

    const [addSubTaskInput, setAddSubTaskInput] = useState<string>('');
    const handleSubTaskInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = evt.target as HTMLInputElement;
        if (evt.key == 'Enter') {
            setTask((prev) => ({
                ...prev,
                subTasks: [
                    ...prev.subTasks,
                    {
                        id: generateMongoID(),
                        state: 'incomplete',
                        blurb: value,
                    },
                ],
            }));
            setAddSubTaskInput('');
        }
    };

    const handleSubTaskInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setAddSubTaskInput(evt.target.value);
    };

    return (
        <BoundingBox onOutOfBound={() => {}}>
            <Container className={`${styles.body} ${editor.editorState == EditorState.Close && styles.editorClosed}`}>
                <div className={styles.header}>
                    <div
                        className={styles.closeButton}
                        onClick={() => {
                            editor.setEditorState(EditorState.Close);
                        }}
                    >
                        <Icon.Cross />
                        Close
                    </div>
                </div>
                <div className={styles.header}>
                    <Icon.CheckBox
                        onClick={handleCheckBoxClick}
                        className={styles.checkBox}
                        state={task.status == 'complete' ? CheckBoxState.checked : CheckBoxState.unchecked}
                    />
                    <ResizeableInput
                        value={task.blurb}
                        className={styles.blurb}
                        onTextChange={(value) => {
                            setTask((prev) => ({
                                ...prev,
                                blurb: value,
                            }));
                        }}
                    />
                </div>

                <hr />
                <div>
                    <h3> Attributes </h3>
                </div>
                <h3> Subtasks </h3>
                {task.subTasks.map((subTask) => {
                    return (
                        <div className={styles.subTask} key={subTask.blurb}>
                            <Icon.CheckBox
                                className={styles.checkBox}
                                state={subTask.state == 'incomplete' ? CheckBoxState.unchecked : CheckBoxState.checked}
                                onClick={() => {
                                    setTask((prev) => ({
                                        ...prev,
                                        subTasks: prev.subTasks.map((prevSubTask) => {
                                            if (prevSubTask.id == subTask.id) {
                                                return {
                                                    ...subTask,
                                                    state: prevSubTask.state == 'complete' ? 'incomplete' : 'complete',
                                                };
                                            } else {
                                                return prevSubTask;
                                            }
                                        }),
                                    }));
                                }}
                            />
                            <span>{subTask.blurb}</span>
                        </div>
                    );
                })}
                <div className={`${styles.subTask} ${styles.addSubTask}`}>
                    <Icon.CheckBox className={styles.checkBox} state={CheckBoxState.unchecked} />
                    <input
                        type="text"
                        name="addSubTask"
                        id="addSubTask"
                        value={addSubTaskInput}
                        className={styles.addSubTask}
                        placeholder="Click here to add subTask"
                        onKeyDown={handleSubTaskInput}
                        onChange={handleSubTaskInputChange}
                    />
                </div>
            </Container>
        </BoundingBox>
    );
};

export default TaskEditor;
