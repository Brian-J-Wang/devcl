import "./Edit.css"

interface EditProps {
    className?: string
    onClick: () => void,
    [key: string]: any
}

export const Edit: React.FC<EditProps> = ({ className, onClick, ...rest}) => {
    return (
        <div onClick={onClick} className={`${className ?? ""} edit`} {...rest}>
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="edit__pen">
                <path d="M2.05724 10.3037L1.26522 13.7894C1.24574 13.8751 1.33842 13.9425 1.41394 13.8975L4.48429 12.0671M2.05724 10.3037L4.48429 12.0671M2.05724 10.3037L8.75799 1.0809C8.79046 1.03622 8.85299 1.02632 8.89767 1.05878L11.1629 2.70458C11.2076 2.73704 11.2175 2.79958 11.185 2.84426L4.48429 12.0671" stroke="#292929" stroke-width="1.5"/>
            </svg>
        </div>
    )
}