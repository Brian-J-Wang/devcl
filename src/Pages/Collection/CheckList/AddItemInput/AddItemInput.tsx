import { InputWithMenu, Menu, MenuInput, MenuSlot, PrimaryInput } from "@brwwang/react-components";
import { MenuItem } from "@brwwang/react-components/dist/lib/InputWithMenu/Contexts/menuContext";
import { TagAttribute } from "./Attributes/TagAttribute/TagAttribute";

import styles from "./AddItemInput.module.css";
import { PostTask } from "../../../../types/task";

const menuItems = [
	{
		name: "Tag",
		id: "tag",
		content: <TagAttribute />
	},
	{
		name: "Assignee",
		id: "assignee",
		content: <div></div>
	}
];

const AddItemInput: React.FC<{ onSubmit: (task: PostTask) => Promise<boolean> }> = ({ onSubmit }) => {
	const handleSubmit = (blurb: string) => {
		return onSubmit({
			blurb: blurb
		}).then(() => {
			return Promise.resolve(true);
		});
	};

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
