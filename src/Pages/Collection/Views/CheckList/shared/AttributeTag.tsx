import styles from './AttributeTag.module.css';

type AttributeTagProps = {
    id: string;
    value: string;
    onDeleteClick?: (attributeId: string) => void;
};

const AttributeTag: React.FC<AttributeTagProps> = ({ onDeleteClick, id, value }) => {
    return <div className={styles.attributeTag}>{value}</div>;
};

export default AttributeTag;
