import { Attribute, EnumAttribute } from '@app-types/attributes';
import EnumAttributeMenu from './Attributes/EnumAttributeMenu';

const AttributeBuilder = (attribute: Attribute, onValueSelect: (value: unknown) => void) => {
    if (attribute.type == 'enum') {
        return (
            <EnumAttributeMenu attribute={attribute as EnumAttribute} onValueSelect={onValueSelect}></EnumAttributeMenu>
        );
    } else if (attribute.type == 'range') {
        return <div></div>;
    }
};

export default AttributeBuilder;
