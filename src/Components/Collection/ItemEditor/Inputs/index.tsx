import GeneralInput from "./GeneralInput/GeneralInput"
import { TextInput } from "./TextInput/TextInput"

const Input = {
    Text: TextInput,
    General: GeneralInput
}

type stylesDictionary= {
    [key: string] : React.CSSProperties,
}

export default Input