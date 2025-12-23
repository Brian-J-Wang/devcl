import styles from './Cross.module.css';

type CrossProps = React.HTMLAttributes<HTMLDivElement> & {
    styling?: {
        cross: string;
    };
};

const Cross: React.FC<CrossProps> = ({ styling, className, ...props }) => {
    return (
        <div className={`${styles.wrapper} ${className}`} {...props}>
            <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styling ? styling.cross : ''}`}
            >
                <path d="M1 1L13 13M1 13L13 1" stroke-width="2.5" />
            </svg>
        </div>
    );
};

export default Cross;
