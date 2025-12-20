import { Container } from "@components/Container/Container";
import SelectAttributeView from "./MenuViews/SelectAttributeView/SelectAttributeView";
import SelectAttributeValueView from "./MenuViews/SelectAttributeValueView/SelectAttributeValueView";

import styles from "./AttributeMenu.module.css";
import { requireContext } from "@utils/helpers";
import AttributeMenuContext from "./AttributeMenuContext";
import { useLayoutEffect, useState } from "react";

const AttributeMenu: React.FC = () => {
	const attributeMenu = requireContext(AttributeMenuContext);
	const [menuStyles, setMenuStyles] = useState<string[]>([]);

	useLayoutEffect(() => {
		const styleArray = [styles.container];

		if (!attributeMenu.menuVisible) {
			styleArray.push(styles.containerHidden);
			setMenuStyles(styleArray);
			return;
		}

		const viewport = document.querySelector("#checklistViewport");
		const parent = viewport!.querySelector("#addItemRow");
		const menu = viewport!.querySelector("#menu");
		if (!parent || !menu || !viewport) {
			setMenuStyles(styleArray);
			return;
		}

		const { bottom: viewportBottom } = viewport.getBoundingClientRect();
		const { bottom: parentBottom } = parent.getBoundingClientRect();
		const { height: menuHeight } = menu.getBoundingClientRect();

		if (parentBottom + menuHeight > viewportBottom) {
			styleArray.push(styles.containerVisibleAlternative);
		} else {
			styleArray.push(styles.containerVisible);
		}

		setMenuStyles(styleArray);
	}, [attributeMenu.activeAttribute, attributeMenu.menuVisible]);

	return (
		<Container className={menuStyles.join(" ")} id="menu">
			{attributeMenu.activeAttribute != null ? <SelectAttributeValueView /> : <SelectAttributeView />}
		</Container>
	);
};

export default AttributeMenu;
