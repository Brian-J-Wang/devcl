import { Attribute } from '@app-types/attributes';
import { useState } from 'react';

type MenuState = 'closed' | 'attribute' | 'attributeValue';

const useAttributeMenu = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [activeAttribute, setActiveAttribute] = useState<Attribute | null>(null);

    return {
        menuVisible,
        setMenuVisible,
        activeAttribute,
        setActiveAttribute,
    };
};

export default useAttributeMenu;
