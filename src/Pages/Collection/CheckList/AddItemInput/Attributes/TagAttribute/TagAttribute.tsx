import styles from "./TagAttribute.module.css";

export const TagAttribute = () => {
	return (
		<>
			<input type="text" />
			<div className={styles.tagList}></div>
		</>
	);
};
