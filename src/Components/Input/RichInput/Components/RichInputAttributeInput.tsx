interface RichInputAttributeInputProps {
    className: string,
}

const RichInputAttributeInput: React.FC<RichInputAttributeInputProps> = (props) => {
    return (
        <input type="text" className={`${props.className} `}/>
    )
}

export default RichInputAttributeInput;