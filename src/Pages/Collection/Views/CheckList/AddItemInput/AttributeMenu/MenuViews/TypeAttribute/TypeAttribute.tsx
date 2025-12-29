import styles from '../MenuViews.module.css';

import { requireContext } from '@utils/helpers';
import List from '@components/List/List';
import ListItem from '@components/List/ListItem';
import TaskAttributeAPIContext from '@context/taskAttributeAPIContext';
import useListController from '@components/List/List.controller';
import AttributeMenuContext from '../../attributeMenu.context';
import { Attribute } from '@features/Attributes/attribute.class';

type TypeAttributeProps = {
    controller: ReturnType<typeof useListController>;
};

const TypeAttribute: React.FC<TypeAttributeProps> = (props) => {
    const { attributes } = requireContext(TaskAttributeAPIContext);
    const attributeMenu = requireContext(AttributeMenuContext);

    const onListItemClick = (attribute: Attribute) => () => {
        attributeMenu.setActiveAttribute(attribute);
    };

    return (
        <List
            controller={props.controller}
            items={attributes}
            render={(item, isActive) => {
                return (
                    <ListItem
                        key={item.id}
                        className={isActive ? styles.listItemActive : undefined}
                        onClick={onListItemClick(item)}
                    >
                        {item.name}
                    </ListItem>
                );
            }}
        />
    );
};

export default TypeAttribute;
