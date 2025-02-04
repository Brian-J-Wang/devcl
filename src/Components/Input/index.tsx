import TextInput, { TextInputProps } from "./TextInput/TextInput";

interface InputProps {
    Text: React.FC<TextInputProps>
}

const Input: InputProps = {
    Text: TextInput
};

export default Input;