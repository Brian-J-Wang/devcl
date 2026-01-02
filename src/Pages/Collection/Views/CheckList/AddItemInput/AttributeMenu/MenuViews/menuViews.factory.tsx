import { AttributeMenuState } from '../attributeMenu.hook';
import SelectAttribute from './SelectAttribute/SelectAttribute';
import SelectAttributeValue from './SelectAttributeValue/SelectAttributeValue';
import { MenuView } from './menuViews.types';
import ErrorView from './Error/Error';

const menuViews: Record<AttributeMenuState, React.FC<MenuView>> = {
    closed: ErrorView,
    selectAttribute: SelectAttribute,
    selectAttributeValue: SelectAttributeValue,
};

export default menuViews;
