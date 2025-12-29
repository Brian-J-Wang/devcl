import { Container } from '@components/Container/Container';
import React from 'react';
import AttributeFactory from '../../AttributeFactory/AttributeFactory';
import AttributeMenuContext from '../../attributeMenu.context';
import { requireContext } from '@utils/helpers';
import { Attribute, EnumAttribute } from '@features/Attributes/attribute.class';

const SelectAttributeValue: React.FC = () => {
    const attributeMenu = requireContext(AttributeMenuContext);

    const activeAttribute: Attribute =
        attributeMenu.activeAttribute ??
        new EnumAttribute({
            id: '000',
            isUserDefined: false,
            primaryColor: '#f00',
            name: 'Error',
            type: 'enum',
            validValues: [],
        });

    return (
        <>
            <Container.Header>
                <h2>{activeAttribute.name}</h2>
            </Container.Header>
            <Container.Body>
                {AttributeFactory(activeAttribute, (value) => {
                    attributeMenu.taskAttributes.set(attributeMenu.activeAttribute!.id, value);
                })}
            </Container.Body>
        </>
    );
};

export default SelectAttributeValue;
