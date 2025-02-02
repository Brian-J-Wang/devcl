import ButtonBar, { ButtonBarChoice } from "./ButtonBar/ButtonBar"
import { TextInput } from "./TextInput/TextInput"

const Input = {
    Text: TextInput,
    ButtonBar: ButtonBar,
    ButtonBarChoice: ButtonBarChoice
}

type stylesDictionary= {
    [key: string] : React.CSSProperties,
}

export const shared: stylesDictionary = {
    container: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        margin: 0,
        marginTop: 6,
        marginRight: 12,
        fontWeight: 700,
        color: 'rgba(29, 29, 29, 0.75)'
    }
}

export default Input