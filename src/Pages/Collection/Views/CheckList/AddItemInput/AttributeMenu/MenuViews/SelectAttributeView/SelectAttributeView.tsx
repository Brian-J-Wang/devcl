import { Container } from "@components/Container/Container";
import TaskAttributeAPIContext from "@context/taskAttributeAPIContext";
import { RefObject, useContext, useEffect, useRef } from "react";

import shared from "@styles/shared.module.css";
import styles from "../MenuViews.module.css";
import { Attribute } from "src/Features/Attributes/attribute.class";
import AttributeMenuContext from "../../AttributeMenuContext";
import { requireContext } from "@utils/helpers";

const SelectAttributeView: React.FC = () => {
	const attributeMenu = requireContext(AttributeMenuContext);
	const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
	const { attributes } = useContext(TaskAttributeAPIContext);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		});
	}, []);

	const handleClick = (attribute: Attribute) => () => {
		attributeMenu.setActiveAttribute(attribute);
	};

	return (
		<>
			<Container.Header>
				<input
					type="text"
					placeholder="Filter attributes"
					id="attributeFilter"
					ref={inputRef}
					className={styles.filterInput}
				/>
			</Container.Header>
			<Container.Body>
				{attributes.map((attribute) => {
					return (
						<div className={shared.listItem} onClick={handleClick(attribute)}>
							{attribute.name}
						</div>
					);
				})}
			</Container.Body>
		</>
	);
};

export default SelectAttributeView;
