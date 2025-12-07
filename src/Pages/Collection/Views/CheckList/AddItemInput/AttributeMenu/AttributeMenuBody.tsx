import { requireContext } from '@utils/helpers';
import { PropsWithChildren } from 'react';
import { AttributeMenuContext } from './AttributeMenuContext';

const AttributeMenuBody: React.FC<PropsWithChildren> = ({ children }) => {
    const { setBody } = requireContext(AttributeMenuContext);
    setBody(children ?? null);
    return null;
};

export default AttributeMenuBody;
