import Button, { ButtonProps } from "./Button/Button";
import DropDown from "./DropDown/DropDown";
import Radio, { RadioProps } from "./Radio/Radio";
import RadioGroup, { RadioGroupProps } from "./Radio/RadioGroup";
import TextInput, { TextInputProps } from "./TextInput/TextInput";

interface InputProps {
    Text: React.FC<TextInputProps>,
    RadioGroup: React.FC<RadioGroupProps>,
    Radio: React.FC<RadioProps>,
    Button: React.FC<ButtonProps>,
    DropDown: React.FC<any>,
}

const Input: InputProps = {
    Text: TextInput,
    RadioGroup: RadioGroup,
    Radio: Radio,
    Button: Button,
    DropDown: DropDown
};

export default Input;