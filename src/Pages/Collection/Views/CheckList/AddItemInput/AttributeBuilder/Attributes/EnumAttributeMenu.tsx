import { Attribute } from "@app-types/attributes";
import { useContext, useState } from "react";

import styles from "./EnumAttributeMenu.module.css";
import InputAttributeContext from "../../InputAttributeContext";

type EnumAttributeType = {
	attribute: Attribute & {
		validValues: string[];
	};
};

const EnumAttributeMenu: React.FC<EnumAttributeType> = ({ attribute }) => {
	const { setTaskAttribute } = useContext(InputAttributeContext);
	const [filter, setFilter] = useState<string>("");

	const handleClick = (value: string) => () => {
		setTaskAttribute(attribute.id, value);
	};

	return (
		<>
			<input
				type="text"
				name="enumInput"
				id="enumInput"
				value={filter}
				onChange={(evt) => setFilter(evt.target.value)}
			/>
			{attribute.validValues
				.filter((value) => {
					return value.substring(0, filter.length) == filter;
				})
				.map((value) => {
					return (
						<div className={styles.menuItem} onClick={handleClick(value)}>
							{value}
						</div>
					);
				})}
		</>
	);
};

export default EnumAttributeMenu;
