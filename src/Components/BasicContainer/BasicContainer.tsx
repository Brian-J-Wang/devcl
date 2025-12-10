import styles from './BasicContainer.module.css';

type BasicContainerType = React.HTMLAttributes<HTMLDivElement> & {};

const BasicContainer: React.FC<BasicContainerType> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={`${className ?? ''} ${styles.container}`}>
            {children}
        </div>
    );
};

export default BasicContainer;
