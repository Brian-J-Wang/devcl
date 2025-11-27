import { InputWithMenu, Menu, MenuInput, MenuSlot, PrimaryInput } from "@brwwang/react-components";
import { MenuItem } from "@brwwang/react-components/dist/lib/InputWithMenu/Contexts/menuContext";
import { PostTask } from "../../../../../types/task";
import useTaskAttributeAPI from "src/Hooks/useTaskAttributeAPI";

import styles from "./AddItemInput.module.css";
import { useMemo } from "react";
import AttributeBuilder from "./AttributeBuilder";
import InputAttributeContext from "./InputAttributeContext";
import useAttributeHook from "./useAttributeHook";

type AddItemInputProps = {
	onSubmit: (task: PostTask) => Promise<boolean>;
	attributeApi: ReturnType<typeof useTaskAttributeAPI>;
};

const AddItemInput: React.FC<AddItemInputProps> = ({ onSubmit, attributeApi }) => {
	const { getAttributeById } = attributeApi;
	const { taskAttribute, setTaskAttribute, removeTaskAttribute, clearTaskAttributes } = useAttributeHook();
	const menuItems: MenuItem[] = useMemo(() => {
		if (attributeApi.isLoading) {
			return [];
		}

		return attributeApi.attributes.map((attribute) => {
			return {
				name: attribute.name,
				id: attribute.id,
				content: <AttributeBuilder attribute={attribute}></AttributeBuilder>
			};
		});
	}, [attributeApi.attributes, attributeApi.isLoading]);

	const handleSubmit = (blurb: string) => {
		return onSubmit({
			blurb: blurb,
			attributes: taskAttribute
		}).then(() => {
			clearTaskAttributes();
			return Promise.resolve(true);
		});
	};

	const removeAttribute = (id: string) => () => {
		removeTaskAttribute(id);
	};

	return (
		<InputAttributeContext.Provider
			value={{
				setTaskAttribute
			}}>
			<div className={styles.attributeTagContainer}>
				{taskAttribute.map((attribute) => (
					<div className={styles.attributeTag}>
						<span className={styles.removeAttribute} onClick={removeAttribute(attribute.id)}>
							X
						</span>
						<span style={{ fontWeight: 700 }}>{getAttributeById(attribute.id).name}</span>
						::{attribute.value as string}
					</div>
				))}
			</div>
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
				<PrimaryInput className={styles.primaryInput} placeholder="Start typing or hit '/' to add more attributes" />
			</InputWithMenu>
		</InputAttributeContext.Provider>
	);
};

export default AddItemInput;
