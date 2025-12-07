import { Attribute } from '@app-types/attributes';
import attributeStyles from './Attributes.module.css';

type EnumAttributeType = {
    attribute: Attribute & {
        validValues: string[];
    };
    onValueSelect: (value: string) => void;
};

const EnumAttributeMenu: React.FC<EnumAttributeType> = ({ attribute, onValueSelect }) => {
    const handleClick = (value: string) => () => {
        onValueSelect(value);
    };

    return (
        <>
            <div className={attributeStyles.header}>
                <button className={attributeStyles.goBackButton}>&lt; Go back</button>
            </div>
            {attribute.validValues.map((value) => {
                return (
                    <div className={attributeStyles.attributeListItem} onClick={handleClick(value)}>
                        {value}
                    </div>
                );
            })}
        </>
    );
};

export default EnumAttributeMenu;
