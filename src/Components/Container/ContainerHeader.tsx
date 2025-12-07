import { requireContext } from '@utils/helpers';
import { PropsWithChildren } from 'react';
import { ContainerContext } from './ContainerContext';

const ContainerHeader: React.FC<PropsWithChildren> = ({ children }) => {
    const { setHeader } = requireContext(ContainerContext);
    setHeader(children ?? null);
    return null;
};

export default ContainerHeader;
