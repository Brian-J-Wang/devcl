import styles from '../MenuViews.module.css';
import List from '@components/List/List';
import AttributeMenuContext from '../../attributeMenu.context';
import TaskAttributeAPIContext from '@context/taskAttributeAPIContext';
import { requireContext } from '@utils/helpers';
import useListController from '@components/List/List.controller';

type TypeAttributeValueProps = {
    controller: ReturnType<typeof useListController>;
};

const TypeAttributeValue: React.FC<TypeAttributeValueProps> = (props) => {
    const { attributes } = requireContext(TaskAttributeAPIContext);
    const attributeMenu = requireContext(AttributeMenuContext);
    return <List controller={props.controller} items={} />;
};

export default TypeAttributeValue;
