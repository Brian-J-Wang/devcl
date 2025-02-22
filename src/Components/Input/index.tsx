import Button, { ButtonProps } from "./Button/Button";
import DropDown from "./DropDown/DropDown";
import TextInput, { TextInputProps } from "./TextInput/TextInput";

interface InputProps {
    Text: React.FC<TextInputProps>
    Button: React.FC<ButtonProps>,
    DropDown: React.FC<any>,
}

const Input: InputProps = {
    Text: TextInput,
    Button: Button,
    DropDown: DropDown
};

export default Input;