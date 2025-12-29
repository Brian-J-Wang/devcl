import { useEffect, useState } from 'react';
import './checkbox.css';

export enum CheckBoxState {
    unchecked,
    checked,
    loading,
}

interface CheckBoxProps {
    state: CheckBoxState;
    onClick?: (prev: CheckBoxState) => void;
    className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ state, onClick, className = '', ...rest }) => {
    const [rectClass, setRectClass] = useState<string>('');
    const [pathClass, setPathClass] = useState<string>('');

    useEffect(() => {
        if (state == CheckBoxState.unchecked) {
            setPathClass('checkbox__path');
            setTimeout(() => {
                setRectClass('checkbox__fill');
            }, 250);
        } else {
            setRectClass('checkbox__fill checkbox__fill_checked');
            setPathClass('checkbox__path checkbox__path_checked');
        }
    }, [state]);

    const handleCheckboxClick = () => {
        if (onClick) {
            onClick(state);
        }
    };

    return (
        <div onClick={handleCheckboxClick} className={`${className} checkbox`} {...rest}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="checkbox__icon"
            >
                <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" stroke="#292929" className={rectClass} />
                <path
                    d="M3.5 9L6.49242 11.4937C6.49662 11.4972 6.50286 11.4967 6.50642 11.4925L12.5 4.5"
                    strokeDasharray={13.120536804199219}
                    strokeDashoffset={13.120536804199219}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={pathClass}
                />
            </svg>
        </div>
    );
};

export { CheckBox };
