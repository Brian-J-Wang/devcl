import { useState } from 'react';

type TaskAttribute = {
    id: string;
    value: unknown;
};

const useAttributeHook = () => {
    const [taskAttributes, _setTaskAttributes] = useState<TaskAttribute[]>([]);
    const setTaskAttribute = (id: string, value: unknown) => {
        if (taskAttributes.some((value) => value.id == id)) {
            _setTaskAttributes(
                taskAttributes.map((attribute) => {
                    return attribute.id == id
                        ? {
                              id: id,
                              value: value,
                          }
                        : attribute;
                })
            );
        } else {
            const newAttribute = {
                id: id,
                value: value,
            };
            _setTaskAttributes([newAttribute, ...taskAttributes]);
        }
    };

    const removeTaskAttribute = (id: string) => {
        _setTaskAttributes(
            taskAttributes.filter((attribute) => {
                return attribute.id != id;
            })
        );
    };

    const clearTaskAttributes = () => {
        _setTaskAttributes([]);
    };

    return {
        taskAttributes,
        setTaskAttribute,
        removeTaskAttribute,
        clearTaskAttributes,
    };
};

export default useAttributeHook;
