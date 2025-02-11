import "./TrashCan.css"

interface TrashCanProps {
    onClick?: () => void
}

const TrashCan: React.FC<TrashCanProps> = ({ onClick, ...rest}) => {
    return (
        <div onClick={onClick} className="trashcan" {...rest}>
            <svg width="13" height="20" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="trashcan__icon">
                <path d="M2.49917 14.4909L1.50099 3.51091C1.50046 3.50505 1.50507 3.5 1.51095 3.5H11.489C11.4949 3.5 11.4995 3.50505 11.499 3.51091L10.5008 14.4909C10.5004 14.4961 10.496 14.5 10.4909 14.5H2.50913C2.50396 14.5 2.49964 14.4961 2.49917 14.4909Z" stroke="#292929" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.5 5.5V12.5M8.5 12.5L9 5.5M4 5.5L4.5 12.5" stroke="#292929" stroke-linecap="round"/>
                <path d="M1 1.5H12M7 1H6" stroke="#292929" stroke-width="1.5" stroke-linecap="round" id="lid"/>
            </svg>
        </div>
        
    )
}

export { TrashCan };