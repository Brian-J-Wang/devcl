import { createContext } from 'react';
import useAttributeMenu from './attributeMenu.hook';

const AttributeMenuContext = createContext<ReturnType<typeof useAttributeMenu>>(Object.assign([]));

export default AttributeMenuContext;
