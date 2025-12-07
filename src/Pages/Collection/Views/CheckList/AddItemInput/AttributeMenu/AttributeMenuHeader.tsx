import { requireContext } from '@utils/helpers';
import { AttributeMenuContext } from './AttributeMenuContext';
import { PropsWithChildren } from 'react';

const AttributeMenuHeader: React.FC<PropsWithChildren> = ({ children }) => {
    const { setHeader } = requireContext(AttributeMenuContext);
    setHeader(children ?? null);
    return null;
};

export default AttributeMenuHeader;
