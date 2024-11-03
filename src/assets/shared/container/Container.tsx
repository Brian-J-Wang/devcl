import "./Container.css"

interface IContainer extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode,
    className? : string
}

export const Container : React.FC<IContainer> = (props) => {
    return (
        <div {...props} className={`${props.className ?? ''} container`} >{props.children}</div>
    )
}