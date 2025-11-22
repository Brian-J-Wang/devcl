import { InputWithMenu, Menu, MenuInput, MenuSlot, PrimaryInput } from "@brwwang/react-components";
import { MenuItem } from "@brwwang/react-components/dist/lib/InputWithMenu/Contexts/menuContext";
import { PostTask } from "../../../../../types/task";
import useTaskAttributeAPI from "src/Pages/Collection/Hooks/useTaskAttributeAPI";

import styles from "./AddItemInput.module.css";
import { useEffect, useMemo } from "react";
import AttributeBuilder from "./Attributes";

type AddItemInputProps = {
	onSubmit: (task: PostTask) => Promise<boolean>;
	attributeApi: ReturnType<typeof useTaskAttributeAPI>;
};

const AddItemInput: React.FC<AddItemInputProps> = ({ onSubmit, attributeApi }) => {
	const menuItems: MenuItem[] = useMemo(() => {
		if (attributeApi.isLoading) {
			return [];
		}

		return attributeApi.attributes.map((attribute) => {
			console.log(attribute);
			return {
				name: attribute.name,
				id: attribute._id,
				content: <AttributeBuilder attribute={attribute}></AttributeBuilder>
			};
		});
	}, [attributeApi.attributes, attributeApi.isLoading]);

	const handleSubmit = (blurb: string) => {
		return onSubmit({
			blurb: blurb
		}).then(() => {
			return Promise.resolve(true);
		});
	};

	useEffect(() => {
		console.log(attributeApi.attributes);
	}, [attributeApi.attributes, attributeApi.isLoading]);

	return (
		<InputWithMenu onSubmit={handleSubmit} menuItems={menuItems} className={styles.body}>
			<Menu className={styles.menu}>
				<MenuInput />
				<MenuSlot
					render={(item: MenuItem, isActive: boolean) => (
						<div className={`${styles.menuItem} ${isActive && styles.menuItemActive}`}>
							<p>{item.name}</p>
						</div>
					)}
				/>
			</Menu>
			<PrimaryInput className={styles.primaryInput} placeholder="Start typing or hit '/' to add more options" />
		</InputWithMenu>
	);
};

export default AddItemInput;
