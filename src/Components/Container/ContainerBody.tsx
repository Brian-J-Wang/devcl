import { requireContext } from '@utils/helpers';
import { PropsWithChildren } from 'react';
import { ContainerContext } from './ContainerContext';

const ContainerBody: React.FC<PropsWithChildren> = ({ children }) => {
    const { setBody } = requireContext(ContainerContext);
    setBody(children ?? null);
    return null;
};

export default ContainerBody;
